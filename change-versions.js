const fs = require('fs');

const packageJsonFiles = [
  'package.json',
  'packages/hapi-activity/package.json',
  'packages/hapi-creator/package.json',
];

function main() {
  const version = process.argv[2];
  packageJsonFiles.forEach((fname) => {
    console.log(fname);
    const packageObj = JSON.parse(fs.readFileSync(fname, 'utf8'));
    packageObj.version = version;
    fs.writeFileSync(fname, JSON.stringify(packageObj, null, 2), 'utf8');
  });
}

main();
