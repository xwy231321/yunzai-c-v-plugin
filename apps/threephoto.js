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
                },{
                    reg: '^#?三铯图$',
                    fnc: 'sanse'
                },
                {
                    reg: '^#?(\\d+张)三铯图$',
                    fnc: 'moresanse'
                },{
                    reg: '^#?原神cos图$',
                    fnc: 'ysse'
                },
                {
                    reg: '^#?(\\d+张)原神cos图$',
                    fnc: 'moreysse'
                }
            ]
        })
    }
    //三元图单
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
        let url = Math.floor(Math.random() * 6) + 1;
        if (url === 1) {
            url = `https://tuapi.eees.cc/api.php?category=meinv&type=302`;
        } else if (url === 2) {
            url = `https://cdn.seovx.com/?mom=302`;
        } else if (url === 3) {
            url = `http://ovooa.com/API/meinv/api.php?type=image`;
        } else if (url === 4) {
            url = `http://api.btstu.cn/sjbz/`
        } else if (url === 5) {
            url = `http://tfapi.top/API/nypic.php`
        } else {
            url = `https://cdn.seovx.com/ha?mom=302`
        }
        await e.reply('正在给你找三次元的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    //三元图多
    async moresanciyuan(e) {
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.sanciyuan
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
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        let image = []
          for (let i = 0; i < [num]; i++) {
            let url = Math.floor(Math.random() * 6) + 1;
            if (url === 1) {
                url = `https://tuapi.eees.cc/api.php?category=meinv&type=302`;
            } else if (url === 2) {
                url = `https://cdn.seovx.com/?mom=302`;
            } else if (url === 3) {
                url = `http://ovooa.com/API/meinv/api.php?type=image`;
            } else if (url === 4) {
                url = `http://api.btstu.cn/sjbz/`
            } else if (url === 5) {
                url = `http://tfapi.top/API/nypic.php`
            } else {
                url = `https://cdn.seovx.com/ha?mom=302`
            }
        let msg = [segment.image(url)]
              image.push(msg)
        console.log('已获取图片链接 ' + (i + 1) + ' 个');
        await common.sleep(1500);
        }
        let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'三次元图片来啦') : image,false,{recallMsg:0});//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    //三铯图单
    async sanse(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = 0//触发CD，单位毫秒，0为无CD
        let isopen = set.one
        let ismaster = masters.one
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
            if (blacklist.groups.includes(e.group_id)) return false
            let url = `https://imagesapi.sesepic.top/3r18`
            let image = []
            let num = 1
            await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
            let msg = [segment.image(url)]
            image.push(msg)
            let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'三次元铯图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        let url = `https://imagesapi.sesepic.top/3r18`
        await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        return true
    }
    //三铯图多
    async moresanse(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.sanse
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = 0//触发CD，单位毫秒，0为无CD
        let isopen = set.one
        let ismaster = masters.one
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
            if (blacklist.groups.includes(e.group_id)) return false
            await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
            let image = []
            let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
            for (let i = 0; i < [num]; i++) {
                let url = `https://imagesapi.sesepic.top/3r18`
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('已获取图片链接 ' + (i + 1) + ' 个');
                await common.sleep(500);
            }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'三次元铯图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        for (let i = 0; i < [num]; i++) {
            let url = `https://imagesapi.sesepic.top/3r18`
            let msg = [segment.image(url)]
            let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }
    //原神cos图单
    async ysse(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = 0//触发CD，单位毫秒，0为无CD
        let isopen = set.two
        let ismaster = masters.two
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
            if (blacklist.groups.includes(e.group_id)) return false
            let url = `https://imagesapi.sesepic.top/cos`
            let image = []
            let num = 1
            await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
            let msg = [segment.image(url)]
            image.push(msg)
            let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'cos图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        let url = `https://imagesapi.sesepic.top/cos`        
        await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        return true
    }
    //原神cos图多
    async moreysse(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.ysse
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = 0//触发CD，单位毫秒，0为无CD
        let isopen = set.two
        let ismaster = masters.two
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
            if (blacklist.groups.includes(e.group_id)) return false
            await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
            let image = []
            let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
            for (let i = 0; i < [num]; i++) {
               let url = `https://imagesapi.sesepic.top/cos`
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('已获取图片链接 ' + (i + 1) + ' 个');
                await common.sleep(500);
            }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'cos图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        for (let i = 0; i < [num]; i++) {
            let url = `https://imagesapi.sesepic.top/cos`
            let msg = [segment.image(url)]
            let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }
}