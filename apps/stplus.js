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
                },{
                    reg: '^#?原神铯图$',
                    fnc: 'setuys'
                },
                {
                    reg: '^#?(\\d+张)原神铯图$',
                    fnc: 'moresetuys'
                },
            ]
        })
    }
    //铯图单
    async setu(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));//黑名单群
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
            if (blacklist.groups.includes(e.group_id)) return false
            let url = Math.floor(Math.random() * 5) + 1;
            if (url === 1) {
                url = `https://image.anosu.top/pixiv/direct?r18=1`;
            } else if (url === 2) {
                url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
            } else if (url === 4) {
                url = `http://www.ashking.ltd/18.php`;
            } else if (url === 3) {
                url = `https://www.acy.moe/api/r18`
            } else {
                url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
            }
            let image = []
            let num = 1
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
            image.push(msg)
        let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'铯图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        return true;
      }
        let url = Math.floor(Math.random() * 5) + 1;
        if (url === 1) {
            url = `https://image.anosu.top/pixiv/direct?r18=1`;
        } else if (url === 2) {
            url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
        } else if (url === 4) {
            url = `http://www.ashking.ltd/18.php`;
        } else if (url === 3) {
            url = `https://www.acy.moe/api/r18`
        } else {
            url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
        }
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
       return true
    }
    //铯图多
    async moresetu(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));//黑名单群
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.seettuuplus
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
            if (blacklist.groups.includes(e.group_id)) return false
        //let url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let image = []
            let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
          for (let i = 0; i < [num]; i++) {

              let url = Math.floor(Math.random() * 5) + 1;
              if (url === 1) {
                  url = `https://image.anosu.top/pixiv/direct?r18=1`;
              } else if (url === 2) {
                  url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
              } else if (url === 4) {
                  url = `http://www.ashking.ltd/18.php`;
              } else if (url === 3) {
                  url = `https://www.acy.moe/api/r18`
              } else {
                  url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
              }

        let msg = [segment.image(url)]
        image.push(msg)
        console.log('已获取图片链接 ' + (i + 1) + ' 个');
        await common.sleep(500);
        }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'铯图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
          return true;
      }
     // let url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
          for (let i = 0; i < [num]; i++) {

              let url = Math.floor(Math.random() * 5) + 1;
              if (url === 1) {
                  url = `https://image.anosu.top/pixiv/direct?r18=1`;
              } else if (url === 2) {
                  url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
              } else if (url === 4) {
                  url = `http://www.ashking.ltd/18.php`;
              } else if (url === 3) {
                  url = `https://www.acy.moe/api/r18`
              } else {
                  url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
              }

        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        console.log('已获取图片链接 ' + (i + 1) + ' 个');
        await common.sleep(500);
        }
       return true
    }
    //原神铯图单
    async setuys(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));//黑名单群
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
            if (blacklist.groups.includes(e.group_id)) return false
            let url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
            let image = []
            let num = 1
            await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
            let msg = [segment.image(url)]
            image.push(msg)
            let abc =  await e.reply(num = 1 ? await co.makeForwardMsg(e,image,'原神铯图来啦') : image,false,{recallMsg:0})//群聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        let url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
        await e.reply('正在给你找原神涩涩的图片啦～',true,{recallMsg:7})
        let msg = [segment.image(url)]
        let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
        if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
        return true
    }
    //原神铯图多
    async moresetuys(e) {
        let blacklist = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/blacklist.yaml','utf8'));//黑名单群
        let maxshu = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/number.yaml','utf8'));
        let shu = maxshu.seettuuplus
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
            if (blacklist.groups.includes(e.group_id)) return false
            //let url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
            await e.reply('正在给你找原神涩涩的图片啦～',true,{recallMsg:7})
            let image = []
            let num = e.msg.match(/\d+/)
            if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
            for (let i = 0; i < [num]; i++) {
                let url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('已获取目标地址 ' + (i + 1) + ' 次.');
                await common.sleep(500);
            }
            let abc =  await e.reply(num > 1 ? await co.makeForwardMsg(e,image,'原神铯图来啦') : image,false,{recallMsg:0})
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            return true;
        }
        // let url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
        await e.reply('正在给你找涩涩的图片啦～',true,{recallMsg:7})
        let num = e.msg.match(/\d+/)
        if (num > shu) {num = shu;await e.reply('一次最多'+ shu +'张哦')}else {num = e.msg.match(/\d+/) }
        for (let i = 0; i < [num]; i++) {
            let url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
            let msg = [segment.image(url)]
            let abc =  await e.reply(msg,false,{recallMsg:0})//私聊撤回间隔
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o',true,{recallMsg:60})
            console.log('已获取目标地址 ' + (i + 1) + ' 次.');
            await common.sleep(500);
        }
        return true
    }
}


