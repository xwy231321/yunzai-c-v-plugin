//mc酱戳一戳（记得关喵喵戳一戳）
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

let cdtime = 500 // CD时间，为0则无CD,单位毫秒
let isopen = false // 是否启用插件（开启：true/关闭：false）
let blacklist = [] //黑名单群，多个qq群号时用逗号（英文）隔开，例：10000,10001

export class mcchuochuo extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'mc酱戳戳',
            /** 功能描述 */
            dsc: 'mcchuochuo',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'notice.group.poke',
            /** 优先级，数字越小等级越高 */
            priority: 90,
            rule: [
                {
                    reg: '',
                    fnc: 'poke'
                },
            ]
        })
    }
    async poke(e) {
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