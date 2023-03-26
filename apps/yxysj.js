import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
import co from "../../../lib/common/common.js";
export class stplus extends plugin {
    constructor() {
        super({
            name: 'yxysj',
            dsc: 'yxysj',
            event: 'message',
            priority: 3999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#小冰图$',
                    fnc: 'yunxi'
                },
                {
                    reg: '^#(\\d+张)小冰图$',
                    fnc: 'yxy'
                }
            ]
        })
    }
    async yunxi(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.canciyuancd//触发CD，单位毫秒，0为无CD
        let isopen = set.yunxiyuan
        let ismaster = masters.yunxiyuanmaster
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
        let url = `https://xiaobapi.top/api/xb/api/pixiv_r18.php`
        await e.reply('正在给你找小冰图的图片啦～',true,{recallMsg:7})
        let res  = await fetch(url).catch(err => {})
        if (res?.ok) {
        res = await res.json()
        url = res.data[0].urls.original
        }
        let image = []
        let num = 1
        let msg = segment.image(url)
           image.push(msg)
        let abc =  await e.reply(num == 1 ? await co.makeForwardMsg(e,image,'小冰图来啦') : image,false,{recallMsg:0});//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
       
    }
    async yxy(e) {
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.yunxiyuan
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.canciyuancd//触发CD，单位毫秒，0为无CD
        let isopen = set.yunxiyuan
        let ismaster = masters.yunxiyuanmaster
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        if (ismaster) {
        if(!e.isMaster) 
        return false
        }
        await e.reply('正在给你找小冰图的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        let image = []
          for (let i = 0; i < [num]; i++) {
            let url = `https://xiaobapi.top/api/xb/api/pixiv_r18.php`
            let res  = await fetch(url).catch(err => {})
            if (res?.ok) {
            res = await res.json()
            url = res.data[0].urls.original
            }    
        let msg = segment.image(url)
              image.push(msg)
        console.log('已获取图片链接 ' + (i + 1) + ' 个');
        await common.sleep(500);
        }
        let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'小冰图来啦') : image,false,{recallMsg:0});//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
}
