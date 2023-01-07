//插件setuplus（铯图）
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import co from '../../../lib/common/common.js'
import common from'../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'

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
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.seettuupluscd//触发CD，单位毫秒，0为无CD
        let isopen = set.seettuuplus
        let ismaster = masters.seettuuplusmaster
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        if (ismaster) {
            if(!e.isMaster) return false
        }
        if (e.isGroup) {
        let url = `https://www.acy.moe/api/r18`
            let image = []
            let num = 1
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
            image.push(msg)
        let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'铯图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
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
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.seettuupluscd//触发CD，单位毫秒，0为无CD
        let isopen = set.seettuuplus
        let ismaster = masters.seettuuplusmaster
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        if (ismaster) {
            if(!e.isMaster) return false
        }
        if (e.isGroup) {
        //let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let image = []
            let num = e.msg.match(/\d+/)
          for (let i = 0; i < [num]; i++) {
              let url = Math.floor(Math.random() * 5) + 1;
              if (url === 1) {
                  url = `https://www.acy.moe/api/r18`;
              } else if (url === 2) {
                  url = `https://www.acy.moe/api/r18`;
              } else if (url === 4) {
                  url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`;
              } else if (url === 3) {
                  url = `https://www.acy.moe/api/r18`
              } else {
                  url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
              }
        let msg = [segment.image(url)]
        image.push(msg)
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(2000);
        }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'铯图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
          return true;
      }
      //let url = `https://www.acy.moe/api/r18`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
          for (let i = 0; i < [num]; i++) {
              let url = Math.floor(Math.random() * 5) + 1;
              if (url === 1) {
                  url = `https://www.acy.moe/api/r18`;
              } else if (url === 2) {
                  url = `https://www.acy.moe/api/r18`;
              } else if (url === 3) {
                  url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`;
              } else if (url === 4) {
                  url = `https://www.acy.moe/api/r18`
              } else {
                  url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
              }
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(2000);
        }
       return true
    }
}


