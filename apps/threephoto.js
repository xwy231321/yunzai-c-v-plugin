import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import co from "../../../lib/common/common.js";
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
const cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));

let cdtime = cdset.sanciyuancd//触发CD，单位毫秒，0为无CD
let isopen = settings.sanciyuan

export class stplus extends plugin {
    constructor() {
        super({
            name: 'threephoto',
            dsc: 'threephoto',
            event: 'message',
            priority: 3999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?三元图$',
                    fnc: 'sanyuan'
                },
                {
                    reg: '^#?(\\d+张)三元图$',
                    fnc: 'moresanciyuan'
                }
            ]
        })
    }
    async sanyuan(e) {
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }


        let url = Math.floor(Math.random() * 3) + 1;
        if (url === 1) {
            url = `http://api.sakura.gold/ksxjjtp`;
        } else if (url === 2) {
            url = `http://ovooa.com/API/guang/api?n=1&type=image`;
        } else {
            url = `http://ovooa.com/API/meinv/api.php?type=image`;
        }
        console.log(url)
        await e.reply('正在给你找三次元的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    
    async moresanciyuan(e) {
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }


        await e.reply('正在给你找三次元的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        let image = []
          for (let i = 0; i < [num]; i++) {
              let url = Math.floor(Math.random() * 3) + 1;
              if (url === 1) {
                  url = `http://api.sakura.gold/ksxjjtp`;
              } else if (url === 2) {
                  url = `http://api.sakura.gold/ksxjjtp`;
              } else {
                  url = `http://ovooa.com/API/meinv/api.php?type=image`;
              }
              console.log(url)
        let msg = [segment.image(url)]
              image.push(msg)
              console.log(image)
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(3000);
        }
        let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'三次元图片来啦') : image,false,{recallMsg:0});//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    
}