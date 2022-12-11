//插件：帮助
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
export class sthelp extends plugin {
    constructor() {
        super({
            name: 'cv帮助',
            dsc: 'cvhelp',
            event: 'message',
            priority: 4000,
            rule: [
                {
                    reg: '^#?cv帮助$',
                    fnc: 'cvhelp'
                }
            ]
        })
    }
    async cvhelp(e) {
    let msg=['发送【#st】获得随机清凉图 \n' +
  '发送【#setuplus】获得随机se图 \n' +
  '发送【#随机漫画】获得随机B站404漫画 \n' +
  '发送【#盲盒】获得随机图，支持多张(最多四连发),示例：#两份盲盒 \n' +
  '发送【#原神盲盒】获得原神随机图，支持二连发，示例：#两份原神盲盒 \n' +
  '以上指令#可以省略 \n' + 
  '发#yunzai-c-v-plugin更新即可更新本插件']
       e.reply(msg)
       return true
    }
}

