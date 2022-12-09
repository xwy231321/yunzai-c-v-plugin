//插件setuplus
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

let cdtime = 1000 // CD时间，为0则无CD,单位毫秒
let isopen = true // 是否启用插件（开启：true/关闭：false）
let blacklist = [] //黑名单群，多个qq群号时用逗号（英文）隔开，例：10000,10001

export class stplus extends plugin {
    constructor() {
        super({
            name: 'stplus',
            dsc: 'stplus',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?setuplus$',
                    fnc: 'setu'
                }
            ]
        })
    }
    async setu(e) {
        if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
        let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:60})//←此处recallMsg后为撤回时间，单位秒，默认60秒，时间为0则不撤回
        if (!abc) return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
}


