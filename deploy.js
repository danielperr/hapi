const { execSync } = require('child_process');
const fs = require('fs-extra');

const PATH_ACTIVITY = './packages/hapi-activity';
const PATH_CREATOR = './packages/hapi-creator';
const PATH_DOCS = './packages/hapi-docs';

const PATH_ACTIVITY_BUILD = `${PATH_ACTIVITY}/build/index.html`;
const PATH_CREATOR_BUILD = `${PATH_CREATOR}/build`;
const PATH_DOCS_BUILD = `${PATH_DOCS}/build`;

const PATH_DEPLOY = './deploy';
const PATH_DEPLOY_ACTIVITY = `${PATH_DEPLOY}/empty.html`;
const PATH_DEPLOY_CREATOR = PATH_DEPLOY
const PATH_DEPLOY_DOCS = `${PATH_DEPLOY}/docs`

async function copyToDeployDir() {
  await fs.ensureDir(PATH_DEPLOY);
  await fs.emptyDir(PATH_DEPLOY);

  fs.copy(PATH_ACTIVITY_BUILD, PATH_DEPLOY_ACTIVITY)
    .then(() => { console.log('Copied activity successfully'); })
    .catch((err) => { console.error(err) });

  fs.copy(PATH_CREATOR_BUILD, PATH_DEPLOY_CREATOR)
    .then(() => { console.log('Copied creator successfully'); })
    .catch((err) => { console.error(err) });
}

function main() {
  [PATH_ACTIVITY, PATH_CREATOR].forEach((cwd) => {
    execSync('npm install && npm run build', { cwd, stdio: 'inherit'});
  });
  copyToDeployDir().catch((error) => { throw error; });
}

main();
