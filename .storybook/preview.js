import { setCompodocJson } from '@storybook/addon-docs/angular';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ThemingServiceGlobal } from 'atlas-cdk';
import docJson from '../documentation.json';
import { BADGES } from './constants';
import { withTheming } from './halo-theming-addon';
import { DynamicIconList } from './icon-list';
import { from, of, BehaviorSubject } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';
import { iconFilePaths } from './iconFilePaths';

// Documentation
setCompodocJson(docJson);

// Mock BreakpointObserver
const mockBreakpointObserver = {
  observe: () => new BehaviorSubject({ matches: false })
};

// Create an instance of ThemingServiceGlobal with the mock BreakpointObserver
const theming = new ThemingServiceGlobal(mockBreakpointObserver);

theming.applyConfigTheming();

// Enable mobile typography if needed
theming.enableMobileTypography();

// dynamic load for icons - temporal solution - needs to spike more on load before Meta in storybook
const dynamicIcon = new DynamicIconList();
let list = new BehaviorSubject([]);
let listObservable = list.asObservable();
const variable = [];


from(dynamicIcon.configIconList('./atlas-icons/system.svg'))
.pipe(
  concatMap((r) => r.text()),
)
.subscribe(data=> {
  let CONTENT = data;
  let lines = CONTENT.split("\n")
      let result = [];
      let icons = [];
      for (const line of lines) {
          if (line.includes('id')) {
                  const regex = /"([^"]*)"|'([^']*)'/g;
                  let group = [];
                  result = [];
                  while ((group = regex.exec(line)) !== null) {
                      result.push(group[1] || group[2]);
                  }
                  if( result[0] && result[0].toLowerCase().startsWith('icon') ) {
                    icons.push(result[0]);
                  } 
              } 
      }
    list.next(icons)
    return list;
})

list.pipe(
  filter(data => data.length)
).subscribe(result => listObservable = of(result))

listObservable.
pipe(
  // @ts-ignore
  filter((data) => data.length),
).subscribe(data => dynamicIcon.setVariable(data));

// Function to configure icons for each file
iconFilePaths.forEach((filePath) => {
  configureIconList(filePath, dynamicIcon);
});

function configureIconList(filePath, dynamicIcon) {
  const dynamicIconList = new DynamicIconList();
  const listSubject = new BehaviorSubject([]);
  const listObservable = listSubject.asObservable();

  // Extract file name without extension
  const filename = filePath.split('/').pop()?.split('.')[0] || '';

  from(dynamicIconList.configIconList(filePath))
    .pipe(
      concatMap((response) => response.text()),
    )
    .subscribe((content) => {
      const lines = content.split('\n');
      const icons = [];
      const regex = /"([^"]*)"|'([^']*)'/g;

      for (const line of lines) {
        if (line.includes('id') && !line.includes('cx')) {
          let match;
          while ((match = regex.exec(line)) !== null) {
            const id = match[1] || match[2];
            if( id && !id.includes('none') && !id.includes('32')
               && !id.includes('24') && !id.includes('0 0 40 40')) {
              icons.push(id);
            } 
          }
        }
      }

      listSubject.next(icons);
    });

  listObservable
    .pipe(
      filter((data) => data.length),
    )
    .subscribe((data) => {
      dynamicIcon.setLocalStorageData(data, filename);
    });
}

// Stories config
export const parameters = {
  angularProviders: [
    { provide: BreakpointObserver, useValue: mockBreakpointObserver }
  ],
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },

  },
  options: {
    storySort: {
      order: ['Get Started',['Cover', 'Introduction', 'Setup'], 'Adopters',['Design', ['Design Language', 'Typography', 'Colors',], 'CDK', 'Components',['Readme','**'], 'Patterns'], 'Legacy', ['Deprecated Components'], ['Documentation'],'Contributors', ['Contributing', 'Documenting', 'Releasing'], 'Releases', ['Changelog', 'Notes', 'Availability'],],
    },
  },
  docs: { 
    inlineStories: true, 
    source: {
      state: 'open',
    },
  },
  viewMode: 'docs',
  previewTabs: { 
    // canvas: { hidden: true } 
   },
  badgesConfig: {
    [BADGES.ALPHA]: {
      contrast: '#FFF',
      color: '#711',
      title: 'Alpha',
      tooltip: {
        title: 'Alpha',
        desc: 'Sink or swim, this could be entirely deprecated, use with caution.',
        links: [
          {
            title: 'Leave us feedback.',
            onClick: () => {
              window.open('https://halo.slack.com/archives/C0257079K6H','_blank')
            }  
          },
        ],
      },
    },
    [BADGES.BETA]: {
      contrast: '#FFF',
      color: '#018786',
      title: 'Beta',
      tooltip: {
        title: 'Beta',
        desc: 'This component is design and engineering approved. It is ready for consumption and team feedback and contributions to help improve.',
        links: [
          {
            title: 'Leave feedback',
            onClick: () => {
              window.open('https://halo.slack.com/archives/C0257079K6H','_blank')
            }  
          },
        ],
      },
    },
    [BADGES.DEPRECATED]: {
      contrast: '#FFF',
      color: '#F11',
      title: 'Deprecated',
      tooltip: {
        title: 'Deprecated',
        desc: 'Please follow the migration instructions for updated usage.',
        links: [
          { title: 'Read more', href: '/?path=/docs/get-started-notes--docs' },
          {
            title: 'Leave feedback',
            onClick: () => {
              window.open('https://halo.slack.com/archives/C0257079K6H','_blank')
            } 
          },
        ],
      },
    },
    [BADGES.STABLE]: {
      contrast: '#FFF',
      color: '#062',
      title: 'Stable',
      tooltip: {
        title: 'Stable',
        desc: 'This component is both design and engineering approved. It is actively functioning normally or acceptably in applications in Figma and UI Kit.',
        links: [
          {
            title: 'This component is ',
            onClick: () => {
              window.open('https://halo.slack.com/archives/C0257079K6H','_blank')
            } 
          },
        ],
      },
    },
  },
}

// Stories global
export const globalTypes = {
  theming: {
    name: 'Theming',
    description: 'Global theming',
    defaultValue: 'Default Config',
  },
}

export const decorators = [
  withTheming
];

