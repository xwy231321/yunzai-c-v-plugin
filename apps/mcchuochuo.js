//mc酱戳一戳（记得关喵喵戳一戳）
import { segment } from "oicq";
import fetch from "node-fetch";
import cfg from'../../../lib/config/config.js'
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const path=process.cwd()
export class mcchuochuo extends plugin {
    constructor() {
        super({
            name: '戳一戳',
        dsc: '戳一戳机器人触发效果',
        event: 'notice.group.poke',
        priority: 50,
        rule: [
            {
                /** 命令正则匹配 */
                fnc: 'chuoyichuo'
                }
            ]
        })
    }
    async chuoyichuo(e) {
        let cdset = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cd.yaml','utf8'));
        let set = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
        let isopen = set.cchuoyichuom
        let cdtime = cdset.mcchuoyichuocd//触发CD，单位毫秒，0为无CD
        if(e.target_id == cfg.qq){
            if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
               isopen = true;
            }, cdtime);
        }
        let url = `https://api.ixiaowai.cn/mcapi/mcapi.php`
        
        const puppeteer = require('puppeteer');

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process'
              ]
        });
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({
            width: 1920,
            height: 1080
        });
    
        await this.reply(segment.image(await page.screenshot({
            fullPage: true
        })))
    
        await browser.close();
        }
    }
}