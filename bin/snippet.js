const execSync = require('child_process').execSync;

const snippet = function snippet() {
    console.log("ycode delete old codeSnippets ...")
    execSync("rm -rf ~/Library/Developer/Xcode/UserData/CodeSnippets");

    console.log("ycode clone new codeSnippets ...");
    execSync("cd ~/Library/Developer/Xcode/UserData/ && git clone https://github.com/yangzq007/CodeSnippets.git");
}
module.exports = snippet;