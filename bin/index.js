#!/usr/bin/env node

var program = require('commander');
const snippet = require('./snippet')

program
    .version(require('../package.json').version);

program
    .command('init')
    .description('初始化代码段')
    .action(function () {
        snippet.download();
    });

program
    .command('usertag [tag]')
    .description('设置userTag')
    .action(function (tag, options) {
        snippet.userTag(tag);
    });

program
    .command('key [key]')
    .description('设置关键字')
    .action(function (key, options) {
        snippet.key(key);
    });

program.parse(process.argv);