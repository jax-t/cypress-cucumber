

const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules
const output = execSync("jq -s 'map(.[0])' ./cypress/cucumber-report/*.cucumber.json > ./cypress/cucumber-report/combined.json", { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);

var reporter = require('cucumber-html-reporter');
var options = {
        theme: 'hierarchy',
        jsonFile: 'cypress/cucumber-report/combined.json',
        output: 'cypress/cucumber-report/cucumber.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

	reporter.generate(options);