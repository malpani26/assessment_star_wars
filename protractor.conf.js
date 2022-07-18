// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var fs = require('fs');
var dir = './test-reports';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
exports.config = {
  debug: false,
  allScriptsTimeout: 11000,
  specs: [
    './e2e/features/*.feature'
  ],
  capabilities: {
    maxInstances: 1,
    browserName: 'chrome',
    chromeOptions : {
    
   //  args: ["--headless","--disable-gpu" ]
       args: ["--disable-gpu" ]
      },
  },
  directConnect: true,
  allScriptsTimeout: 45000,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',

   // path relative to the current config file
   frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    strict: true,
    require: [
      './e2e/*/*.steps.ts'
    ],
    format: [
      'json:test-reports/cucumberreport.json'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
      
    });
  },
  // To generate html report after parallel running
  afterLaunch(){
    var path = require('path');
    var reporter = require('cucumber-html-reporter');
    var jsonReportFolder = './test-reports';
    var cucumberhtmlReport = path.join(jsonReportFolder, 'cucumberreport.html');
    var options = {
          theme: 'bootstrap',
          jsonDir: jsonReportFolder,
          output: cucumberhtmlReport,
          reportSuiteAsScenarios: true,
          launchReport: true,
          columnLayout: 1,
          storeScreenshots: true,
      };
      reporter.generate(options);
  },
  onComplete: function() {
    console.log("I'm going to quit the web driver");
    browser.driver.quit();
    console.log("Web driver closed!");
  },
};
