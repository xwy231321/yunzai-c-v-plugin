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
 await e.reply('即将安装清凉插件（ql-plugin），大小＜1MB')
  await common.sleep(2000);
 await e.reply('以下为用户协议，若您继续使用本插件，则代表您同意本协议，协议链接：https://gitee.com/xwy231321/ql-plugin/blob/master/%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.txt')
  await common.sleep(2000);
 let cmd = `git clone https://gitee.com/xwy231321/ql-plugin.git ./plugins/ql-plugin/`
 execSync(cmd)
  await common.sleep(2000);
  e.reply('安装指令完毕，勿重复安装，请手动重启，若安装失败，请检查是否正确安装git')
 
    return true
    }

    
    }

    