import plugin from '../../../lib/plugins/plugin.js';
import ArkMsg from "../model/ArkMsg.js";
export class tobig extends plugin {
    constructor() {
        super({
            name: '转大图',
            dsc: 'tobig',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?(转|发)大图$',
                    fnc: 'tobig'
                }

            ]
        })
    }
    async tobig(e) {
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
}

