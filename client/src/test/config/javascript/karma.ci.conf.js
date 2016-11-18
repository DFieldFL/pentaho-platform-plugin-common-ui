module.exports = function (config) {
  config.set({
    basePath: '${basedir}',

    frameworks: ["jasmine", "requirejs"],

    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-junit-reporter',
      'karma-html-reporter',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ],

    files: [
      // FIRST file
      "${project.build.directory}/context-begin.js",

      // SOURCE files
      {pattern: "build-res/module-scripts/**/*.+(js|html|xml)", included: false},
      {pattern: "${basedir}/src/main/javascript/**/*.+(js|html|xml|properties)", included: false},
      {pattern: "dev-res/dojo/dojo-release-1.9.2-src/**/*.+(js|html)", included: false},

      // AMD configuration
      "src/main/javascript/requireCfg-raw.js",
      "src/test/javascript/require-config.js",
      "src/test/javascript/require-test.js",

      // TEST files (must be after require-config.js, or it is not included)
      {pattern: "src/test/javascript/**", included: false},

      // LAST file
      "context-end.js"
    ],

    // Too many files cause karma launcher/file-serving errors.
    // Exclude these as we don't use them and they're many.
    exclude: [
      "dev-res/dojo/dojo-release-1.9.2-src/**/tests/**",
      "build-res/module-scripts/common-ui/**",
      "src/main/javascript/test/**"
    ],

    // CI mode
    singleRun: true,

    browsers:  ["PhantomJS"],
    reporters: ["progress", "junit", "coverage"],

    junitReporter: {
      outputFile: "bin/reports/test/js/test-results.xml",
      suite: "unit"
    },

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      "src/main/javascript/plugin-handler/**/*.js": ["coverage"],
      "src/main/javascript/angular-directives/**/*.js": ["coverage"],
      "src/main/javascript/pentaho/**/*.js": ["coverage"],
      "src/main/javascript/vizapi/**/*.js": ["coverage"],
      "src/main/javascript/prompting/**/*.js": ["coverage"],
      "src/main/javascript/util/**/*.js": ["coverage"],
      "**/*.html": []
    },

    // optionally, configure the reporter
    coverageReporter: {
      reporters: [
        {
          type: "html",
          dir:  "bin/reports/jscoverage/html/"
        },
        {
          type: "cobertura",
          dir:  "bin/reports/cobertura/xml/"
        }
      ],
      dir: "bin/reports/"
    },

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG
  });
};
