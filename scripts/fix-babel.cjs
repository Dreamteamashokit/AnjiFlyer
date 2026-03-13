const fs = require('fs');
const path = require('path');

// ensure the visitors folder is present inside the babel helper package
const target = path.join(
  __dirname,
  '..',
  'node_modules',
  '@babel',
  'helper-define-polyfill-provider',
  'lib',
  'visitors'
);

if (!fs.existsSync(target)) {
  console.log('postinstall: creating missing visitors directory');
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.js'), 'module.exports = {};');
}
