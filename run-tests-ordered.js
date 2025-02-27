// run-tests-ordered.js
const { execSync } = require('child_process');
const glob = require('glob');

const testFiles = glob.sync('**/*.spec.ts').sort();

const playwrightCommand = `npx playwright test ${testFiles.join(' ')}`;

execSync(playwrightCommand, { stdio: 'inherit' });