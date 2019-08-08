#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const os = require('os');

function download() {

  console.log("delete old codeSnippets ...")
  execSync("rm -rf ~/Library/Developer/Xcode/UserData/CodeSnippets");

  console.log("clone new codeSnippets ...");
  execSync("cd ~/Library/Developer/Xcode/UserData/ && git clone https://github.com/yangzq007/CodeSnippets.git");

  console.log("ycode: CodeSnippets init success!");
}

function userTag(tag) {

  const desTag = tag == undefined ? "YCode" : tag;
  const p = `${os.homedir()}/Library/Developer/Xcode/UserData/CodeSnippets`;
  const placeholder = " YCode ";
  const text = ` ${desTag} `;

  fs.readdirSync(p).forEach((item, index) => {
    if (item.indexOf(".codesnippet") == -1) return;
    console.log(`config ${item}...`)
    const fp = `${p}/${item}`;
    const str = fs.readFileSync(fp).toString().replace(placeholder, text);
    fs.writeFileSync(fp, str);
  });

  execSync(`cd ${p} && git add . && git commit -s -m "[feat] 配置userTag"`);

  console.log("ycode: config usertag success!");
}

function key(key) {

  const desKey = key == undefined ? "y" :key;
  const p = `${os.homedir()}/Library/Developer/Xcode/UserData/CodeSnippets`;
  const placeholder = "<key>IDECodeSnippetCompletionPrefix</key>\n	<string>y";
  const text = `<key>IDECodeSnippetCompletionPrefix</key>\n	<string>${desKey}`;

  fs.readdirSync(p).forEach((item, index) => {
    if (item.indexOf(".codesnippet") == -1) return;
    console.log(`config ${item}...`)
    const fp = `${p}/${item}`;
    const str = fs.readFileSync(fp).toString().replace(placeholder, text);
    fs.writeFileSync(fp, str);
  });

  execSync(`cd ${p} && git add . && git commit -s -m "[feat] 配置key"`);

  console.log("ycode: config key success!")
}

module.exports = { download, userTag, key };