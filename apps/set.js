import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import co from '../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));

export class St extends plugin {
    constructor() {
        super({
            name: "清凉图设置",
            dsc: "更改清凉图设置",
            event: "message",
            priority: 5000,
            rule: [
                {
                    reg: '^#?清凉图设置帮助$',
                    fnc: 'sethelp'
                },
                {
                    reg: "#?(开启|关闭)铯图$",
                    fnc: "setstplus",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)随机漫画$",
                    fnc: "setcomic",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)mc戳一戳$",
                    fnc: "setmcchuoyichuo",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)盲盒$",
                    fnc: "setmh",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)清凉图$",
                    fnc: "setst",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)三元图$",
                    fnc: "setthreephoto",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)原神盲盒$",
                    fnc: "setysmh",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)云溪图$",
                    fnc: "setyxysj",
                    permission: "master",
                },
                {
                    reg: "#?(开启|关闭)风控处理$",
                    fnc: "setfk",
                    permission: "master",
                },
                {
                    reg: "#?清凉图全部(开启|关闭)$",
                    fnc: "setall",
                    permission: "master",
                },

            ],
        });
    }

    async sethelp(e) {
        let msg=['发送#开启/关闭+功能 来开启/关闭对应功能 \n' +
        '示例：#开启铯图  #关闭铯图 \n' +
        '以下为对应功能名称： \n' +
        '随机漫画 \n' +
        'mc戳一戳 \n' +
        '盲盒 \n' +
        '清凉图 \n' +
        '铯图 \n' +
        '三元图 \n' +
        '原神盲盒 \n' +
        '云溪图 \n' +
        '风控处理 \n' +
        '    \n' +
        '当然也可以#清凉图全部开启，或#清凉图全部关闭  来快捷开关全部功能']
        e.reply(msg)
        return true
    }
    async setstplus(e) {
        let set
        if (/开启铯图/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.seettuuplus = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setcomic(e) {
        let set
        if (/开启随机漫画/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.asuijimanhua = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setmcchuoyichuo(e) {
        let set
        if (/开启mc戳一戳/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.cchuoyichuom = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setmh(e) {
        let set
        if (/开启盲盒/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.yifensuijimanghe = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }
    async setst(e) {
        let set
        if (/开启清凉图/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.ssttoooc = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setthreephoto(e) {
        let set
        if (/开启三元图/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.sanciyuan = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setysmh(e) {
        let set
        if (/开启原神盲盒/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.yuanmangheshen = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setyxysj(e) {
        let set
        if (/开启云溪图/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.yunxiyuan = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setfk(e) {
        let set
        if (/开启消息风控/.test(e.msg)) {
            set = true
        }else {
            set = false
        }
        settings.xiaofeifengkong = set
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply('成功' + e.msg + ',重启后生效哦')
    }

    async setall(e) {
        let setall
        if (/全部开启/.test(e.msg)) {
            setall = true
        }else {
            setall = false
        }
        settings.seettuuplus = setall
        settings.asuijimanhua = setall
        settings.cchuoyichuom = setall
        settings.yifensuijimanghe = setall
        settings.ssttoooc = setall
        settings.sanciyuan = setall
        settings.yuanmangheshen = setall
        settings.xiaofeifengkong = setall
        settings.yunxiyuan = setall
        fs.writeFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml',YAML.stringify(settings),'utf8')
        e.reply(e.msg + '成功,重启后生效哦')
    }
}