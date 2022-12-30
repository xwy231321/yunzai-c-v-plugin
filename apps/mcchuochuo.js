//mc酱戳一戳（记得关喵喵戳一戳）
import { segment } from "oicq";
import fetch from "node-fetch";
import cfg from'../../../lib/config/config.js'
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
const path=process.cwd()
export class mcchuochuo extends plugin {
    constructor() {
        super({
            name: '戳一戳',
        dsc: '戳一戳机器人触发效果',
        event: 'notice.group.poke',
        priority: 50,
        rule: [
            {
                /** 命令正则匹配 */
                fnc: 'chuoyichuo'
                }
            ]
        })
    }
    async chuoyichuo(e) {
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let isopen = set.cchuoyichuom
        let cdtime = cdset.mcchuoyichuocd//触发CD，单位毫秒，0为无CD
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