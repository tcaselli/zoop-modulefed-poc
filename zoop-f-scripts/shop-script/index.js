#!/usr/bin/env node
var spawnSync = require('child_process').spawnSync;
require('dotenv').config();
/*
process.argv is an Array where the first item is the path to the node, the second item is the path to your script code, and the 3rd item is your command “dev” or “build”.
*/
/*
Use simple quotes when declaring a shell invokation and double quotes inside it for patterns. Not doing it create issues with Windows.
*/
const [task] = process.argv.slice(2);
let result;
switch (task) {
  case 'start': {
    result = spawnSync('cross-env NODE_ENV=development webpack serve --config config/webpack.dev.js', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'build': {
    result = spawnSync('cross-env NODE_ENV=production webpack --config config/webpack.prod.js', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'build-server': {
    result = spawnSync('cross-env NODE_ENV=production webpack --config config/webpack.server.js', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'static-analysis': {
    result = spawnSync(
      'eslint "src/**/**.{js,jsx,ts,tsx}" && prettier "src/**/**.{js,jsx,ts,tsx,json,css,md}" --check',
      {
        cwd: process.cwd(),
        env: process.env,
        shell: true,
        stdio: 'inherit',
      },
    );
    break;
  }
  case 'pre-commit': {
    result = spawnSync(
      'lint-staged --config "./node_modules/@com.zooplus/zoop-f-config/config/lintstagedrc.js"',
      {
        cwd: process.cwd(),
        env: process.env,
        shell: true,
        stdio: 'inherit',
      },
    );
    break;
  }
  case 'static-analysis:fix': {
    result = spawnSync(
      'eslint "src/**/**.{js,jsx,ts,tsx}" --fix && prettier "src/**/**.{js,jsx,ts,tsx,json,css,md}" --write',
      {
        cwd: process.cwd(),
        env: process.env,
        shell: true,
        stdio: 'inherit',
      },
    );
    break;
  }
  case 'bundle-analysis': {
    result = spawnSync('webpack-bundle-analyzer dist/stats.json', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'jest': {
    result = spawnSync('jest src/ --watch', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'jest:once': {
    result = spawnSync('jest src/', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'cypress:open': {
    result = spawnSync('cypress open', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'cypress:run': {
    result = spawnSync('cypress run', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  case 'cypress:install': {
    result = spawnSync('cypress install --force', {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: 'inherit',
    });
    break;
  }
  default:
    console.log(`Unknown script "${task}".`);
    process.exit(1);
}

if (result.signal) {
  process.exit(1);
}

process.exit(result.status);
