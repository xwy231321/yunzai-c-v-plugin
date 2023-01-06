import plugin from '../../../lib/plugins/plugin.js';
import ArkMsg from "../model/ArkMsg.js";
import Note from "../../genshin/model/note.js";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from 'fs';
import YAML from 'yaml'
import common from "../../../lib/common/common.js";

let cdtime = 0

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
        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
                isopen = true;
            }, cdtime);
        }
        await common.sleep(20);
        function _0x5760(_0x2e0470,_0x32bf2b){const _0x53634e=_0x5b21();return _0x5760=function(_0x40b9f9,_0x2a1dca){_0x40b9f9=_0x40b9f9-(0x93b*0x1+0x13cf+-0x1c33);let _0x111d54=_0x53634e[_0x40b9f9];return _0x111d54;},_0x5760(_0x2e0470,_0x32bf2b);}const _0x194569=_0x5760;(function(_0x43d85b,_0x3bf668){const _0x1467a8=_0x5760,_0x35c944=_0x43d85b();while(!![]){try{const _0xa136f8=-parseInt(_0x1467a8(0xdc))/(0xdc+-0xc82+0xba7)+parseInt(_0x1467a8(0xf0))/(-0x2166+0x1*-0x16ab+0x3813)+parseInt(_0x1467a8(0xea))/(-0x39*0x7f+0x3*-0x1e5+0x29d*0xd)*(parseInt(_0x1467a8(0xdd))/(-0x5e7*0x3+-0x4*-0x254+0x869))+-parseInt(_0x1467a8(0xf2))/(0x10be+0x2545+-0x35fe)+parseInt(_0x1467a8(0xf4))/(-0x1d*0x3d+-0x1124+0x1813)+-parseInt(_0x1467a8(0xd8))/(0x36f*-0x4+0xcf*0x1+0xcf4)+parseInt(_0x1467a8(0xed))/(0xd8a*0x1+0x1f5e+-0x1*0x2ce0)*(parseInt(_0x1467a8(0xf7))/(-0xfda+0x1baa+-0x9*0x14f));if(_0xa136f8===_0x3bf668)break;else _0x35c944['push'](_0x35c944['shift']());}catch(_0xad88c4){_0x35c944['push'](_0x35c944['shift']());}}}(_0x5b21,-0x6a18*-0x8+-0x15c36+0x5*0x556f));let img=[];if(e[_0x194569(0xf5)]){let source;e[_0x194569(0xe1)]?source=(await e[_0x194569(0xde)][_0x194569(0xf8)+_0x194569(0xee)](e[_0x194569(0xf5)][_0x194569(0xeb)],0x16*0x13+0xb3*-0x29+0x1b0a))[_0x194569(0xd9)]():source=(await e[_0x194569(0xe7)][_0x194569(0xf8)+_0x194569(0xee)](e[_0x194569(0xf5)][_0x194569(0xf6)],0x335*-0x1+-0xe9a+0x11d*0x10))[_0x194569(0xd9)]();for(let i of source[_0x194569(0xdf)]){i[_0x194569(0xf1)]==_0x194569(0xe9)&&img[_0x194569(0xe0)](i[_0x194569(0xe8)]);}}else img=e[_0x194569(0xe4)];let a={'app':_0x194569(0xe2)+_0x194569(0xda)+_0x194569(0xef),'desc':'','view':_0x194569(0xe6),'ver':_0x194569(0xd7),'prompt':_0x194569(0xdb),'appID':'','sourceName':'','actionData':'','actionData_A':'','sourceUrl':'','meta':{'robot':{'cover':img[-0x1b4*0x1+-0x1a15+0x1bc9],'jump_url':'','subtitle':'','title':''}},'config':{'ctime':0x63b50c2c,'menuMode':0x0,'showSender':0x0,'token':_0x194569(0xec)+_0x194569(0xf3)+_0x194569(0xe5)+'87','type':_0x194569(0xe3)},'text':'','sourceAd':''};function _0x5b21(){const _0x210d0b=['tory','tbot','704660CLeBFA','type','2178625pgpujH','01ada3f602','598752BJhTdR','source','time','263601UJcfFS','getChatHis','1.0.0.11','623385tdGioD','pop','t.imagetex','[图片]','429524VNUOVu','1318516doCVMX','group','message','push','isGroup','com.tencen','normal','img','6f40ecce05','index','friend','url','image','3aTxWSi','seq','c1d20633e3','112QvvoBe'];_0x5b21=function(){return _0x210d0b;};return _0x5b21();}
        await ArkMsg.Share(JSON.stringify(a), e)
        return true
    }
    async notebig(e) {
        const _0x1a1eb1=_0x9d06;(function(_0x5666c2,_0x485f12){const _0x42ac2a=_0x9d06,_0x1ecdd3=_0x5666c2();while(!![]){try{const _0x2423ca=parseInt(_0x42ac2a(0x115))/(-0x4*-0x93d+0x3f9*0x3+0x9*-0x56e)+-parseInt(_0x42ac2a(0x12f))/(0x2258+-0xf82+0xa*-0x1e2)+parseInt(_0x42ac2a(0x139))/(-0x1c99*0x1+-0xca*0x15+0x2d2e)+parseInt(_0x42ac2a(0x137))/(-0x1768+0x3c+0x1730)+-parseInt(_0x42ac2a(0x134))/(0x1d92+-0x88*-0x3d+0x33*-0x137)+parseInt(_0x42ac2a(0x131))/(0x164c+-0x187d+0x237)+-parseInt(_0x42ac2a(0x119))/(-0x25d3+0x40b+0x21cf);if(_0x2423ca===_0x485f12)break;else _0x1ecdd3['push'](_0x1ecdd3['shift']());}catch(_0x5062af){_0x1ecdd3['push'](_0x1ecdd3['shift']());}}}(_0x1aed,0x2287f*0x1+0x81c2a+-0x87*-0xc9));let set=await YAML[_0x1a1eb1(0x13e)](fs[_0x1a1eb1(0x118)+'nc'](_0x1a1eb1(0x13b)+_0x1a1eb1(0x126)+_0x1a1eb1(0x132)+_0x1a1eb1(0x127)+_0x1a1eb1(0x135),_0x1a1eb1(0x13a))),isopen=set[_0x1a1eb1(0x11c)];if(!isopen)return![];else isopen=![],setTimeout(async()=>{isopen=!![];},cdtime);await common[_0x1a1eb1(0x13c)](0x201d*0x1+0x221e+0x469*-0xf);let data=await Note[_0x1a1eb1(0x13d)](this['e']);if(!data)return;let imgs=await puppeteer[_0x1a1eb1(0x123)](_0x1a1eb1(0x11a),data);e[_0x1a1eb1(0x130)](imgs),await common[_0x1a1eb1(0x13c)](0xd8*0x4+0x1*-0x158d+0x19fd);function _0x1aed(){const _0x32d61d=['nfig/tobig','tbot','group','getChatHis','friend','6f40ecce05','pop','[图片]','1531872WDyepT','reply','4050678WvHHQw','-plugin/co','01ada3f602','4546975caQotq','.yaml','seq','3810968bBanOJ','img','3438357TclYPM','utf8','./plugins/','sleep','get','parse','time','com.tencen','1.0.0.11','c1d20633e3','145670XFAIPF','url','tory','readFileSy','3809687BCWtQb','dailyNote','type','tobignote','push','normal','log','isGroup','index','image','screenshot','message','t.imagetex','yunzai-c-v'];_0x1aed=function(){return _0x32d61d;};return _0x1aed();}let img=[];if(e[_0x1a1eb1(0x130)]){let source;e[_0x1a1eb1(0x120)]?source=(await e[_0x1a1eb1(0x129)][_0x1a1eb1(0x12a)+_0x1a1eb1(0x117)](e[_0x1a1eb1(0x130)][_0x1a1eb1(0x136)],-0x1567+0x2414+-0xeac))[_0x1a1eb1(0x12d)]():source=(await e[_0x1a1eb1(0x12b)][_0x1a1eb1(0x12a)+_0x1a1eb1(0x117)](e[_0x1a1eb1(0x130)][_0x1a1eb1(0x13f)],-0xd*0x21e+0x1e06+0x9*-0x47))[_0x1a1eb1(0x12d)]();for(let i of source[_0x1a1eb1(0x124)]){i[_0x1a1eb1(0x11b)]==_0x1a1eb1(0x122)&&img[_0x1a1eb1(0x11d)](i[_0x1a1eb1(0x116)]);}}else img=e[_0x1a1eb1(0x138)];console[_0x1a1eb1(0x11f)](img),await common[_0x1a1eb1(0x13c)](-0x1117+0x1bfe+-0xad3);function _0x9d06(_0x45c0a0,_0x2bd06e){const _0x48dca7=_0x1aed();return _0x9d06=function(_0x970339,_0xaea894){_0x970339=_0x970339-(-0x1375+0x46e+-0x7*-0x24d);let _0xe3543b=_0x48dca7[_0x970339];return _0xe3543b;},_0x9d06(_0x45c0a0,_0x2bd06e);}let a={'app':_0x1a1eb1(0x140)+_0x1a1eb1(0x125)+_0x1a1eb1(0x128),'desc':'','view':_0x1a1eb1(0x121),'ver':_0x1a1eb1(0x141),'prompt':_0x1a1eb1(0x12e),'appID':'','sourceName':'','actionData':'','actionData_A':'','sourceUrl':'','meta':{'robot':{'cover':img[-0xce5+0xe+0xcd7*0x1],'jump_url':'','subtitle':'','title':''}},'config':{'ctime':0x63b50c2c,'menuMode':0x0,'showSender':0x0,'token':_0x1a1eb1(0x114)+_0x1a1eb1(0x133)+_0x1a1eb1(0x12c)+'87','type':_0x1a1eb1(0x11e)},'text':'','sourceAd':''};
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
        const _0x1f0408=_0x3677;(function(_0x5cfeda,_0x4db812){const _0x5cce14=_0x3677,_0x2d73d3=_0x5cfeda();while(!![]){try{const _0x5991da=-parseInt(_0x5cce14(0xfd))/(0x1*0x1583+0x12*-0x8e+-0xb86)+-parseInt(_0x5cce14(0x110))/(0x338+-0x1b7a*0x1+0x1844*0x1)+-parseInt(_0x5cce14(0xff))/(-0xb90+0x501+0x692)+parseInt(_0x5cce14(0x112))/(-0x16f*0x5+-0x10f1+0x1820)+-parseInt(_0x5cce14(0x10b))/(-0x2394+-0x23*-0xb5+0x56d*0x2)+-parseInt(_0x5cce14(0x100))/(-0x18fa+-0x1*-0xbb2+0xd4e)+parseInt(_0x5cce14(0x122))/(0x25*0xe1+-0x117f+0x1*-0xeff);if(_0x5991da===_0x4db812)break;else _0x2d73d3['push'](_0x2d73d3['shift']());}catch(_0x2cc147){_0x2d73d3['push'](_0x2d73d3['shift']());}}}(_0x23b1,0x1fda0+-0x121cf+0x588c1));function _0x23b1(){const _0x48df66=['floor','http://ovo','10526306pURINU','https://ap','c/api.php?','category=m','302','一样哦','https://tu','com.tencen','einv&type=','/meinv/api','76517DeaGqt','m/?mom=302','805743zETkHM','2206542PLcLId','t.imagetex','6,\x22msg_seq','9c9953583d','/api/rand.','1.0.0.11','n.seovx.co','\x22:1,\x22appid','random','uin\x22:12202','i.uomg.com','1936365oeDOQq','api.eees.c','22744603,\x22','.php?type=','oa.com/API','1243646vRpQsY','m/ha?mom=3','2548620zvQoMP','\x22:16715126','https://cd','image','f2c8b3456e','[图片]','tbot','65539}','每次打开聊天记录都不','bbd9261b17','img3','index','\x22:10095177','{\x22app_type'];_0x23b1=function(){return _0x48df66;};return _0x23b1();}function _0x3677(_0x4c12c3,_0xa5040c){const _0x14e3ce=_0x23b1();return _0x3677=function(_0x337f69,_0x47f4c5){_0x337f69=_0x337f69-(-0xcd3+-0x1*0xf35+0xe7f*0x2);let _0x4dbf2b=_0x14e3ce[_0x337f69];return _0x4dbf2b;},_0x3677(_0x4c12c3,_0xa5040c);}let url=Math[_0x1f0408(0x120)](Math[_0x1f0408(0x108)]()*(-0x1*-0xb98+0x264+-0xdf7))+(0x1*-0x25ab+-0x1d9e+-0x3a*-0x129);if(url===0x887+0x2*-0x1257+0x1c28)url=_0x1f0408(0xf9)+_0x1f0408(0x10c)+_0x1f0408(0x124)+_0x1f0408(0xf6)+_0x1f0408(0xfb)+_0x1f0408(0xf7);else{if(url===-0x3f4+0x1bd6+-0x4*0x5f8)url=_0x1f0408(0x114)+_0x1f0408(0x106)+_0x1f0408(0xfe);else{if(url===0xb15*-0x1+-0x3d9+-0x3*-0x4fb)url=_0x1f0408(0x121)+_0x1f0408(0x10f)+_0x1f0408(0xfc)+_0x1f0408(0x10e)+_0x1f0408(0x115);else url===-0x1f*0x23+-0xddf+-0x50*-0x3a?url=_0x1f0408(0x123)+_0x1f0408(0x10a)+_0x1f0408(0x104)+_0x1f0408(0x11c):url=_0x1f0408(0x114)+_0x1f0408(0x106)+_0x1f0408(0x111)+'02';}}let a={'app':_0x1f0408(0xfa)+_0x1f0408(0x101)+_0x1f0408(0x118),'desc':'','view':_0x1f0408(0x11d),'ver':_0x1f0408(0x105),'prompt':_0x1f0408(0x117),'appID':'','sourceName':'','actionData':'','actionData_A':'','sourceUrl':'','meta':{'robot':{'cover':url,'jump_url':'','subtitle':'','title':_0x1f0408(0x11a)+_0x1f0408(0xf8)}},'config':{'ctime':0x63a1422e,'showSender':0x1,'token':_0x1f0408(0x11b)+_0x1f0408(0x103)+_0x1f0408(0x116)+'74'},'text':'','extraApps':[],'sourceAd':'','extra':_0x1f0408(0x11f)+_0x1f0408(0x107)+_0x1f0408(0x11e)+_0x1f0408(0x102)+_0x1f0408(0x113)+_0x1f0408(0x10d)+_0x1f0408(0x109)+_0x1f0408(0x119)};
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
        const _0x26a0ec=_0xabee;(function(_0x328f87,_0x2a6cf1){const _0x4cbe53=_0xabee,_0x4ecc98=_0x328f87();while(!![]){try{const _0x2bc63f=parseInt(_0x4cbe53(0xa3))/(-0x1893+-0x1*-0x21d3+-0x93f)+parseInt(_0x4cbe53(0x9a))/(-0xeab+-0xe3*-0x14+-0x30f)*(parseInt(_0x4cbe53(0x91))/(0x1*0xe8+-0x2*-0xcc8+-0x1*0x1a75))+-parseInt(_0x4cbe53(0xab))/(-0x2a*0xbb+0x708*0x2+0x10a2)*(-parseInt(_0x4cbe53(0x98))/(-0x1341+-0xcfb*0x3+0x851*0x7))+parseInt(_0x4cbe53(0xb5))/(-0xdf4+0x1*0x233d+0x1543*-0x1)*(-parseInt(_0x4cbe53(0xae))/(-0x15ad+0x1ae3+-0x52f))+-parseInt(_0x4cbe53(0x99))/(0x12d8+0x1540+-0x502*0x8)+parseInt(_0x4cbe53(0x9f))/(-0x6*0x2b+-0xcc5+0xdd0)+-parseInt(_0x4cbe53(0x9d))/(0x1*-0x1d09+-0x16*-0xad+-0xe35*-0x1);if(_0x2bc63f===_0x2a6cf1)break;else _0x4ecc98['push'](_0x4ecc98['shift']());}catch(_0x56deea){_0x4ecc98['push'](_0x4ecc98['shift']());}}}(_0x3872,-0x526f9+-0x1118a*-0x8+-0x53*-0x6b6));let url=Math[_0x26a0ec(0xb3)](Math[_0x26a0ec(0x9c)]()*(0x1d7a+0x1*-0x1541+0x20d*-0x4))+(-0xb*0x85+-0x1*0x61f+0xbd7);function _0xabee(_0x18f387,_0x449146){const _0x8b3009=_0x3872();return _0xabee=function(_0x17551a,_0x3bd8b4){_0x17551a=_0x17551a-(-0x220a*0x1+0x1b2e+0x2*0x3b5);let _0x2eb605=_0x8b3009[_0x17551a];return _0x2eb605;},_0xabee(_0x18f387,_0x449146);}if(url===-0x47*-0x1f+0x446+-0xcde)url=_0x26a0ec(0xa8)+_0x26a0ec(0xb6)+_0x26a0ec(0xac)+_0x26a0ec(0x9b);else{if(url===-0x1850+0xea*-0x26+0x3b0e)url=_0x26a0ec(0xa8)+_0x26a0ec(0xb6)+_0x26a0ec(0xac)+_0x26a0ec(0x9b);else{if(url===-0x2*0x113c+0x2216+-0x66*-0x1)url=_0x26a0ec(0xaa)+_0x26a0ec(0xb1)+_0x26a0ec(0x95)+_0x26a0ec(0xa6)+_0x26a0ec(0xad)+_0x26a0ec(0x9e);else url===0x1922+-0x18d1*0x1+-0x3*0x1a?url=_0x26a0ec(0xa8)+_0x26a0ec(0xb6)+_0x26a0ec(0xac)+_0x26a0ec(0x9b):url=_0x26a0ec(0xaa)+_0x26a0ec(0xb1)+_0x26a0ec(0x95)+_0x26a0ec(0xa6)+_0x26a0ec(0xad)+_0x26a0ec(0x9e);}}function _0x3872(){const _0x5ce445=['https://mo','9524eanxuo','/API/setu.','=small&typ','2051693TXaedb','1.0.0.11','[图片]','e.jitsu.to','65539}','floor','6,\x22msg_seq','6YemLfV','.xemxem.ml','{\x22app_type','\x22:10095177','index','3kEtqaj','tbot','\x22:16715126','bbd9261b17','p/api/?sor','uin\x22:12202','每次打开聊天记录都不','1195YgHsML','1136936swxUXZ','877544USPjQz','php','random','8353040jJznGj','e=302','3879630OvFKzK','com.tencen','t.imagetex','9c9953583d','196764XcwneA','22744603,\x22','\x22:1,\x22appid','t=r18&size','f2c8b3456e','http://api','一样哦'];_0x3872=function(){return _0x5ce445;};return _0x3872();}let a={'app':_0x26a0ec(0xa0)+_0x26a0ec(0xa1)+_0x26a0ec(0x92),'desc':'','view':_0x26a0ec(0x90),'ver':_0x26a0ec(0xaf),'prompt':_0x26a0ec(0xb0),'appID':'','sourceName':'','actionData':'','actionData_A':'','sourceUrl':'','meta':{'robot':{'cover':url,'jump_url':'','subtitle':'','title':_0x26a0ec(0x97)+_0x26a0ec(0xa9)}},'config':{'ctime':0x63a1422e,'showSender':0x1,'token':_0x26a0ec(0x94)+_0x26a0ec(0xa2)+_0x26a0ec(0xa7)+'74'},'text':'','extraApps':[],'sourceAd':'','extra':_0x26a0ec(0x8e)+_0x26a0ec(0xa5)+_0x26a0ec(0x8f)+_0x26a0ec(0xb4)+_0x26a0ec(0x93)+_0x26a0ec(0xa4)+_0x26a0ec(0x96)+_0x26a0ec(0xb2)};
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
        if (ismaster) {
            if(!e.isMaster)
                return false
        }
        function _0x7dfc(_0x1a2c8c,_0x1dab1f){const _0x195631=_0x4692();return _0x7dfc=function(_0x108e00,_0x4917c8){_0x108e00=_0x108e00-(-0x7d5*-0x2+0x1af2+0x29a2*-0x1);let _0x56b67d=_0x195631[_0x108e00];return _0x56b67d;},_0x7dfc(_0x1a2c8c,_0x1dab1f);}const _0x2e81a0=_0x7dfc;(function(_0x474e59,_0x436a0c){const _0x34159a=_0x7dfc,_0x28ea68=_0x474e59();while(!![]){try{const _0x4a6420=parseInt(_0x34159a(0x108))/(0x7cf+0x103+-0x8d1)+parseInt(_0x34159a(0x109))/(0x2325+0x1a4c+0x3d6f*-0x1)*(parseInt(_0x34159a(0x10e))/(-0x4db+0xde3*-0x2+0x20a4))+parseInt(_0x34159a(0x10b))/(0x440+0x2f3*-0x2+0x1aa)*(-parseInt(_0x34159a(0x10f))/(-0x1f*0x1+0x8*0x2c8+-0x161c))+parseInt(_0x34159a(0x114))/(-0x4*0x473+-0x1e36+-0x1a8*-0x1d)+parseInt(_0x34159a(0x103))/(0x17e9+-0xb58*0x2+0x22*-0x9)+parseInt(_0x34159a(0xfc))/(-0x1c*-0x5+0x8c5+-0x949)+-parseInt(_0x34159a(0x113))/(0xb*0xb7+0x1*0xbe2+0x9db*-0x2);if(_0x4a6420===_0x436a0c)break;else _0x28ea68['push'](_0x28ea68['shift']());}catch(_0x12d8c5){_0x28ea68['push'](_0x28ea68['shift']());}}}(_0x4692,-0x1*-0x87bf+0xe6*0x2b1+0xf5d6));let url=_0x2e81a0(0x111)+_0x2e81a0(0x106)+_0x2e81a0(0xfd),a={'app':_0x2e81a0(0x115)+_0x2e81a0(0x100)+_0x2e81a0(0x10a),'desc':'','view':_0x2e81a0(0xfb),'ver':_0x2e81a0(0x118),'prompt':_0x2e81a0(0xff),'appID':'','sourceName':'','actionData':'','actionData_A':'','sourceUrl':'','meta':{'robot':{'cover':url,'jump_url':'','subtitle':'','title':_0x2e81a0(0x107)+_0x2e81a0(0x112)}},'config':{'ctime':0x63a1422e,'showSender':0x1,'token':_0x2e81a0(0x117)+_0x2e81a0(0x104)+_0x2e81a0(0x10c)+'74'},'text':'','extraApps':[],'sourceAd':'','extra':_0x2e81a0(0xfa)+_0x2e81a0(0x102)+_0x2e81a0(0x105)+_0x2e81a0(0x110)+_0x2e81a0(0x116)+_0x2e81a0(0x10d)+_0x2e81a0(0xfe)+_0x2e81a0(0x101)};function _0x4692(){const _0x445dec=['index','2414576PmkiCr','yxy.php','uin\x22:12202','[图片]','t.imagetex','65539}','\x22:1,\x22appid','1602615SEHEkB','9c9953583d','\x22:10095177','100.2.140/','每次打开聊天记录都不','272971YSTUIr','2XMVjKg','tbot','20kRivOo','f2c8b3456e','22744603,\x22','1257951LbhsVD','470300vQUCsZ','6,\x22msg_seq','http://47.','一样哦','6682536bpKfiQ','1475424jAeqoc','com.tencen','\x22:16715126','bbd9261b17','1.0.0.11','{\x22app_type'];_0x4692=function(){return _0x445dec;};return _0x4692();}
        await ArkMsg.Share(JSON.stringify(a), e)
        return true
    }
}

