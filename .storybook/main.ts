import * as path from 'path';
import * as util from 'util';
import { DefinePlugin } from 'webpack';
import remarkGfm from 'remark-gfm';

// Inject vars prefixed with STORYBOOK

const injectVars = Object.keys(process.env).reduce((c,key) => {
  if(/^STORYBOOK_/.test(key)) {
    c[`process.env.${key}`] = JSON.stringify(process.env[key]);
  }
  return c;
}, {});

function injectEnv(definitions) {
  const env = 'process.env';

  if (!definitions[env]) {
    return {
      ...definitions,
      [env]: JSON.stringify(
        Object.fromEntries(
          Object.entries(definitions)
            .filter(([key]) => key.startsWith(env))
            // @ts-ignore
            .map(([key, value]) => [key.substring(env.length + 1), JSON.parse(value)]),
        ),
      ),
    };
  }
  return definitions;
}

function findStories() {
  // depending the env variable it will show the stories's list selected
  let stories;
  if ( process.env && process.env.STORYBOOK_CLIENT_ID === 'MERCER') {
    // Show all MERCER materials
    stories = [
      '../src/stories-contributors/*.stories.mdx', 
      '../src/stories-contributors/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-components/*.stories.mdx', 
      '../src/stories-components/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-legacy/*.stories.mdx', 
      '../src/stories-legacy/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-design/*.stories.mdx', 
      '../src/stories-design/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-mercer/*.stories.mdx', 
      '../src/stories-mercer/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-releases/*.stories.mdx',
      '../src/stories-releases/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-migration/*.stories.mdx', 
      '../src/stories-migration/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-readme/*.stories.mdx', 
      '../src/stories-readme/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-templates/*.stories.mdx', 
      '../src/stories-templates/*.stories.@(js|jsx|ts|tsx)',
    ]
  } else if(process.env && process.env.STORYBOOK_CLIENT_ID === 'ACME') {
    // TEST CLIENT ONLY 
   stories = [
      '../src/stories-acme/*.stories.mdx', 
      '../src/stories-acme/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-components/*.stories.mdx', 
      '../src/stories-components/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-design/*.stories.mdx', 
      '../src/stories-design/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-releases/*.stories.mdx', 
      '../src/stories-releases/*.stories.@(js|jsx|ts|tsx)',
    ]
  } else {
     // Show all HALO materials
     stories = [
      '../src/stories-components/*.stories.mdx', 
      '../src/stories-components/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-legacy/*.stories.mdx', 
      '../src/stories-legacy/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-contributors/*.stories.mdx', 
      '../src/stories-contributors/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-design/*.stories.mdx', 
      '../src/stories-design/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-halo/*.stories.mdx', 
      '../src/stories-halo/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-readme/*.stories.mdx', 
      '../src/stories-readme/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-releases/*.stories.mdx', 
      '../src/stories-releases/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories-templates/*.stories.mdx', 
      '../src/stories-templates/*.stories.@(js|jsx|ts|tsx)',
    ]
  }
  return stories;
}



module.exports = {
  stories: async () => [...findStories()],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@geometricpanda/storybook-addon-badges',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  typescript: {
    reactDocgen: false
  },

  webpackFinal: (config) => {
    // Resolve the modules
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "/"),
    ];
      // Add a new rule for CSS files
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    });
    // Add a new rule for MJS
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules|dist/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    // Add a new rules for NG
    config.module.rules.push({
      test: /\.ts$/,
      loader: '@ngtools/webpack',
    });

    config.module.rules.push({
      test: /\.html$/i,
      use: {
        loader: 'html-loader'
      }
    });
    // Add a new rule for CJS
    config.module.rules.push({
      test: /\.cjs$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.zip$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]', // This will retain the original file name and path
          },
        },
      ],
    });
    // Configure the plugins
    config.plugins = config.plugins.reduce((c, plugin) => {
      if (plugin instanceof DefinePlugin) {
        return [
          ...c,
          new DefinePlugin(
            injectEnv({
              ...plugin.definitions,
              ...injectVars,
            })
          ),
        ];
      }
    
      return [
        ...c,
        plugin,
      ];
    }, []);
    return config;
  },

  framework: {
    name: '@storybook/angular',
    options: {}
  },

  docs: {
    autodocs: true
  },
  staticDirs: [
    { from: '../projects/cdk/assets/docs', to: 'atlas-docs' },
    { from: '../projects/cdk/assets/logos', to: 'atlas-logos' },
    { from: '../projects/cdk/assets/icons', to: 'atlas-icons' },
    { from: './public', to: '/' },
  ],
  reactOptions: { legacyRootApi: true },
};
