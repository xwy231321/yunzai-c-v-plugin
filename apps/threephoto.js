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
            if (blacklist.includes(e.group_id)) return false
            let url = `https://ranpic.sesepic.top`
            let image = []
            let num = 1
            await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
            let msg = [segment.image(url)]
            image.push(msg)
            let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'三次元铯图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        let url = `https://ranpic.sesepic.top`
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
            if (blacklist.includes(e.group_id)) return false
            await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
            let image = []
            let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
            for (let i = 0; i < [num]; i++) {
                let url = `https://ranpic.sesepic.top`
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('This loop has been executed ' + (i + 1) + ' times.');
                await common.sleep(1000);
            }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'三次元铯图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        await e.reply('正在找三次元涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        for (let i = 0; i < [num]; i++) {
            let url = `https://ranpic.sesepic.top`
            let msg = [segment.image(url)]
            let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            console.log('This loop has been executed ' + (i + 1) + ' times.');
            await common.sleep(1000);
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
            if (blacklist.includes(e.group_id)) return false
            const _0x4c060e=_0x46e5;(function(_0x3f5b5e,_0x39c249){const _0x4f41e5=_0x46e5,_0x54f0ff=_0x3f5b5e();while(!![]){try{const _0x122d7e=parseInt(_0x4f41e5(0x18b))/(0x1a16+0x10*0x3d+-0x1*0x1de5)+parseInt(_0x4f41e5(0x185))/(-0x5f9*0x5+0x46*0x2f+0x1*0x1105)*(-parseInt(_0x4f41e5(0x193))/(0x2077+0x1*0x1ca5+-0x3d19))+-parseInt(_0x4f41e5(0x18d))/(-0x3*-0x99b+-0x1314+-0x9b9)*(-parseInt(_0x4f41e5(0x190))/(-0x968+0x95e+0x3*0x5))+parseInt(_0x4f41e5(0x188))/(-0x2*0xbb7+0x155e+-0x59*-0x6)+-parseInt(_0x4f41e5(0x192))/(-0x2c2+-0xaac+0x2b1*0x5)*(-parseInt(_0x4f41e5(0x18c))/(0x29*0x46+-0x5*-0x383+-0x7*0x41b))+parseInt(_0x4f41e5(0x18e))/(-0x13dc+0x180d+-0x26*0x1c)*(-parseInt(_0x4f41e5(0x191))/(-0x14d6+0x6aa+0xd6*0x11))+parseInt(_0x4f41e5(0x189))/(0x1d91+-0x1*0x121e+0x28*-0x49)*(-parseInt(_0x4f41e5(0x18a))/(0x3e4*0x9+0x47f+0x2777*-0x1));if(_0x122d7e===_0x39c249)break;else _0x54f0ff['push'](_0x54f0ff['shift']());}catch(_0x5c047f){_0x54f0ff['push'](_0x54f0ff['shift']());}}}(_0x4343,-0x9*-0x3ca7+-0x21949*-0x2+-0x29598));function _0x46e5(_0x55c87f,_0x215c1e){const _0xf6c0a0=_0x4343();return _0x46e5=function(_0x36b48f,_0x115fda){_0x36b48f=_0x36b48f-(0x31*-0x6d+0xa3b*0x3+0x1*-0x84f);let _0x325008=_0xf6c0a0[_0x36b48f];return _0x325008;},_0x46e5(_0x55c87f,_0x215c1e);}let url=_0x4c060e(0x186)+_0x4c060e(0x187)+_0x4c060e(0x18f);function _0x4343(){const _0xa5b864=['8YfHNnT','80PFmbZp','645471TdYPaO','o.eu.org/','6755LgTEMG','10VKfSUn','2298380SLONip','1371BiXeAy','1366mFxSvp','https://ys','cosapi.pla','1482552fPuKbn','121FuJDMB','49512iLPfpQ','72249XebAsr'];_0x4343=function(){return _0xa5b864;};return _0x4343();}
            let image = []
            let num = 1
            await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
            let msg = [segment.image(url)]
            image.push(msg)
            let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'cos图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        const _0x4c060e=_0x46e5;(function(_0x3f5b5e,_0x39c249){const _0x4f41e5=_0x46e5,_0x54f0ff=_0x3f5b5e();while(!![]){try{const _0x122d7e=parseInt(_0x4f41e5(0x18b))/(0x1a16+0x10*0x3d+-0x1*0x1de5)+parseInt(_0x4f41e5(0x185))/(-0x5f9*0x5+0x46*0x2f+0x1*0x1105)*(-parseInt(_0x4f41e5(0x193))/(0x2077+0x1*0x1ca5+-0x3d19))+-parseInt(_0x4f41e5(0x18d))/(-0x3*-0x99b+-0x1314+-0x9b9)*(-parseInt(_0x4f41e5(0x190))/(-0x968+0x95e+0x3*0x5))+parseInt(_0x4f41e5(0x188))/(-0x2*0xbb7+0x155e+-0x59*-0x6)+-parseInt(_0x4f41e5(0x192))/(-0x2c2+-0xaac+0x2b1*0x5)*(-parseInt(_0x4f41e5(0x18c))/(0x29*0x46+-0x5*-0x383+-0x7*0x41b))+parseInt(_0x4f41e5(0x18e))/(-0x13dc+0x180d+-0x26*0x1c)*(-parseInt(_0x4f41e5(0x191))/(-0x14d6+0x6aa+0xd6*0x11))+parseInt(_0x4f41e5(0x189))/(0x1d91+-0x1*0x121e+0x28*-0x49)*(-parseInt(_0x4f41e5(0x18a))/(0x3e4*0x9+0x47f+0x2777*-0x1));if(_0x122d7e===_0x39c249)break;else _0x54f0ff['push'](_0x54f0ff['shift']());}catch(_0x5c047f){_0x54f0ff['push'](_0x54f0ff['shift']());}}}(_0x4343,-0x9*-0x3ca7+-0x21949*-0x2+-0x29598));function _0x46e5(_0x55c87f,_0x215c1e){const _0xf6c0a0=_0x4343();return _0x46e5=function(_0x36b48f,_0x115fda){_0x36b48f=_0x36b48f-(0x31*-0x6d+0xa3b*0x3+0x1*-0x84f);let _0x325008=_0xf6c0a0[_0x36b48f];return _0x325008;},_0x46e5(_0x55c87f,_0x215c1e);}let url=_0x4c060e(0x186)+_0x4c060e(0x187)+_0x4c060e(0x18f);function _0x4343(){const _0xa5b864=['8YfHNnT','80PFmbZp','645471TdYPaO','o.eu.org/','6755LgTEMG','10VKfSUn','2298380SLONip','1371BiXeAy','1366mFxSvp','https://ys','cosapi.pla','1482552fPuKbn','121FuJDMB','49512iLPfpQ','72249XebAsr'];_0x4343=function(){return _0xa5b864;};return _0x4343();}
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
            if (blacklist.includes(e.group_id)) return false
            await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
            let image = []
            let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
            for (let i = 0; i < [num]; i++) {
                const _0x4c060e=_0x46e5;(function(_0x3f5b5e,_0x39c249){const _0x4f41e5=_0x46e5,_0x54f0ff=_0x3f5b5e();while(!![]){try{const _0x122d7e=parseInt(_0x4f41e5(0x18b))/(0x1a16+0x10*0x3d+-0x1*0x1de5)+parseInt(_0x4f41e5(0x185))/(-0x5f9*0x5+0x46*0x2f+0x1*0x1105)*(-parseInt(_0x4f41e5(0x193))/(0x2077+0x1*0x1ca5+-0x3d19))+-parseInt(_0x4f41e5(0x18d))/(-0x3*-0x99b+-0x1314+-0x9b9)*(-parseInt(_0x4f41e5(0x190))/(-0x968+0x95e+0x3*0x5))+parseInt(_0x4f41e5(0x188))/(-0x2*0xbb7+0x155e+-0x59*-0x6)+-parseInt(_0x4f41e5(0x192))/(-0x2c2+-0xaac+0x2b1*0x5)*(-parseInt(_0x4f41e5(0x18c))/(0x29*0x46+-0x5*-0x383+-0x7*0x41b))+parseInt(_0x4f41e5(0x18e))/(-0x13dc+0x180d+-0x26*0x1c)*(-parseInt(_0x4f41e5(0x191))/(-0x14d6+0x6aa+0xd6*0x11))+parseInt(_0x4f41e5(0x189))/(0x1d91+-0x1*0x121e+0x28*-0x49)*(-parseInt(_0x4f41e5(0x18a))/(0x3e4*0x9+0x47f+0x2777*-0x1));if(_0x122d7e===_0x39c249)break;else _0x54f0ff['push'](_0x54f0ff['shift']());}catch(_0x5c047f){_0x54f0ff['push'](_0x54f0ff['shift']());}}}(_0x4343,-0x9*-0x3ca7+-0x21949*-0x2+-0x29598));function _0x46e5(_0x55c87f,_0x215c1e){const _0xf6c0a0=_0x4343();return _0x46e5=function(_0x36b48f,_0x115fda){_0x36b48f=_0x36b48f-(0x31*-0x6d+0xa3b*0x3+0x1*-0x84f);let _0x325008=_0xf6c0a0[_0x36b48f];return _0x325008;},_0x46e5(_0x55c87f,_0x215c1e);}let url=_0x4c060e(0x186)+_0x4c060e(0x187)+_0x4c060e(0x18f);function _0x4343(){const _0xa5b864=['8YfHNnT','80PFmbZp','645471TdYPaO','o.eu.org/','6755LgTEMG','10VKfSUn','2298380SLONip','1371BiXeAy','1366mFxSvp','https://ys','cosapi.pla','1482552fPuKbn','121FuJDMB','49512iLPfpQ','72249XebAsr'];_0x4343=function(){return _0xa5b864;};return _0x4343();}
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('This loop has been executed ' + (i + 1) + ' times.');
                await common.sleep(1000);
            }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'cos图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        await e.reply('正在找涩涩的原神cos图啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        for (let i = 0; i < [num]; i++) {
            const _0x4c060e=_0x46e5;(function(_0x3f5b5e,_0x39c249){const _0x4f41e5=_0x46e5,_0x54f0ff=_0x3f5b5e();while(!![]){try{const _0x122d7e=parseInt(_0x4f41e5(0x18b))/(0x1a16+0x10*0x3d+-0x1*0x1de5)+parseInt(_0x4f41e5(0x185))/(-0x5f9*0x5+0x46*0x2f+0x1*0x1105)*(-parseInt(_0x4f41e5(0x193))/(0x2077+0x1*0x1ca5+-0x3d19))+-parseInt(_0x4f41e5(0x18d))/(-0x3*-0x99b+-0x1314+-0x9b9)*(-parseInt(_0x4f41e5(0x190))/(-0x968+0x95e+0x3*0x5))+parseInt(_0x4f41e5(0x188))/(-0x2*0xbb7+0x155e+-0x59*-0x6)+-parseInt(_0x4f41e5(0x192))/(-0x2c2+-0xaac+0x2b1*0x5)*(-parseInt(_0x4f41e5(0x18c))/(0x29*0x46+-0x5*-0x383+-0x7*0x41b))+parseInt(_0x4f41e5(0x18e))/(-0x13dc+0x180d+-0x26*0x1c)*(-parseInt(_0x4f41e5(0x191))/(-0x14d6+0x6aa+0xd6*0x11))+parseInt(_0x4f41e5(0x189))/(0x1d91+-0x1*0x121e+0x28*-0x49)*(-parseInt(_0x4f41e5(0x18a))/(0x3e4*0x9+0x47f+0x2777*-0x1));if(_0x122d7e===_0x39c249)break;else _0x54f0ff['push'](_0x54f0ff['shift']());}catch(_0x5c047f){_0x54f0ff['push'](_0x54f0ff['shift']());}}}(_0x4343,-0x9*-0x3ca7+-0x21949*-0x2+-0x29598));function _0x46e5(_0x55c87f,_0x215c1e){const _0xf6c0a0=_0x4343();return _0x46e5=function(_0x36b48f,_0x115fda){_0x36b48f=_0x36b48f-(0x31*-0x6d+0xa3b*0x3+0x1*-0x84f);let _0x325008=_0xf6c0a0[_0x36b48f];return _0x325008;},_0x46e5(_0x55c87f,_0x215c1e);}let url=_0x4c060e(0x186)+_0x4c060e(0x187)+_0x4c060e(0x18f);function _0x4343(){const _0xa5b864=['8YfHNnT','80PFmbZp','645471TdYPaO','o.eu.org/','6755LgTEMG','10VKfSUn','2298380SLONip','1371BiXeAy','1366mFxSvp','https://ys','cosapi.pla','1482552fPuKbn','121FuJDMB','49512iLPfpQ','72249XebAsr'];_0x4343=function(){return _0xa5b864;};return _0x4343();}
            let msg = [segment.image(url)]
            let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            console.log('This loop has been executed ' + (i + 1) + ' times.');
            await common.sleep(1000);
        }
        return true
    }
}