//mc酱戳一戳（记得关喵喵戳一戳）
import { segment } from "oicq";
import fetch from "node-fetch";
import cfg from'../../../lib/config/config.js'
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
const cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
const path=process.cwd()

let cdtime = cdset.mcchuoyichuocd//触发CD，单位毫秒，0为无CD
let isopen = settings.cchuoyichuom

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
if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        let url = `https://api.ixiaowai.cn/mcapi/mcapi.php`
        let msg=[segment.image(url)]
        e.reply(msg)
        return true  
        }
    }
}