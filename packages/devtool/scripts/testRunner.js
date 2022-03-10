const { resolve, join } = require('path');
const { register } = require('ts-node');
const fg = require('fast-glob');
const Mocha = require('mocha');

const mocha = new Mocha({
  ui: 'tdd',
  // FIXME: the ts-node/register is just running for current thread,
  // the mocha parallel mode gives a way that current thread do nothing about test files
  // and run all test files at next node thread which does not register the ts-node env
  // that is the why to get the `[ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"`
  // parallel: true
});
const targetDir = resolve(__dirname, '../lib');

register({
  typeCheck: true,
});

fg(['**/*.spec.*'], { cwd: targetDir }).then((specs) => {
  specs.forEach((spec) => {
    const filename = join(targetDir, spec);
    mocha.addFile(filename);
    console.log(`> Add ${filename}`);
  });

  console.log(`> The total of the files is ${specs.length}`);
  console.log('> Testing...');

  mocha
    .loadFilesAsync()
    .then(() =>
      mocha.run((failures) => {
        process.exitCode = failures ? 1 : 0;
        console.log(failures ? '\n> Failed' : '\n> Done');
      })
    )
    .catch(() => {
      process.exitCode = 1;
      console.log('\n> Failed');
    });
});
