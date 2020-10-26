/* jshint node: true *//* eslint-env node */

"use strict";

var loadTasksRelative = require('grunt-niagara/lib/loadTasksRelative');

var SRC_FILES = [
    'src/rc/**/*.js',
    'Gruntfile.js',
    '!src/rc/**/*.built.js',
    '!src/rc/**/*.min.js'
  ],
  SPEC_FILES = [
    'srcTest/rc/spec/**/*.js'
  ],
  TEST_FILES = [
    'srcTest/rc/*.js'
  ],
  ALL_FILES = SRC_FILES.concat(SPEC_FILES).concat(TEST_FILES);

module.exports = function runGrunt(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsdoc: { src: SRC_FILES.concat(['README.md']) },
    jshint: { src: ALL_FILES },
    plato: { src: SRC_FILES },
    watch: { src: ALL_FILES },
    karma: {},
    requirejs: {},
    niagara: {
      station: {
        stationName: 'amaps',
        forceCopy: true,
        sourceStationFolder: './srcTest/rc/stations/amapsUnitTest',
      },
    },
    babel: {
      options: {
        presets: ['@babel/preset-env'],
        plugins: [],
      },
      // r.js can't optimize if jsx syntax is present. so override the
      // grunt-niagara default behavior:
      // - jsx-only transpile into build/rjs (ES6 files)
      // - r.js optimize those (ES6 builtfile)
      // - the requirejs task will do a babel transpile from there (ES6->ES5 builtfile)
      // TODO maybe build this into grunt-niagara
      rjs: {
        options: {
          presets: [], // disable preset-env
        },
        files: [
          {
            expand: true,
            cwd: 'src/rc',
            src: ['*.js'],
            dest: 'build/rjs/src/rc',
          },
          {
            expand: true,
            cwd: 'srcTest/rc',
            src: ['*.js'],
            dest: 'build/rjs/srcTest/rc',
          },
        ],
      },
      coverage: {
        options: {
          plugins: ['istanbul'],
        },
      },
    },
  });

  loadTasksRelative(grunt, 'grunt-niagara');
};
