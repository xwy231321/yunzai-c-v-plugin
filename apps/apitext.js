import { segment } from "oicq";
import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import co from '../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'

export class api extends plugin {
    constructor() {
        super({
            name: '清凉图api检测',
            dsc: '清凉图api检测',
            event: 'message',
            priority: 4999,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?清凉图检测$',
                    fnc: 'apitext',
                    permission: "master",
                }
            ]
        })
    }
     
    async apitext(e) {
        await e.reply('开始检测,预计1~5分钟');

        let image = []
        image.push('铯图共5个源\n盲盒共2个源\n三元图共6个\n源其他为一个源')
        image.push('以下为无法访问源列表，下发无消息为均正常')

        //别翻了，代码像shi山一样。。。。。。
        //能跑就行了（肥肥瘫.jpg）

















































































        //还翻呢？






















































        //罢了罢了




























































































        //屎山罢了，想看我也拦不住


        let num = 20

        for (let i = 0; i < [num]; i++) {
            let url 
    if (i === 0) {     
        url = `https://www.acy.moe/api/404`//b站404
    } else if (i === 1) {
        url = `https://api.dujin.org/pic/yuanshen`//原神盲盒
    } else if (i === 2) {
        url = `https://app.zichen.zone/api/acg.php`//盲盒
    } else if (i === 3) {
        url = `https://api.ixiaowai.cn/api/api.php`;//盲盒2
    } else if (i === 4) {
        url = `https://api.lolicon.app/setu/v2?r18=0`//清凉图18-
    } else if (i === 5) {
        url = `https://api.lolicon.app/setu/v2?r18=1`//清凉图18+
    } else if (i === 6) {
        url = `https://api.lolicon.app/setu/v2?r18=2`//清凉图混合
    } else if (i === 7) {
        url = `https://image.anosu.top/pixiv/direct?r18=1`;//铯图1
    } else if (i === 8) {
        url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;//铯图2 原神铯图
    } else if (i === 9) {
        url = `http://www.ashking.ltd/18.php`;//铯图3
    } else if (i === 10) {
        url = `https://www.acy.moe/api/r18`//铯图4
    } else if (i === 11) {
        url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`//铯图5
    } else if (i === 12) {
        url = `https://tuapi.eees.cc/api.php?category=meinv&type=302`;//三元图1
    } else if (i === 13) {
        url = `https://cdn.seovx.com/?mom=302`;//三元图2
    } else if (i === 14) {
        url = `http://ovooa.com/API/meinv/api.php?type=image`;//三元图3
    } else if (i === 15) {
        url = `http://api.btstu.cn/sjbz/`//三元图4
    } else if (i === 16) {
        url = `https://cdn.seovx.com/ha?mom=302`//三元图5
    } else if (i === 17) {
        url = `https://imagesapi.sesepic.top/3r18`//三铯图
    } else if (i === 18) {
        url = `https://imagesapi.sesepic.top/cos`//原神cos图
    } else if (i === 19) {
        url = `http://tfapi.top/API/nypic.php`//三元图6
    } else if (i === 20) {
        url = ``//云溪图
    }
    
            let ii = i + 1
        
            let name
            if (i === 0) {     
                name = `b站404`
            } else if (i === 1) {
                name = `原神盲盒`
            } else if (i === 2) {
                name = `盲盒`
            } else if (i === 3) {
                name = `盲盒2`
            } else if (i === 4) {
                name = `清凉图18-`
            } else if (i === 5) {
                name = `清凉图18+`
            } else if (i === 6) {
                name = `清凉图混合`
            } else if (i === 7) {
                name = `铯图1`
            } else if (i === 8) {
                name = `铯图2&原神铯图`
            } else if (i === 9) {
                name = `铯图3`
            } else if (i === 10) {
                name = `铯图4`
            } else if (i === 11) {
                name = `铯图5`
            } else if (i === 12) {
                name = `三元图1`
            } else if (i === 13) {
                name = `三元图2`
            } else if (i === 14) {
                name = `三元图3`
            } else if (i === 15) {
                name = `三元图4`
            } else if (i === 16) {
                name = `三元图5`
            } else if (i === 17) {
                name = `三铯图`
            } else if (i === 18) {
                name = `原神cos图`
            } else if (i === 19) {
                name = `三元图6`
            } else if (i === 20) {
                name = `云溪图`
            }
            try{
                var msg = await (await fetch(url))
                } catch(err){
                    image.push(name + '访问失败')
                    console.log(name + '无法访问')
                }

            console.log('已完成图源'+ name +'检测')
    
        //console.log()
        await common.sleep(200);
        console.log(i + 1);
        }
        e.reply('检测完毕')
        await common.sleep(200);
        e.reply(num > 1 ? await co.makeForwardMsg(e,image,'点击查看结果') : image,false,{recallMsg:0});


        return true
            
    }
}