#!/usr/bin/env node

const fs   		= require('fs');
const paths   	= require('./paths');

fs.rmdirSync(paths.build);
