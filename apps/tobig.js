import plugin from '../../../lib/plugins/plugin.js';
import ArkMsg from "../model/ArkMsg.js";
import Note from "../../genshin/model/note.js";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from 'fs';
import YAML from 'yaml'
import common from "../../../lib/common/common.js";

let cdtime = 0//勿修改

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
                    reg: '^#?(体力|树脂|查询体力)$',
                    fnc: 'notebig'
                },{
                    reg: '^#?三元图卡片$',
                    fnc: 'tobigthree'
                },{
                    reg: '^#?铯图卡片$',
                    fnc: 'tobigstplus'
                },{
                    reg: '^#?云溪图卡片$',
                    fnc: 'tobigyxy'
                },

            ]
        })
    }
    async tobig(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/tobig.yaml','utf8'));
        let isopen = set.tobigset
        //判断开启状态
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
                isopen = true;
            }, cdtime);
        }
        //获取回复/携带图片链接
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
        //json卡片编辑
        let a = {"app":"com.tencent.imagetextbot", "desc":"", "view":"index", "ver":"1.0.0.11", "prompt":"[图片]", "appID":"", "sourceName":"", "actionData":"", "actionData_A":"", "sourceUrl":"",
            "meta":{"robot":{"cover":(img[0]), "jump_url":"", "subtitle":"", "title":""}},
            "config":{"ctime":1672809516, "menuMode":0, "showSender":0, "token":"c1d20633e301ada3f6026f40ecce0587", "type":"normal"},
            "text":"",
            "sourceAd":"",
            }
            //prompt为外部显示信息内容
            //cover为展示图片得内容
            //jump_url为跳转链接
            //subtitle为标题
            //title为标题
        await ArkMsg.Share(JSON.stringify(a), e)
        //share方法发送
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
        //米游社体力块
        await common.sleep(2000);

        //获取上一条图片记录，并获取图片链接
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
    async tobigthree(e) {
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
        //随机选取一条链接
        let url = Math.floor(Math.random() * 5) + 1;
        if (url === 1) {
            url = `https:\/\/tuapi.eees.cc\/api.php?category=meinv&type=302`;
        } else if (url === 2) {
            url = `https:\/\/cdn.seovx.com\/?mom=302`;
        } else if (url === 3) {
            url = `http:\/\/ovooa.com\/API\/meinv\/api.php?type=image`;
        } else if (url === 4) {
            url = `https:\/\/api.uomg.com\/api\/rand.img3`
        } else {
            url = `https:\/\/cdn.seovx.com\/ha?mom=302`
        }
        let a = {"app":"com.tencent.imagetextbot","desc":"","view":"index","ver":"1.0.0.11","prompt":"[图片]","appID":"","sourceName":"","actionData":"","actionData_A":"","sourceUrl":"","meta":{"robot":{"cover":(url),"jump_url":"","subtitle":"","title":"每次打开聊天记录都不一样哦"}},"config":{"ctime":1671512622,"showSender":1,"token":"bbd9261b179c9953583df2c8b3456e74"},"text":"","extraApps":[],"sourceAd":"","extra":"{\"app_type\":1,\"appid\":100951776,\"msg_seq\":1671512622744603,\"uin\":1220265539}"}

        await ArkMsg.Share(JSON.stringify(a), e)
        return true
    }
    async tobigstplus(e) {
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
        let url = Math.floor(Math.random() * 5) + 1;
        if (url === 1) {
            url = `https:\/\/image.anosu.top\/pixiv\/direct?r18=1`;
        } else if (url === 2) {
            url = `https:\/\/image.anosu.top\/pixiv\/direct?r18=1&keyword=genshinimpact`;
        } else if (url === 4) {
            url = `http:\/\/www.ashking.ltd\/18.php`;
        } else if (url === 3) {
            url = `https:\/\/www.acy.moe\/api\/r18`
        } else {
            url = `https:\/\/moe.jitsu.top\/api\/?sort=r18&size=small&type=302`
        }
        let a = {"app":"com.tencent.imagetextbot","desc":"","view":"index","ver":"1.0.0.11","prompt":"[图片]","appID":"","sourceName":"","actionData":"","actionData_A":"","sourceUrl":"","meta":{"robot":{"cover":(url),"jump_url":"","subtitle":"","title":"每次打开聊天记录都不一样哦"}},"config":{"ctime":1671512622,"showSender":1,"token":"bbd9261b179c9953583df2c8b3456e74"},"text":"","extraApps":[],"sourceAd":"","extra":"{\"app_type\":1,\"appid\":100951776,\"msg_seq\":1671512622744603,\"uin\":1220265539}"}

        await ArkMsg.Share(JSON.stringify(a), e)
        return true
    }
    async tobigyxy(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let masters = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/mastercfg.yaml','utf8'));
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let cdtime = cdset.canciyuancd//触发CD，单位毫秒，0为无CD
        let isopen = set.yunxiyuan
        let ismaster = masters.yunxiyuanmaster
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
                isopen = true;
            }, cdtime);
        }
        //判断是否开启进主人生效
        if (ismaster) {
            if(!e.isMaster)
                return false
        }

        let url = `https://yunxi.peterliangaaa.repl.co`
        let a = {"app":"com.tencent.imagetextbot","desc":"","view":"index","ver":"1.0.0.11","prompt":"[图片]","appID":"","sourceName":"","actionData":"","actionData_A":"","sourceUrl":"","meta":{"robot":{"cover":(url),"jump_url":"","subtitle":"","title":"每次打开聊天记录都不一样哦"}},"config":{"ctime":1671512622,"showSender":1,"token":"bbd9261b179c9953583df2c8b3456e74"},"text":"","extraApps":[],"sourceAd":"","extra":"{\"app_type\":1,\"appid\":100951776,\"msg_seq\":1671512622744603,\"uin\":1220265539}"}
        await ArkMsg.Share(JSON.stringify(a), e)

        return true
    }
}

