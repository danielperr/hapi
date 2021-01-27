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

async function main() {
  await fs.ensureDir(PATH_DEPLOY);
  await fs.emptyDir(PATH_DEPLOY);

  fs.copy(PATH_ACTIVITY_BUILD, PATH_DEPLOY_ACTIVITY)
    .then(() => { console.log('Copied activity successfully'); })
    .catch((error) => { throw error; });

  fs.copy(PATH_CREATOR_BUILD, PATH_DEPLOY_CREATOR)
    .then(() => { console.log('Copied creator successfully'); })
    .catch((error) => { throw error; });
}

main().catch((error) => { throw error; });
