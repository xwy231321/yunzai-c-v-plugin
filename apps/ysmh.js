//插件：原神盲盒
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));

let cdtime = 0//触发CD，单位毫秒，0为无CD
let isopen = settings.yuanmangheshen
let blacklist = []//屏蔽群聊号，多个群聊号中间加上英文逗号

export class ysmh extends plugin {
    constructor() {
        super({
            name: '原神盲盒',
            dsc: 'ysmh',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?原神盲盒$',
                    fnc: 'ysmh'
                }
                ,{
                    reg: '^#?两份原神盲盒$',
                    fnc: 'twoysmh'
                }
            ]
        })
    }
    async ysmh(e) {
      if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        let url = `https://api.dujin.org/pic/yuanshen`
        await e.reply('原神盲盒派送中～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        e.reply(msg,false)
        
        return true                           
    }
    async twoysmh(e) {
        if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
        let url = `https://api.dujin.org/pic/yuanshen`
        let urla = `https://api.dujin.org/pic/yuanshen`
        await e.reply('两份原神盲盒派送中～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        let msga=[segment.image(urla)]
        e.reply(msg,false)
        e.reply(msga)
        
        return true                           
    }
}


