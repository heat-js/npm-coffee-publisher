#!/usr/bin/env node

const { execSync } = require('child_process');

execSync(
	'cd .build; yarn publish --access=public',
	{stdio: 'inherit'}
);
