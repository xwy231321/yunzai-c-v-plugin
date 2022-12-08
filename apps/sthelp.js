//yunzai-c-v-plugin帮助
//推荐：云崽插件库：https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index （gitee）   https://github.com/yhArcadia/Yunzai-Bot-plugins-index  （github）
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
       let msg=["欢迎使用yunzai-c-v-plugin，当前版本共两个插件，发送 setuplus 将会返回一张画风相对古老的se图；发送 st 将会返回一张画风相对新颖的se图（可自行配置图片年龄等级），可自行配置撤回间隔以及需要屏蔽的群聊。默认60s后撤回配置"]
       e.reply(msg)
       return true
    }
}

