//插件setuplus（铯图）
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));

let cdtime = 0//触发CD，单位毫秒，0为无CD
let isopen = settings.seettuuplus

export class stplus extends plugin {
    constructor() {
        super({
            name: 'stplus',
            dsc: 'stplus',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?铯图$',
                    fnc: 'setu'
                },
                {
                    reg: '^#?(\\d+张)铯图$',
                    fnc: 'moresetu'
                }
            ]
        })
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
        if (e.isGroup) {
        let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.flash(url)]
        let abc =  await e.reply(msg,false,{recallMsg:60})//群聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        return true;
      }
      
      let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    
    async moresetu(e) {
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        if (e.isGroup) {
        let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
          for (let i = 0; i < [num]; i++) {
        let msg = [segment.flash(url)]
        let abc =  await e.reply(msg,false,{recallMsg:60})//群聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(2000);
        }return true;
      }
      
      let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
          for (let i = 0; i < [num]; i++) {
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(2000);
        }
       return true
    }
    
}


