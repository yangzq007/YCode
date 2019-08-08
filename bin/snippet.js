#!/usr/bin/env node

const execSync = require('child_process').execSync;
const readline = require('readline');
const fs = require('fs');
const os = require('os');

var userTag = "YCode";
var key = "y";

const userTagPlaceholder = /\$\$userTag\$\$/;
const keyPlaceholder = /\$\$key\$\$/;

function answer2Question(questtion) {

  return new Promise((resolve, reject) => {
    var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(questtion, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function download() {

  console.log("ycode delete old codeSnippets ...")
  execSync("rm -rf ~/Library/Developer/Xcode/UserData/CodeSnippets");

  console.log("ycode clone new codeSnippets ...");
  execSync("cd ~/Library/Developer/Xcode/UserData/ && git clone https://github.com/yangzq007/CodeSnippets.git");
  //debug code
  // execSync("cd ~/Library/Developer/Xcode/UserData/ && git clone https://github.com/yangzq007/CodeSnippets.git  && cd CodeSnippets && git checkout develop");

  config();
}

function config() {

  console.log('ycode start config ...');

  const p = `${os.homedir()}/Library/Developer/Xcode/UserData/CodeSnippets`;
  execSync(`cd ${p} && git branch ${userTag} && git checkout ${userTag}`);
  const files = fs.readdirSync(p);
  files.forEach((item, index) => {
    if (item.indexOf(".codesnippet") != -1) {
      const filePath = `${p}/${item}`;
      const data = fs.readFileSync(filePath);
      const str = data.toString().replace(userTagPlaceholder,userTag).replace(keyPlaceholder,key);
      fs.writeFileSync(filePath,str); 
    }
  });
  execSync(`cd ${p} && git add . && git commit -s -m "[Add] ${userTag}"`);

  console.log('ycode success!')
}

const snippet = function snippet() {

  answer2Question('userTag:').then(res => {
    if (res != "") {
      userTag = res; 
    }
    return answer2Question("key:");
  }).then(res => {
    if (res != "") {
      key = res; 
    }
    download();
  }).catch(error => {
    console.log(`readline error: ${error}`);
  });
}
module.exports = snippet;