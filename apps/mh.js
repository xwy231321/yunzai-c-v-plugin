//插件：盲盒
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

let cdtime = 2000 // CD时间，为0则无CD,单位毫秒
let isopen = true // 是否启用插件（开启：true/关闭：false）
let blacklist = [] //黑名单群，多个qq群号时用逗号（英文）隔开，例：10000,10001

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
                    reg: '^#?两份盲盒$',
                    fnc: 'twomh'
                }
                ,{
                    reg: '^#?三份盲盒$',
                    fnc: 'threemh'
                }
                ,{
                    reg: '^#?四份盲盒$',
                    fnc: 'fourmh'
                }
            ]
        })
    }
    async mh(e) {
if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
        let url = `https://app.zichen.zone/api/acg.php`
        await e.reply('盲盒派送中～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        e.reply(msg,false)
        return true                           
    }
    
    async twomh(e) {
        if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
       let mha = `https://app.zichen.zone/api/acg.php`
       let mhb = `https://api.ixiaowai.cn/api/api.php`
       await e.reply('两份盲盒派送中～',true,{recallMsg:7})
        let msga=[segment.image(mha)]
        let msgb=[segment.image(mhb)]
        e.reply(msga,false)
        e.reply(msgb,false)
        return true                           
    }
async threemh(e) {
    if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
       let mha = `https://app.zichen.zone/api/acg.php`
       let mhb = `https://app.zichen.zone/api/acg.php`
       let mhc = `https://api.ixiaowai.cn/api/api.php`
       await e.reply('三份盲盒派送中～',true,{recallMsg:7})
        let msga=[segment.image(mha)]
        let msgb=[segment.image(mhb)]
        let msgc=[segment.image(mhc)]
        e.reply(msga,false)
        e.reply(msgc,false)
        e.reply(msgb,false)
        return true                           
    }
async fourmh(e) {
    if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
       let mha = `https://app.zichen.zone/api/acg.php`
       let mhb = `https://app.zichen.zone/api/acg.php`
       let mhc = `https://api.ixiaowai.cn/api/api.php`
       let mhd = `https://api.ixiaowai.cn/api/api.php`
       await e.reply('四份盲盒派送中～',true,{recallMsg:7})
        let msga=[segment.image(mha)]
        let msgb=[segment.image(mhb)]
        let msgc=[segment.image(mhc)]
        let msgd=[segment.image(mhd)]
        e.reply(msga,false)
        e.reply(msgc,false)
        e.reply(msgb,false)
        e.reply(msgd,false)
        return true                           
    }
}




