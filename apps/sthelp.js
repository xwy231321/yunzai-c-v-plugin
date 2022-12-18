//插件：帮助
import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
export class sthelp extends plugin {
    constructor() {
        super({
            name: 'cv帮助',
            dsc: 'cvhelp',
            event: 'message',
            priority: 4000,
            rule: [
                {
                    reg: '^#?cv帮助$',
                    fnc: 'cvhelp'
                }
            ]
        })
    }
    async cvhelp(e) {
    let msg=['【#清凉图】获得随机清凉图 \n' +
  '【#铯图】获得随机se图 \n' +
  '【#随机漫画】获得随机B站404漫画 \n' +
  '【#盲盒】获得随机图 \n' +
  '【#原神盲盒】获得原神随机图 \n' +
  '以上指令#可以省略，且均支持多发 \n' + 
  '如：2张铯图/清凉图/随机漫画，2份盲盒/原神盲盒 \n' + 
  '【#系统占用】查看当前内存等系统信息 \n' +
  '群聊中【#更新群名片】可手动同步当前内存占用信息']
       e.reply(msg)
       return true
    }
}

