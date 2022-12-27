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
  '【#三元图】获得三次元图片 \n' +
  '【#云溪图】获得云溪院随机图 \n' +
  '【#原神盲盒】获得原神随机图 \n' +
  '以上指令#可以省略，且均支持多发 \n' + 
  '如：2张铯图/清凉图/随机漫画，2份盲盒/原神盲盒 \n' +
  '发送【#清凉图设置帮助】查看配置详情']
       e.reply(msg)
       return true
    }
}

