### 自己做个简易版的脚手架

| 所需要的依赖                                                                 | 用途                                             |
| ---------------------------------------------------------------------------- | ------------------------------------------------ |
| [chalk](https://github.com/chalk/chalk#readme)                               | 优化命令行的样式                                 |
| [commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)  | 自定义命令行指令                                 |
| [cross-spawn](https://github.com/moxystudio/node-cross-spawn)                | 一个 node 的 spawn 和 spawnSync 的跨平台解决方案 |
| [download-git-repo](https://gitlab.com/flippidippi/download-git-repo#readme) | 下载 git 仓库的                                  |
| [figlet](https://github.com/patorjk/figlet.js#readme)                        | 从文本创建 ASCII 美术，FIGfont 规范的完整实现    |
| [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)                  | 交互式命令行用户界面                             |
| [log-symbols](https://github.com/sindresorhus/log-symbols#readme)            | 日志的彩色符号                                   |
| [ora](https://github.com/sindresorhus/ora#readme)                            | 终端微调器                                       |

- 在 package.json 中添加`"bin": {my-cli: bin/cli.js}`

  > 那么在终端执行 my-cli 就会找到当前工作区下的 bin 文件夹下面的 cli.js,执行其中的内容
  > `#! /usr/bin/env node`就是告诉系统使用 node 的解释器去解析文件
  > `/usr/bin/env`就是告诉系统可以在 PATH 目录中查找

- 在 package.json 中添加`"type": "module"`可以使用`export` 和 `import`来导入导出文件
