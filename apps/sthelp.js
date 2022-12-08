import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
export class biyingsetu extends plugin {
    constructor() {
        super({
            name: 'cv帮助',
            dsc: 'cvhelp',
            event: 'message',
            priority: 4000,
            rule: [
                {
                    reg: '^#?cv帮助(.*)$',
                    fnc: 'cvhelp'
                }
            ]
        })
    }
    async cvhelp(e) {
    let msg=['发送【#st】获得随机清凉图\n' +
  '发送【#setuplus】获得随机se图 \n' +
  '发送【#随机漫画】获得随机B站404漫画 \n' +
  '可自行更改图片年龄段，所需屏蔽群聊以及撤回时间']
       e.reply(msg)
       return true
    }
}

