import plugin from '../../../lib/plugins/plugin.js';
import ArkMsg from "../model/ArkMsg.js";
import Note from "../../genshin/model/note.js";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from 'fs';
import YAML from 'yaml'
import common from "../../../lib/common/common.js";

let cdtime = 0

export class tobig extends plugin {
    constructor() {
        super({
            name: '转大图',
            dsc: 'tobig',
            event: 'message',
            priority: -1,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?(转|发)大图$',
                    fnc: 'tobig'
                },{
                    reg: '^#?(体力|树脂|查询体力)?清凉图体力$',
                    fnc: 'notebig'
                }

            ]
        })
    }
    async tobig(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/tobig.yaml','utf8'));
        let isopen = set.tobigset
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
                isopen = true;
            }, cdtime);
        }
        await common.sleep(20);
        let img = []
        if (e.source) {
            let source;
            if (e.isGroup) {
                source = (await e.group.getChatHistory(e.source.seq, 1)).pop();
            } else {
                source = (await e.friend.getChatHistory(e.source.time, 1)).pop();
            }
            for (let i of source.message) {
                if (i.type == 'image') {
                    img.push(i.url)
                }
            }
        } else {
            img = e.img
        }
        let a = {"app":"com.tencent.imagetextbot", "desc":"", "view":"index", "ver":"1.0.0.11", "prompt":"[图片]", "appID":"", "sourceName":"", "actionData":"", "actionData_A":"", "sourceUrl":"",
            "meta":{"robot":{"cover":(img[0]), "jump_url":"", "subtitle":"", "title":""}},
            "config":{"ctime":1672809516, "menuMode":0, "showSender":0, "token":"c1d20633e301ada3f6026f40ecce0587", "type":"normal"},
            "text":"",
            "sourceAd":"",
            }
        await ArkMsg.Share(JSON.stringify(a), e)
        return true
    }
    async notebig(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/tobig.yaml','utf8'));
        let isopen = set.tobignote
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
                isopen = true;
            }, cdtime);
        }
        await common.sleep(20);
        let data = await Note.get(this.e)
        if (!data) return
        let imgs = await puppeteer.screenshot('dailyNote', data)
        e.reply(imgs)
        await common.sleep(2000);
        let img = []
        if (e.reply) {
            let source;
            if (e.isGroup) {
                source = (await e.group.getChatHistory(e.reply.seq, 1)).pop();
            } else {
                source = (await e.friend.getChatHistory(e.reply.time, 1)).pop();
            }
            for (let i of source.message) {
                if (i.type == 'image') {
                    img.push(i.url)
                }
            }
        } else {
            img = e.img
        }
        console.log(img)
        await common.sleep(20);
        let a = {"app":"com.tencent.imagetextbot", "desc":"", "view":"index", "ver":"1.0.0.11", "prompt":"[图片]", "appID":"", "sourceName":"", "actionData":"", "actionData_A":"", "sourceUrl":"",
            "meta":{"robot":{"cover":(img[0]), "jump_url":"", "subtitle":"", "title":""}},
            "config":{"ctime":1672809516, "menuMode":0, "showSender":0, "token":"c1d20633e301ada3f6026f40ecce0587", "type":"normal"},
            "text":"",
            "sourceAd":"",
        }
        await ArkMsg.Share(JSON.stringify(a), e)

        return true
    }
}

