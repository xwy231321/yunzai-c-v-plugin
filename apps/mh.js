//插件：盲盒
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));

let cdtime = 0//触发CD，单位毫秒，0为无CD
let isopen = settings.yifensuijimanghe

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
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
       //let mha = `https://app.zichen.zone/api/acg.php`
       await e.reply('盲盒派送中～',true,{recallMsg:7})
       let num = e.msg.match(/\d+/)
          for (let i = 0; i < [num]; i++) {
              let url = Math.floor(Math.random() * 3) + 1;
if (url === 1) {
    url = `https://app.zichen.zone/api/acg.php`;
} else if (url === 2) {
    url = `https://api.ixiaowai.cn/api/api.php`;
} else {
    url = `https://iw233.cn/API/Random.php`;
}
        let msga=[segment.image(url)]
        e.reply(msga,false)
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(2000);
        }
        return true                           
    }

}




