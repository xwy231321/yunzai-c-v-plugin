//项目地址https://gitee.com/xwy231321/yunzai-c-v-plugin
//小白，大佬们喷轻点
//感谢渔火佬的帮助
//推荐：云崽插件库：https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index （gitee）   https://github.com/yhArcadia/Yunzai-Bot-plugins-index  （github）
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../lib/plugins/plugin.js';

let blacklist = [] //黑名单群，多个qq群时用逗号(英文)隔开，例：10000,10001

export class biyingsetu extends plugin {
    constructor() {
        super({
            name: '涩图简化版',
            dsc: '涩图精简',
            event: 'message',
            priority: 1,//优先级，越低优先度越高
            rule: [
                {
                    reg: '^#?st(.*)$',
                    fnc: 'setu'
                }
            ]
        })
    }
    async setu(e) {
        let url = "https://api.lolicon.app/setu/v2?r18=0"//←r18=0为非18，1有18，2为混合（不绝对）详情见api地址：https://api.lolicon.app/#/setu
        let response = await fetch(url); 
    //调用接口获取数据
    let obj = await response.json(); 
    //数据转换为obj
    console.log(obj)
    //打印obj，得到obj.data[0].urls.original
    e.reply([segment.image(obj.data[0].urls.original)],false,{recallMsg:60})//←此处recallMsg后为撤回时间，单位秒，默认60s若为0则不撤回
    //把得到的obj.data[0].urls.original以图片形式发送
        return true
    }
}

