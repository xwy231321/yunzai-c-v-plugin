//插件：盲盒
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
export class mh extends plugin {
    constructor() {
        super({
            name: '盲盒',
            dsc: 'mh',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?盲盒$',
                    fnc: 'mh'
                }
                ,{
                    reg: '^#?(\\d+份)盲盒$',
                    fnc: 'moremh'
                }
            ]
        })
    }
    async mh(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.mhcd//触发CD，单位毫秒，0为无CD
        let isopen = set.yifensuijimanghe
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        let url = `https://app.zichen.zone/api/acg.php`
        await e.reply('盲盒派送中～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        e.reply(msg,false)
        return true                           
    }
    
    async moremh(e) {
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.yifensuijimanghe
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.mhcd//触发CD，单位毫秒，0为无CD
        let isopen = set.yifensuijimanghe
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
       //let mha = `https://app.zichen.zone/api/acg.php`
        // https://api.ixiaowai.cn/api/api.php
       await e.reply('盲盒派送中～',true,{recallMsg:7})
       let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'份哦')}else {num = e.msg.match(/\d+/) }
          for (let i = 0; i < [num]; i++) {
              let url = Math.floor(Math.random() * 3) + 1;
              if (url === 1) {
                  url = `https://app.zichen.zone/api/acg.php`;
              } else if (url === 2) {
                  url = `https://api.ixiaowai.cn/api/api.php`;
              } else {
                  url = `https://app.zichen.zone/api/acg.php`;
              }
        let msga=[segment.image(url)]
        e.reply(msga,false)
        console.log('已获取图片链接 ' + (i + 1) + ' 个');
        await common.sleep(500);
        }
        return true                           
    }
}




