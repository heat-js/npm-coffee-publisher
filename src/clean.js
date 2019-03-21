#!/usr/bin/env node

const rimraf   	= require('rimraf');
const paths   	= require('./paths');

rimraf.sync(paths.build);
