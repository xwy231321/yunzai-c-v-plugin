//插件：原神盲盒
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
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
                    reg: '^#?(\\d+份)原神盲盒$',
                    fnc: 'moreysmh'
                }
            ]
        })
    }
    async ysmh(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.yuanmangheshencd//触发CD，单位毫秒，0为无CD
        let isopen = set.yuanmangheshen
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
    async moreysmh(e) {
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.yuanmangheshen
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.yuanmangheshencd//触发CD，单位毫秒，0为无CD
        let isopen = set.yuanmangheshen
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
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'份哦')}else {num = e.msg.match(/\d+/) }
          for (let i = 0; i < [num]; i++) {
        let msg=[segment.image(url)]
        e.reply(msg,false)
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(500);
        }
        return true                           
    }
}


