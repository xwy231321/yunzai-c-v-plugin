
//推荐：云崽插件库：https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index （gitee）   https://github.com/yhArcadia/Yunzai-Bot-plugins-index  （github）
//即装即用，无需重启。
//不推荐群聊使用（大概率拦截），撤回，还是算了，勇士，就要一勇到底！
//有问题可以反馈，但我小白，解决可能不及时，诶嘿（一般没问题，除了被封号）
//QQ：2060403379
//你可以在：蒙德幼稚园（134086404）里找到我，当然也在较大插件群里摸鱼。
//感谢@渔火 佬的帮助（其一点点问的，顺便学习，渔火好帅，诶嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿）
//勇士，准备好了吗？
//食用说明：发送“st”，返回一张图片
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../lib/plugins/plugin.js';

let blacklist = [10000,10001] //黑名单群，多个qq群时用","隔开

export class biyingsetu extends plugin {
    constructor() {
        super({
            name: '涩图简化版',
            dsc: '涩图精简',
            event: 'message',
            priority: 10,//优先级，应该没会抢这个指令的吧，越低优先度越高
            rule: [
                {
                    reg: '^st(.*)$',
                    fnc: 'setu'
                }
            ]
        })
    }
    async setu(e) {
        let url = "https://api.lolicon.app/setu/v2?r18=1"//←r18=0为非18，1有18，2为混合（不绝对）详情见api地址：https://api.lolicon.app/#/setu
        let response = await fetch(url); //调用接口获取数据
    let obj = await response.json(); //数据转换为obj
    console.log(obj)//打印obj，得到obj.data[0].urls.original
    e.reply([segment.image(obj.data[0].urls.original)])//把得到的obj.data[0].urls.original以图片形式发送
        return true
    }
}

