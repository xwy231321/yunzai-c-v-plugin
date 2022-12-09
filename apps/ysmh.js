//插件：原神盲盒
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

let cdtime = 1000 // CD时间，为0则无CD,单位毫秒
let isopen = true // 是否启用插件（开启：true/关闭：false）
let blacklist = [] //黑名单群，多个qq群号时用逗号（英文）隔开，例：10000,10001

export class ysmh extends plugin {
    constructor() {
        super({
            name: '原神盲盒',
            dsc: 'ysmh',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?原神盲盒$',
                    fnc: 'ysmh'
                }
                ,{
                    reg: '^#?两份原神盲盒$',
                    fnc: 'twoysmh'
                }
            ]
        })
    }
    async ysmh(e) {
        if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
        let url = `https://api.dujin.org/pic/yuanshen`
        await e.reply('原神盲盒派送中～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        e.reply(msg,false)
        
        return true                           
    }
    async twoysmh(e) {
        if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
        let url = `https://api.dujin.org/pic/yuanshen`
        let urla = `https://api.dujin.org/pic/yuanshen`
        await e.reply('两份原神盲盒派送中～',true,{recallMsg:7})
        let msg=[segment.image(url)]
        let msga=[segment.image(urla)]
        e.reply(msg,false)
        e.reply(msga)
        
        return true                           
    }
}


