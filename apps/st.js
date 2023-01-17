import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import co from '../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
export class St extends plugin {
    constructor() {
        super({
            name: '清凉图',
            dsc: 'st',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: '^#?清凉图$',
                    fnc: 'setu'
                },
                {
                    reg: '^#?(\\d+张)清凉图$',
                    fnc: 'moresetu'
                }
            ]
        });
        
    }
    async setu(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));//黑名单群
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.ssttoooccd//触发CD，单位毫秒，0为无CD
        let isopen = set.ssttoooc
        let ismaster = masters.ssttooocmaster
        let lx = set.lx
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
            if (blacklist.includes(e.group_id)) return false
        await e.reply('正在给你找图片啦～',true,{recallMsg:7});
        let image = []
            let num = 1
        let url = `https://api.lolicon.app/setu/v2?r18=${lx}`;//←此处修改图片类型，0为非18，1为18，2为18非18混合
        let response = await fetch(url);
        let obj = await response.json();
        console.log(obj);
            image.push(segment.image(obj.data[0].urls.original))
        let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'清凉图来啦') : image,false,{recallMsg:0});//群聊撤回间隔
        if (!abc) {
            return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60});
        }
        return true;
      }
       await e.reply('正在给你找图片啦～',true,{recallMsg:7});
        let url = `https://api.lolicon.app/setu/v2?r18=${lx}`;//←此处修改图片类型，0为非18，1为18，2为18非18混合
        let response = await fetch(url);
        let obj = await response.json();
        console.log(obj);
        let abc =  await e.reply([segment.image(obj.data[0].urls.original)],false,{recallMsg:0});//私聊撤回间隔
        if (!abc) {
            return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60});
        }
        return true;
    }
    async moresetu(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));//黑名单群
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.ssttoooc
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.ssttoooccd//触发CD，单位毫秒，0为无CD
        let isopen = set.ssttoooc
        let ismaster = masters.ssttooocmaster
        let lx = set.lx
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
            if (blacklist.includes(e.group_id)) return false
        await e.reply('正在给你找图片啦～',true,{recallMsg:7});
        let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
            let image = []
          for (let i = 0; i < [num]; i++) {
        let url = `https://api.lolicon.app/setu/v2?r18=${lx}`;//←此处修改图片类型，0为非18，1为18，2为18非18混合
        let response = await fetch(url);
        let obj = await response.json();
        console.log(obj);
              image.push(segment.image(obj.data[0].urls.original))
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(1000);
         }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'清凉图来啦') : image,false,{recallMsg:0});//群聊撤回间隔
            if (!abc) {
                return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60});
            }
        return true;
        }
        await e.reply('正在给你找图片啦～',true,{recallMsg:7});
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
          for (let i = 0; i < [num]; i++) {
        let url = `https://api.lolicon.app/setu/v2?r18=${lx}`;//←此处修改图片类型，0为非18，1为18，2为18非18混合
        let response = await fetch(url);
        let obj = await response.json();
        console.log(obj);
        let abc =  await e.reply([segment.image(obj.data[0].urls.original)],false,{recallMsg:0});//私聊撤回间隔
        if (!abc) {
            return e.reply('好、好涩(//// ^ ////)……不、不行啦……被、被吞啦o(≧口≦)o',true,{recallMsg:60});
        }
        console.log('This loop has been executed ' + (i + 1) + ' times.');
        await common.sleep(1000);
         }
        return true;
    }
}