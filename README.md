## YCode

### 安装

	git clone https://github.com/yangzq007/YCode.git && cd YCode && npm install && npm install -g && cd .. && rm -rf YCode && echo "success"

如果出现了`cmdand cmdand cmdand cmdand cmdand cmdand dquote> `输出，将多条命令拆分执行即可

如果出现了`Missing write access to `的安装警告和错误，检查自己是不是安装了nvm和多个版本的node，使用`nvm use system`切换回系统版本再安装即可

## 使用

### Xcode代码段

使用

	ycode init
	ycode userTag <YourUserTag>

其他指令

	//初始化代码块
	ycode init
	
	//替换userTag（标识用户的缩写）
	ycode userTag <YourUserTag>
	
	//替换key（触发代码段的首字母）
	ycode key <YourKey>