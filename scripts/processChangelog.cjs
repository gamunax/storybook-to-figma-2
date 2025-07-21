// @ts-check
const fs = require('fs');
const path = require('path');

const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');

fs.readFile(CHANGELOG_PATH, (err, data) => {
  if (err) {
    console.log('Error in reading changelog');
    console.log(err);
    process.exit(1);
    return;
  }
  const dataString = data.toString();

  const formattedChangelog = [
    addJiraTicketReferences,
    reparseIssueTicketsToPullRequests,
    fixBitbucketCompare
  ].reduce((str, fn) => {
    return fn(str);
  }, dataString);

  fs.writeFileSync(CHANGELOG_PATH, formattedChangelog);
});

/**
 * Parse jira ticket formats and check if it hasn't already been formatted to prevent double formatting
 * @param {string} data
 * @returns {string}
 */
function addJiraTicketReferences(data) {
  return data.replace(/\[(\w+)-(\d+)\](?!\()/g, '[$2](https://dev.azure.com/mmctech/Atlas%20Design%20System/_workitems/edit/$2)');
}

/**
 * Parse incorrect bitbucket issues and convert to pull requests
 *
 * @param {string} data
 * @returns {string}
 */
function reparseIssueTicketsToPullRequests(data) {
  return data.replace(/\/issue\/(\d+)/g, '/pull-requests/$1');
}

/**
 * Parse incorrect bitbucket compare strings and fix
 *
 * @param {string} data
 * @returns {string}
 */
function fixBitbucketCompare(data) {
  return data.replace(/(v\d+.\d+.\d+)\.\.\.(v\d+.\d+.\d+)/g, '$2..$1');
}
