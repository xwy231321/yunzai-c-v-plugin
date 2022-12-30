import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import co from "../../../lib/common/common.js";
import fs from 'fs'
import YAML from 'yaml'

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
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.sanciyuancd//触发CD，单位毫秒，0为无CD
        let isopen = set.sanciyuan
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        let url = Math.floor(Math.random() * 5) + 1;
        if (url === 1) {
            url = `https://tuapi.eees.cc/api.php?category=meinv&type=302`;
        } else if (url === 2) {
            url = `https://cdn.seovx.com/?mom=302`;
        } else if (url === 3) {
            url = `http://ovooa.com/API/meinv/api.php?type=image`;
        } else if (url === 4) {
            url = `http://api.btstu.cn/sjbz/`
        } else {
            url = `https://cdn.seovx.com/ha?mom=302`
        }
        await e.reply('正在给你找三次元的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    async moresanciyuan(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.sanciyuancd//触发CD，单位毫秒，0为无CD
        let isopen = set.sanciyuan
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
              let url = Math.floor(Math.random() * 5) + 1;
              if (url === 1) {
                  url = `https://tuapi.eees.cc/api.php?category=meinv&type=302`;
              } else if (url === 2) {
                  url = `https://cdn.seovx.com/?mom=302`;
              } else if (url === 3) {
                  url = `http://ovooa.com/API/meinv/api.php?type=image`;
              } else if (url === 4) {
                  url = `http://api.btstu.cn/sjbz/`
              } else {
                  url = `https://cdn.seovx.com/ha?mom=302`
              }
        let msg = [segment.image(url)]
              image.push(msg)
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(1500);
        }
        let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'三次元图片来啦') : image,false,{recallMsg:0});//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
}