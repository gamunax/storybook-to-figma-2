require('dotenv').config();
const scanner = require('sonarqube-scanner');

const exclusions = [
  "**/*.spec.ts",
  "src/.*.spec.ts",
  "**/*.test.ts",
  "*/util.ts",
  "**/*.model.ts",
  "**/__tests__/**",
  "**/__mocks__/**",
  "**/interfaces/**",
  "**/interface.ts",
  "**/*.schema.ts",
  "**/*.module.ts",
  "**/*.js",
  "**/*.constants.ts",
  "**/*.const.ts",
  "**/constants.ts",
  "**/index.ts",
  "**/*.module.ts",
  "**/main.ts",
  "*.constant.ts",
  "*.constants.ts",
  "**/*.enum.ts",
];

scanner(
  {
    serverUrl: process.env.SONAR_URL,
    token: process.env.SONAR_TOKEN,
    options: {
      "sonar.projectKey": process.env.SONAR_PROJECT_KEY,
      "sonar.sources": "./projects/",
      "sonar.exclusions": exclusions.join(', '),
      "sonar.tests": "./projects/",
      "sonar.test.inclusions": "**/*.spec.ts",
      "sonar.typescript.lcov.reportPaths": "./coverage/lcov.info",
      "sonar.testExecutionReportPaths": "./reports/sonarqube_report.xml"
    },
  },
  () => process.exit()
);