import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

let blacklist = [466185819,311453156] //黑名单群，多个qq群时用逗号(英文)隔开，例：10000,10001

export class st extends plugin {
    constructor() {
        super({
            name: '清凉图',
            dsc: 'st',
            event: 'message',
            priority: 1,//优先级，越低优先度越高
            rule: [
                {
                    reg: '^#?st(.*)$',
                    fnc: 'setu'
                }
            ]
        })
    }
    async setu(e) {
        await e.reply('正在给你找图片啦～',true,{recallMsg:7})
    let url = "https://api.lolicon.app/setu/v2?r18=0"//←r18=0为非18，1有18，2为混合。（0有时候返回的图也比较带劲的～虽然不及1）
    let response = await fetch(url); 
    let obj = await response.json(); 
    console.log(obj)
    let abc =  await e.reply([segment.image(obj.data[0].urls.original)],false,{recallMsg:60})//←此处recallMsg后为撤回时间，单位秒，默认60s若为0则不撤回
    if (!abc) return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        return true
    }
}

