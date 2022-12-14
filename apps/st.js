import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));

let cdtime = 0//触发CD，单位毫秒，0为无CD
let isopen = settings.ssttoooc
let blacklist = []//屏蔽群聊号，多个群聊号中间加上英文逗号

export class St extends plugin {
    constructor() {
        super({
            name: '清凉图',
            dsc: 'st',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: '^#?st$',
                    fnc: 'setu'
                }
            ]
        });
        
    }

    async setu(e) {
        
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        await e.reply('正在给你找图片啦～',true,{recallMsg:7});

        let url = "https://api.lolicon.app/setu/v2?r18=0";//←此处修改图片类型，0为非18，1为18，2为18非18混合
        let response = await fetch(url);
        let obj = await response.json();
        console.log(obj);
        let abc =  await e.reply([segment.flash(obj.data[0].urls.original)],false,{recallMsg:60});//recallmsg后为撤回间隔，单位秒）

        if (!abc) {
            return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60});
        }

        return true;
    }
}