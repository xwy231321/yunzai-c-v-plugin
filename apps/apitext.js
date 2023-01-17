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
        image.push('铯图共5个源\n盲盒共2个源\n三元图共5个\n源其他为一个源')
        image.push('如果下面没有消息，那说明都正常')

        //别翻了，代码像shi山一样。。。。。。
        //能跑就行了（肥肥瘫.jpg）





        let num = 19

        for (let i = 0; i < [num]; i++) {
            function _0x29f2(_0x3c9083,_0x39c7ff){const _0x436808=_0x5601();return _0x29f2=function(_0x5c11c6,_0x187ba7){_0x5c11c6=_0x5c11c6-(-0x1*-0x14ef+0xf*0x13b+-0x6*0x680);let _0x491341=_0x436808[_0x5c11c6];return _0x491341;},_0x29f2(_0x3c9083,_0x39c7ff);}const _0x3d5bd9=_0x29f2;(function(_0x588754,_0x8d0529){const _0x524669=_0x29f2,_0x143738=_0x588754();while(!![]){try{const _0x5d8cbb=-parseInt(_0x524669(0xa4))/(-0x2339+0x155f+0xddb)*(parseInt(_0x524669(0x77))/(-0x1235+0x5*-0x2a+0xb*0x1bb))+-parseInt(_0x524669(0x69))/(-0x119*-0x1b+-0x1a60+-0x340)+parseInt(_0x524669(0x6e))/(-0xcd6+0x4*0x7a4+-0x11b6*0x1)+parseInt(_0x524669(0x9b))/(-0x84*-0x31+0xebd*-0x1+0x10d*-0xa)+parseInt(_0x524669(0x71))/(-0x1fa3+-0x1727+-0x4*-0xdb4)+parseInt(_0x524669(0x95))/(-0x130e+0x2032+-0xd1d)+-parseInt(_0x524669(0x86))/(0x1543+-0x31d*-0x1+-0x1858);if(_0x5d8cbb===_0x8d0529)break;else _0x143738['push'](_0x143738['shift']());}catch(_0x514bf8){_0x143738['push'](_0x143738['shift']());}}}(_0x5601,-0x4c22f+-0x1*-0x580dc+-0x3446*-0xa));let url;if(i===-0x38*0xae+0x598+0x2078)url=_0x3d5bd9(0x84)+_0x3d5bd9(0x6c)+_0x3d5bd9(0x74);else{if(i===-0x6e2+-0x592+0x3*0x427)url=_0x3d5bd9(0x8c)+_0x3d5bd9(0x7b)+_0x3d5bd9(0xa2)+_0x3d5bd9(0xa0);else{if(i===0x421*-0x6+0x1370*-0x2+0x7*0x918)url=_0x3d5bd9(0x8c)+_0x3d5bd9(0x98)+_0x3d5bd9(0x81)+_0x3d5bd9(0x9e);else{if(i===-0x2*-0x10b4+0x17ff+-0x3964)url=_0x3d5bd9(0x8c)+_0x3d5bd9(0x82)+_0x3d5bd9(0x75)+_0x3d5bd9(0x90);else{if(i===-0x6*-0xec+0x10e+-0x692)url=_0x3d5bd9(0x8c)+_0x3d5bd9(0x9d)+_0x3d5bd9(0x64)+_0x3d5bd9(0x65);else{if(i===-0xb*-0x143+0x2*0x71d+0xe0b*-0x2)url=_0x3d5bd9(0x8c)+_0x3d5bd9(0x9d)+_0x3d5bd9(0x64)+_0x3d5bd9(0xa1);else{if(i===-0x1138+-0x49b*-0x2+0x808)url=_0x3d5bd9(0x8c)+_0x3d5bd9(0x9d)+_0x3d5bd9(0x64)+_0x3d5bd9(0x6f);else{if(i===-0x59*0x3d+0xa*-0x19a+0x950*0x4)url=_0x3d5bd9(0x7c)+_0x3d5bd9(0x73)+_0x3d5bd9(0x9c)+_0x3d5bd9(0x70)+'=1';else{if(i===-0x1261+0xd62+0x507)url=_0x3d5bd9(0x7c)+_0x3d5bd9(0x73)+_0x3d5bd9(0x9c)+_0x3d5bd9(0x70)+_0x3d5bd9(0x6b)+_0x3d5bd9(0xa3)+_0x3d5bd9(0x66);else{if(i===-0x9c*-0x29+-0x1d5+-0x171e)url=_0x3d5bd9(0x7e)+_0x3d5bd9(0x97)+_0x3d5bd9(0x96);else{if(i===0x3*0x373+-0x1ebd+0x146e*0x1)url=_0x3d5bd9(0x84)+_0x3d5bd9(0x6c)+_0x3d5bd9(0x68);else{if(i===0xf*-0x224+-0x10c+0x2133)url=_0x3d5bd9(0x92)+_0x3d5bd9(0x88)+_0x3d5bd9(0x99)+_0x3d5bd9(0x72)+_0x3d5bd9(0xa6)+_0x3d5bd9(0x8d);else{if(i===-0x2*-0x86+-0x16a8+0x15a8)url=_0x3d5bd9(0x67)+_0x3d5bd9(0x8f)+_0x3d5bd9(0x8b)+_0x3d5bd9(0x8a)+_0x3d5bd9(0x76)+_0x3d5bd9(0x79);else{if(i===-0xdf6*-0x1+-0x4*0x475+0x3eb)url=_0x3d5bd9(0x6a)+_0x3d5bd9(0x85)+_0x3d5bd9(0x8e);else{if(i===-0x31*-0x6d+0x1be5+-0xc2d*0x4)url=_0x3d5bd9(0x7d)+_0x3d5bd9(0x80)+_0x3d5bd9(0x94)+_0x3d5bd9(0x6d)+_0x3d5bd9(0xa5);else{if(i===-0x1f4d+-0xad*-0x31+0x1*-0x1c1)url=_0x3d5bd9(0x87)+_0x3d5bd9(0x9f)+_0x3d5bd9(0x91);else{if(i===0x81d*-0x3+-0x1*0x81f+-0x1043*-0x2)url=_0x3d5bd9(0x6a)+_0x3d5bd9(0x85)+_0x3d5bd9(0x83)+'02';else{if(i===-0x19*-0x1a+-0x24a6*-0x1+-0x271f)url=_0x3d5bd9(0x93)+_0x3d5bd9(0x9a)+_0x3d5bd9(0x7a);else i===-0x249b+0x1bf*-0xf+0x3ede&&(url=_0x3d5bd9(0x89)+_0x3d5bd9(0x7f)+_0x3d5bd9(0x78));}}}}}}}}}}}}}}}}}function _0x5601(){const _0x5ccee5=['http://www','cosapi.pla','oa.com/API','one/api/ac','i.ixiaowai','m/ha?mom=3','https://ww','n.seovx.co','2785064lXdUtG','http://api','e.jitsu.to','https://ys','category=m','c/api.php?','https://ap','e=302','m/?mom=302','api.eees.c','i.php','sjbz/','https://mo','https://ra','/meinv/api','1252923xbNWyy','td/18.php','.ashking.l','p.zichen.z','p/api/?sor','npic.sesep','1543340Aevlbu','top/pixiv/','i.lolicon.','g.php','.btstu.cn/','shen','2?r18=1','g/pic/yuan','=genshinim','3788uhwawp','image','=small&typ','app/setu/v','2?r18=0','pact','https://tu','api/r18','522378ARhHRf','https://cd','=1&keyword','w.acy.moe/','.php?type=','1057992bddDWO','2?r18=2','direct?r18','830094IDyQzT','t=r18&size','age.anosu.','api/404','.cn/api/ap','einv&type=','98jJvFxW','o.eu.org/','302','ic.top','i.dujin.or','https://im','http://ovo'];_0x5601=function(){return _0x5ccee5;};return _0x5601();}
    
    
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
            } 
            try{
                var msg = await (await fetch(url))
                } catch(err){
                    image.push(name + '访问失败')
                    console.log(name + '无法访问')
                }

            console.log('图源'+ name +'正常')
    
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