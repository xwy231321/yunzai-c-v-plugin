import plugin from '../../../lib/plugins/plugin.js'
import os from 'os'
import { createRequire } from "module";
import cfg from "../../../lib/config/config.js";
import fs from 'fs'
import YAML from 'yaml'
const settings = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/cfg.yaml','utf8'));
const require = createRequire(import.meta.url);

let isopen = settings.qlnc
let cdtime = 0
export class poke extends plugin {
    constructor() {
        super({
            name: '戳一戳清理内存',
            dsc: '戳一戳机器人清理内存',
            event: 'notice.group.poke',
            priority: 100,
            rule: [{
                fnc: 'pokeCleanMemory'
            }]
        })
    }


    async pokeCleanMemory(e) {

        if (!isopen) {
            return false
        } else {
            isopen = false;
            setTimeout(async () => {
                isopen = true;
            }, cdtime);
        }

        if (e.target_id != e.self_id) {
            return false
        }
        if (cfg.masterQQ.indexOf(e.operator_id) == -1) {
            return false
        }
        let freeMem = os.freemem();
        var dealMem = (mem) => {
            var G = 0,
                M = 0,
                KB = 0;
            (mem > (1 << 30)) && (G = (mem / (1 << 30))
                .toFixed(2));
            (mem > (1 << 20)) && (mem < (1 << 30)) && (M = (mem / (1 << 20))
                .toFixed(2));
            (mem > (1 << 10)) && (mem > (1 << 20)) && (KB = (mem / (1 << 10))
                .toFixed(2));
            return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B';
        };
        var exec = require('child_process')
            .exec;
        var ls = exec('sync && echo 3 > /proc/sys/vm/drop_caches', function(error, stdout, stderr) {
            if (error) {
                e.reply("清理失败！\nError code: " + error.code + "\n" + error.stack);
                return false
            } else {
                let lastfreeMem = os.freemem();
                let d = (lastfreeMem - freeMem)
                    .toFixed(2);
                d = d < 0 ? 0 : d;
                d = dealMem(d);
                e.reply(`清理成功！\n为您释放了` + d + `内存，当前空闲内存为` + dealMem(lastfreeMem))
                return true
            }
        })

    }
}