import fetch from "node-fetch";
import { createRequire } from 'module'
import common from'../../../lib/common/common.js'
import plugin from '../../../lib/plugins/plugin.js';



export class up extends plugin {
    constructor() {
        super({
            name: 'up to V2',
            dsc: '清凉图升级',
            event: 'message',
            priority: 10,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?清凉图升级$',
                    fnc: 'up',
                    permission: "master",
                },
            ]
        })
    }
    
async up(e){
     const require = createRequire(import.meta.url)
     const { exec } = require('child_process')
    const execSync = function(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr })
      })
    })
  }
 await e.reply('即将安装v2版先行版 新版更名为清凉插件（ql-plugin）')
  await common.sleep(2000);
 await e.reply('以下为用户协议，请仔细阅读https://gitee.com/xwy231321/ql-plugin/blob/master/%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.txt')
  await common.sleep(2000);
 let cmd = `git clone https://gitee.com/xwy231321/ql-plugin.git ./plugins/ql-plugin/`
 execSync(cmd)
  await common.sleep(2000);
  //let cmd1 = `pnpm install -P`
 //execSync(cmd1)
 // await common.sleep(2000);
  e.reply('指令执行完毕，请手动重启，帮助指令：#清凉菜单  ，若报错请检查git是否正确安装')
  e.reply('请手动安装axios和cheerio，下面是从别的作者那看到的安装依赖的方法，一共3种，作者本人并不知道依赖应该如何安装，请自行辨别 \n' + 
'pnpm install -P \n' + 
'pnpm i \n' + 
'pnpm install --filter=ql-plugin \n' + 
'此依赖只影响bt搜索，其他不影响')
 
    return true
    }

    
    }

    