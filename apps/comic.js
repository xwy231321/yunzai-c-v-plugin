//插件：B站404随机漫画
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));

let cdtime = 0//触发CD，单位毫秒，0为无CD
let isopen = settings.asuijimanhua
let blacklist = []//屏蔽群聊号，多个群聊号中间加上英文逗号

export class comic extends plugin {
    constructor() {
        super({
            name: 'B站404随机小漫画',
            dsc: '随机漫画',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?随机漫画$',
                    fnc: 'comic'
                }
            ]
        })
    }
    async comic(e) {
if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        let url = `https://www.acy.moe/api/404`
        await e.reply('我去给你找啦，稍等哦～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        e.reply(msg,false)
        return true                           
    }
}


