//图片基本都是18限制的，群聊中谨慎使用，封号概不负责！！！
//感谢渔火佬的帮助
//推荐：云崽插件库：https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index （gitee）   https://github.com/yhArcadia/Yunzai-Bot-plugins-index  （github）
//项目地址https://gitee.com/xwy231321/yunzai-c-v-plugin

import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

let blacklist = [] //黑名单群，多个qq群号时用逗号（英文）隔开，例：10000,10001

export class biyingsetu extends plugin {
    constructor() {
        super({
            name: 'stplus',
            dsc: 'stplus',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?setuplus(.*)$',
                    fnc: 'setu'
                }
            ]
        })
    }
    async setu(e) {
        let url = `https://www.acy.moe/api/r18`
        let msg=[segment.image(url)]
        e.reply(msg,false,{recallMsg:60})//←此处recallMsg后为撤回时间，单位秒，默认60秒，时间为0则不撤回
        return true                           
    }
}


