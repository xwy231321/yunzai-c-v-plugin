//图片基本都是18限制的，群聊中谨慎使用，封号概不负责！！！
//推荐：云崽插件库：https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index （gitee）   https://github.com/yhArcadia/Yunzai-Bot-plugins-index  （github）
//即装即用，无需重启。                                                                                                                        
//有问题可以@我反馈，但我小白，不懂，不一定能回答，诶嘿（一般没问题，除了被封号）
//QQ：2060403379
//你可以在：蒙德幼稚园（134086404）里找到我，当然也在较大插件群里摸鱼。
//勇士，准备好了吗？（画风比较古老，已经是能发出来的最大限度了，在大分分钟没）
//感谢渔火佬提供帮助
//V1.0：随机se图
//V1.1：新增图片撤回（默认开启撤回，时间60s）
//V1.11：修改提示位置。
//V1.2:修复bug

//食用说明：发送“setuplus”，返回一张18+图片
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../lib/plugins/plugin.js';

let blacklist = [10000,10001] //黑名单群，多个qq群号时用逗号（英文）隔开 。

export class biyingsetu extends plugin {
    constructor() {
        super({
            name: 'setuplus',
            dsc: 'setuplus',
            event: 'message',
            priority: 25,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^setuplus(.*)$',
                    fnc: 'setu'
                }
            ]
        })
    }
    async setu(e) {
        let url = `https://www.acy.moe/api/r18`
        let msg=[segment.image(url)]
        e.reply(msg,false,{recallMsg:60})//←这里修改撤回时间，单位秒，默认60秒，时间为0则不撤回
        return true                           
    }
}

