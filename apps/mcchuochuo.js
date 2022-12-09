//mc酱戳一戳（记得关喵喵戳一戳）
import { segment } from "oicq";
import fetch from "node-fetch";
import cfg from'../../../lib/config/config.js'
import plugin from '../../../lib/plugins/plugin.js';
const path=process.cwd()

let cdtime = 500 // CD时间，为0则无CD,单位毫秒
let isopen = false // 是否启用插件（开启：true/关闭：false）
let blacklist = [] //黑名单群，多个qq群号时用逗号（英文）隔开，例：10000,10001

export class mcchuochuo extends plugin {
    constructor() {
        super({
            name: '戳一戳',
        dsc: '戳一戳机器人触发效果',
        event: 'notice.group.poke',
        priority: 100,
        rule: [
            {
                /** 命令正则匹配 */
                fnc: 'chuoyichuo'
                }
            ]
        })
    }
    async chuoyichuo(e) {
        if(e.target_id == cfg.qq){
if (!isopen) return false
    else {
      isopen = false
      setTimeout(async () => {
        isopen = true
      }, cdtime)
    }
        let url = `https://api.ixiaowai.cn/mcapi/mcapi.php`
        let msg=[segment.image(url)]
        e.reply(msg)
        return true  
        }
    }
}