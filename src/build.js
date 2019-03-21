#!/usr/bin/env node

const coffee 	= require('coffeescript');
const path 		= require('path');
const fs   		= require('fs');
const paths   	= require('./paths');

function compile(dir) {
	const stat = fs.lstatSync(dir);
	if(stat.isDirectory()) {

		const newFolder = path.join(paths.build, dir.replace(paths.src, ''));

		try {
			fs.mkdirSync(newFolder);
		} catch (error) { }

		const files = fs.readdirSync(dir);
		files.forEach((file) => {
			compile(path.join(dir, file));
		});
	}
	else {
		if(!dir.endsWith('.coffee')) {
			return;
		}

		const file 	= fs.readFileSync(dir);
		const plain = file.toString('utf8');
		const js	= coffee.compile(plain, {
			transpile: {
				plugins: ['transform-es2015-modules-commonjs']
			}
		});

		const newFile = path.join(paths.build, dir
			.replace(paths.src, '')
			.replace('.coffee', '.js')
		);

		fs.writeFileSync(newFile, js);
	}
}

compile(paths.src);

const copyFiles = [
	'package.js',
	'.npmignore',
];

for(var file in copyFiles) {
	const path 		= paths.join(paths.src, 	file);
	const newPath 	= paths.join(paths.build, 	file);

	fs.copyFileSync(path, newPath);
}
