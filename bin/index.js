#!/usr/bin/env node

var program = require('commander');
const snippet = require('./snippet')

program
    .version(require('../package.json').version);

program
    .command('init')
    .description('初始化代码段')
    .action(function () {
        snippet();
    });

program.parse(process.argv);