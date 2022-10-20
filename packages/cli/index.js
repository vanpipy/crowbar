const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const husky = require('husky');
const { Command } = require('commander');
const program = new Command();
const pkg = require('./package.json');

const currentWorkPkgPath = process.cwd();
const currentWorkPkg = require(path.resolve(currentWorkPkgPath, 'package.json'));

const addCommitRule = async () => {
  const devDeps = currentWorkPkg.devDependencies;
  devDeps['@commitlint/cli'] = '^17.1.2'
  devDeps['@commitlint/config-conventional'] = '^17.1.0'
  await fs.writeFile(
    path.resolve(currentWorkPkgPath, 'commitlint.config.js'),
    `module.exports = { extends: ['@commitlint/config-conventional'] }\n`
  )
};

const addLintRule = async () => {
  const devDeps = currentWorkPkg.devDependencies;
  devDeps['eslint'] = '^8.23.1'
  devDeps['lint-staged'] = '^13.0.3'

  const answers = await inquirer.prompt([
    { type: 'confirm', name: 'eslint', message: 'Do you want to create eslint config?' }
  ])

  if (answers.eslint) {
    spawn.sync('npx', ['eslint', '--init'], { stdio: 'inherit' })
  }
};

const addHuskyRule = async () => {
  const scripts = currentWorkPkg.scripts;
  const devDeps = pkg.devDependencies;
  scripts.prepare = 'husky install'
  devDeps['husky'] = '^8.0.1'
};

const addHooks = async (hooksStatus = {
  commit: false,
  lint: false
}) => {
  await fs.writeFile(
    path.resolve(currentWorkPkgPath, 'package.json'),
    JSON.stringify(currentWorkPkg, null, 2)
  )

  spawn.sync('npm', ['install'])
  husky.install()

  if (hooksStatus.commit) {
    husky.add('.husky/commit-msg', 'npx --no -- commitlint --edit')
  }

  if (lint) {
    husky.add('.husky/pre-commit', 'npx lint-staged')
  }

  husky.add('.husky/pre-push', 'npm test')
};

program
  .name('crowbar command line interface')
  .description('crowbar the pkg')
  .version(pkg.version)

program
  .command('rule')
  .description('set the rules for the package')
  .argument('[rulename]', 'the rule used in [commit, lint] or the all default')
  .action(async (rulename) => {
    hooksStatus = {}

    if (rulename === 'commit') {
      await addCommitRule()
      hooksStatus.commit = true
    }

    if (rulename === 'lint') {
      await addLintRule()
      hooksStatus.lint = true
    }

    if (rulename === undefined) {
      await addCommitRule()
      await addLintRule()
    }

    await addHuskyRule()
    await addHooks(hooksStatus)
  })

program.parse()
