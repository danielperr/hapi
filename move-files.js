const fs = require('fs-extra');

DEPLOY_DIR = './deploy';
ACTIVITY_INPUT = './activity/build/index.html';
ACTIVITY_OUTPUT = './deploy/empty.html';
CREATOR_INPUT = './creator/build';
CREATOR_OUTPUT = './deploy';

async function main() {
  // Ensure and clear deploy directory
  await fs.ensureDir(DEPLOY_DIR);
  await fs.emptyDir(DEPLOY_DIR);

  // Copy empty activity file
  fs.copy(ACTIVITY_INPUT, ACTIVITY_OUTPUT)
    .then(() => { console.log('copied activity successfully'); })
    .catch((err) => { console.error(err) });

  // Copy creator files
  fs.copy(CREATOR_INPUT, CREATOR_OUTPUT)
    .then(() => { console.log('copied creator successfully'); })
    .catch((err) => { console.error(err) });
}

main();
