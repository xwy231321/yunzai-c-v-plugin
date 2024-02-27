import fs from 'fs'
import YAML from 'yaml'
import path from 'path'
import { segment } from 'oicq'
import lodash from 'lodash'
import sizeOf from 'image-size'
import template from "art-template"
import puppeteer from "puppeteer"

export class guess_name extends plugin {
    constructor() {
        super({
            name: 'Guess the Genshin Impact character',
            dsc: 'Guess_name',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: '^#猜(头像|角色)(普通|困难|地狱)?(模式)?',
                    fnc: 'guessAvatar'
                },
                {
                    reg: '',
                    fnc: 'guessAvatarCheck'
                }
            ]
        })
    }

    async guessAvatar(e) {
        const maxtime = await YAML.parse(fs.readFileSync('./plugins/yunzai-c-v-plugin/config/guess.yaml', 'utf8'));
        const GAME_TIME_OUT = maxtime.maxtime
        let guessConfig = getGuessConfig(e)
        if (guessConfig.playing) {
            e.reply('猜角色游戏正在进行哦')
            return true
        }
        // 模式判断
        let hardMode = e.msg.includes('困难')
        let hellMode = e.msg.includes('地狱')
        // 既不是困难也不是地狱，那就是普通模式
        let normalMode = (!hardMode && !hellMode)
        // 图片大小
        let size, helpText
        if (hardMode) {
            size = lodash.random(30, 40)
            helpText = '%s\n在『困难模式』下，发送的图片将会变成黑白色。'
        } else if (hellMode) {
            size = lodash.random(30, 40)
            helpText = '%s\n在『地狱模式』下，发送的图片将会变成反色。'
        } else {
            size = lodash.random(30, 40)
            helpText = '%s'
        }
        helpText = helpText.replace('%s', `即将发送一张『随机角色』的『随机一角』，${GAME_TIME_OUT}秒之后揭晓答案！`)
        e.reply(helpText)
        let fileNames = []
        let ffn = (n) => !/(未知)/.test(n)
        let imgPath = lodash.random(0, 100) <= 30 ? logoPath : gachaPath
        fs.readdirSync(imgPath).filter(ffn).forEach(n => fileNames.push(n))
        let fileName = fileNames[Math.round(Math.random() * (fileNames.length - 1))]
        let roleName = fileName.replace(/\..+$/, '').replace(/\d/g, '')
        let roleId = roleIdToName(roleName)
        guessConfig.playing = true
        guessConfig.roleId = roleId
        console.group('猜角色')
        console.log('ID:', roleId)
        console.log('角色:', roleName)
        console.groupEnd()
        let imgSrc = path.join(imgPath, fileName)
        // 减小生成过多空白的可能性
        let minTop = 0, limitTop = 0, minLeft = 0, limitLeft = 0
        if (imgPath === gachaPath) {
            minTop = 50
        } else {
            minLeft = 30
            limitLeft = 30
        }
        // 算出图片位置
        let imgSize = sizeOf(imgSrc)
        let imgTop = lodash.random(minTop, imgSize.height - size - limitTop)
        let imgLeft = lodash.random(minLeft, imgSize.width - size - limitLeft)
        let imgColor = colors[lodash.random(0, colors.length - 1)]
        let props = {
            src: `file:///${imgSrc}`,
            size, imgTop, imgLeft, imgColor,
            imgWidth: imgSize.width,
            imgHeight: imgSize.height,
            hardMode, hellMode, normalMode
        }
        let base64 = null
        // 生成图片不阻断运行
        let promise = render(templateName, 'question', props)
        setTimeout(async () => {
            base64 = await promise
            if (base64) {
                e.reply(segment.image(`base64://${base64}`))
                guessConfig.normalMode = normalMode
                guessConfig.answer = render(templateName, 'answer', props)
                guessConfig.timer = setTimeout(() => {
                    if (guessConfig.playing) {
                        replayAnswer(e, ['很遗憾，还没有人答对哦，正确答案是：' + roleName], guessConfig)
                    }
                }, GAME_TIME_OUT * 1000)
            } else {
                guessConfig.playing = false
                e.reply('呜~ 图片生成失败了… 请稍后重试 〒▽〒')
            }
        }, 1500)
        return true
    }

    async guessAvatarCheck(e) {
        let guessConfig = getGuessConfig(e)
        let { playing, roleId, normalMode } = guessConfig
        if (playing && roleId && e.msg) {
            let id = roleIdToName(e.msg.trim())
            if (roleId === id) {
                await replayAnswer(e, ['恭喜你答对了！'], guessConfig, true)
                if (normalMode && lodash.random(0, 100) <= 8) {
                    e.reply('如果感觉太简单了的话，可以对我说“#猜角色困难模式”或者“#猜角色地狱模式”哦！')
                }
                return true
            }
            return false
        }
        return false
    }
}

// 项目路径
const _path = process.cwd()
const logoPath = path.join(_path, 'plugins/genshin/resources/img/role')
const gachaPath = path.join(_path, 'plugins/genshin/resources/img/gacha/character')

// 插件版本
const version = '2.0'

// 模板版本
const templateVersion = '2.0'
const templateName = `guessAvatar_${templateVersion}`
const pluginName = 'games-template-plugin-zolay'

/**
 * 因为是临时生成的模板，删掉也没事，
 * 所以不想占用 resources 目录下的资源，
 * 可能会对以后的功能造成冲突，
 * 最重要的是没有git ignore，可能会误提交。
 * 本来想放到 data 目录下，但是发现没有 export doRender 方法。
 * 所以只能使用 getPluginRender 了
 */

let Data = {
    /*
    * 根据指定的path依次检查与创建目录
    * */
    createDir(rootPath = "", path = "", includeFile = false) {
        let pathList = path.split("/"),
            nowPath = rootPath
        pathList.forEach((name, idx) => {
            name = name.trim()
            if (!includeFile && idx <= pathList.length - 1) {
                nowPath += name + "/"
                if (name) {
                    if (!fs.existsSync(nowPath)) {
                        fs.mkdirSync(nowPath)
                    }
                }
            }
        })
    },

    /*
    * 读取json
    * */
    readJSON(root, path) {
        if (!/\.json$/.test(path)) {
            path = path + ".json"
        }
        // 检查并创建目录
        Data.createDir(root, path, true)

        let jsonRet = fs.readFileSync(`${root}/${path}`, "utf8")
        return JSON.parse(jsonRet)
    },

    /*
    * 写JSON
    * */
    writeJson(path, file, data, space = "\t") {
        if (!/\.json$/.test(file)) {
            file = file + ".json"
        }

        // 检查并创建目录
        Data.createDir(path, true)
        return fs.writeFileSync(`${path}/${file}`, JSON.stringify(data, null, space))
    },

    /*
    * 返回一个从 target 中选中的属性的对象
    *
    * keyList : 获取字段列表，逗号分割字符串
    *   key1, key2, toKey1:fromKey1, toKey2:fromObj.key
    *
    * defaultData: 当某个字段为空时会选取defaultData的对应内容
    * toKeyPrefix：返回数据的字段前缀，默认为空。defaultData中的键值无需包含toKeyPrefix
    *
    * */

    getData(target, keyList = "", cfg = {}) {
        target = target || {}
        let defaultData = cfg.defaultData || {}
        let ret = {}
        // 分割逗号
        if (typeof (keyList) === "string") {
            keyList = keyList.split(",")
        }

        lodash.forEach(keyList, (keyCfg) => {
            // 处理通过:指定 toKey & fromKey
            let _keyCfg = keyCfg.split(":")
            let keyTo = _keyCfg[0].trim(),
                keyFrom = (_keyCfg[1] || _keyCfg[0]).trim(),
                keyRet = keyTo
            if (cfg.lowerFirstKey) {
                keyRet = lodash.lowerFirst(keyRet)
            }
            if (cfg.keyPrefix) {
                keyRet = cfg.keyPrefix + keyRet
            }
            // 通过Data.getVal获取数据
            ret[keyRet] = Data.getVal(target, keyFrom, defaultData[keyTo], cfg)
        })
        return ret
    },

    getVal(target, keyFrom, defaultValue) {
        return lodash.get(target, keyFrom, defaultValue)
    },

    getDayEnd() {
        let now = new Date()
        let dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), "23", "59", "59").getTime() / 1000
        return dayEnd - parseInt(now.getTime() / 1000)
    }
}

// html模板
const html = {}
// 浏览器
let browser = ""
// 截图数达到时重启浏览器 避免生成速度越来越慢
let restartNum = 200
// 截图次数
let renderNum = 0
let restartCount = 0
let restartFn = null
// 锁住
let lock = false
// 截图中
let shoting = []

async function browserInit() {
    if (browser) {
        return browser
    }
    if (lock) {
        return false
    }
    lock = true
    logger.mark("puppeteer 启动中。。")
    //初始化puppeteer
    browser = await puppeteer.launch({
        // executablePath:'',//chromium其他路径
        headless: global.debugView === "debug" ? false : true,
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-first-run",
            "--no-sandbox",
            "--no-zygote",
            "--single-process",
        ],
    }).catch((err) => {
        logger.error(err)
        if (String(err).includes("correct Chromium")) {
            logger.error("没有正确安装Chromium，可以尝试执行安装命令：node ./node_modules/puppeteer/install.js")
        }
    })
    lock = false
    if (browser) {
        logger.mark("puppeteer 启动成功")
        //监听Chromium实例是否断开
        browser.on("disconnected", function (e) {
            logger.error("Chromium实例关闭或崩溃！")
            browser = ""
        })

        return browser
    } else {
        logger.error("puppeteer 启动失败")
        return false
    }
}

async function doRender(app, type, data, imgType, renderCfg) {
    let { tplKey, tplFile, savePath, saveId } = renderCfg
    if (global.debugView === "web-debug") {
        // debug下保存当前页面的渲染数据，方便模板编写与调试
        // 由于只用于调试，开发者只关注自己当时开发的文件即可，暂不考虑app及plugin的命名冲突
        let saveDir = _path + "/data/ViewData/"
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir)
        }
        let file = saveDir + type + ".json"
        data._app = app
        fs.writeFileSync(file, JSON.stringify(data))
        logger.mark(`${type}-tplFile:${tplFile}`)
        logger.mark(`${type}-savePath:${savePath}`)
    }
    if (!html[tplKey] || global.debugView) {
        html[tplKey] = fs.readFileSync(tplFile, "utf8")
    }
    //替换模板
    let tmpHtml = template.render(html[tplKey], data)
    //保存模板
    fs.writeFileSync(savePath, tmpHtml)
    if (!(await browserInit())) {
        return false
    }
    let base64 = ""
    let start = Date.now()
    try {
        shoting.push(saveId)
        //图片渲染
        const page = await browser.newPage()
        await page.goto("file://" + savePath)
        await page.waitForSelector("#container")
        await page.waitForTimeout(100)
        let body = await page.$("#container")
        let randData = {
            type: imgType,
            encoding: "base64",
        }
        if (imgType === "jpeg") {
            randData.quality = 90
        }
        if (imgType == "png") {
            randData.omitBackground = true
        }
        base64 = await body.screenshot(randData)
        if (!global.debugView) {
            page.close().catch((err) => logger.error(err))
        }
        shoting.pop()
    } catch (error) {
        logger.error(`图片生成失败:${type}:${error}`)
        //重启浏览器
        if (browser) {
            await browser.close().catch((err) => logger.error(err))
        }
        browser = ""
        base64 = ""
        return false
    }
    if (!base64) {
        logger.error(`图片生成为空:${type}`)
        return false
    }
    renderNum++
    /** 计算图片大小 */
    let kb = (base64.length / 1024).toFixed(1) + 'kb'
    logger.mark(`【图片生成】${app}/${type}.html: 格式:${imgType}, 大小：${kb}，耗时：${Date.now() - start}ms，次数:${renderNum}`)
    if (typeof test != "undefined") {
        return `图片base64:${type}`
    }
    //截图超过重启数时，自动关闭重启浏览器，避免生成速度越来越慢
    if (renderNum > restartNum * (restartCount + 1)) {
        if (shoting.length <= 0) {
            restartFn && clearTimeout(restartFn)
            restartFn = setTimeout(async function () {
                browser.removeAllListeners("disconnected")
                await browser.close().catch((err) => logger.error(err))
                browser = ""
                restartCount++
                logger.mark("puppeteer 关闭重启")
            }, 100)
        }
    }
    return base64
}

function getPluginRender(plugin) {
    return async function (app = "", type = "", data = {}, imgType = "jpeg") {
        // 在data中保存plugin信息
        data._plugin = plugin

        if (lodash.isUndefined(data._res_path)) {
            data._res_path = `../../plugins/${plugin}/resources/`
        }
        if (lodash.isUndefined(data._sys_res_path)) {
            data._sys_res_path = `../../resources/`
        }
        let tplKey = `${plugin}.${app}.${type}`
        let saveId = data.save_id
        let tplFile = _path + `/plugins/${plugin}/resources/${app}/${type}.html`
        Data.createDir(_path + `/data/`, `html/plugin_${plugin}/${app}/${type}`)
        let savePath = _path + `/data/html/plugin_${plugin}/${app}/${type}/${saveId}.html`
        return await doRender(app, type, data, imgType, {
            tplKey,
            tplFile,
            savePath,
            saveId,
        })
    }
}

const render = getPluginRender(pluginName)

init()

const guessConfigMap = new Map()

function getGuessConfig(e) {
    let key = e.message_type + e[e.isGroup ? 'group_id' : 'user_id']
    let config = guessConfigMap.get(key)
    if (config == null) {
        config = {
            // 是否正在游戏中
            playing: false,
            // 当前角色Id
            roleId: '',
            // 计时器timer
            timer: null,
            // 答案图片
            answer: null,
            // 删除自身，等待释放内存
            delete: () => guessConfigMap.delete(key),
        }
        guessConfigMap.set(key, config)
    }
    return config
}

// 随机背景颜色
const colors = [
    '#F5F5F5',
    '#FFEDED',
    '#F7F0D7',
    '#C0E2F5',
    '#FFCDCA',
    '#D0FFC3',
    '#D9D6FF',
]

let genshin = {}
let nameID = ''

//首位是官方默认名称
genshin.roleId = {
    10000003: ["琴", "Jean", "jean", "团长", "代理团长", "琴团长", "蒲公英骑士", "琴·古恩希尔德", "古恩希尔德"],
    10000006: ["丽莎", "Lisa", "lisa", "图书管理员", "图书馆管理员", "蔷薇魔女", "丽莎阿姨", "丽莎·敏兹", "敏兹"],
    10000005: ["空", "男主", "男主角", "龙哥", "空哥", "男爷"],
    10000007: ["荧", "女主", "女主角", "莹", "萤", "黄毛阿姨", "荧妹", "女爷"],
    20000000: ["主角", "旅行者", "卑鄙的外乡人", "荣誉骑士", "爷", "风主", "岩主", "雷主", "草主", "履刑者", "抽卡不歪真君"],
    10000014: ["芭芭拉", "Barbara", "barbara", "巴巴拉", "拉粑粑", "拉巴巴", "内鬼", "加湿器", "肉身解咒", "肉身解咒真君", "闪耀偶像", "偶像", "芭芭拉·佩奇", "佩奇"],
    10000015: ["凯亚", "Kaeya", "kaeya", "盖亚", "凯子哥", "凯鸭", "矿工", "矿工头子", "骑兵队长", "凯子", "凝冰渡海真君", "凯亚·亚尔伯里奇", "亚尔伯里奇"],
    10000016: ["迪卢克", "diluc", "Diluc", "卢姥爷", "姥爷", "卢老爷", "卢锅巴", "正义人", "正e人", "正E人", "卢本伟", "暗夜英雄", "卢卢伯爵", "落魄了", "落魄了家人们", "迪卢克·莱艮芬德", "莱艮芬德"],
    10000020: ["雷泽", "razor", "Razor", "狼少年", "狼崽子", "狼崽", "卢皮卡", "小狼", "小狼狗", "狼孩"],
    10000021: ["安柏", "Amber", "amber", "安伯", "兔兔伯爵", "飞行冠军", "侦查骑士", "点火姬", "点火机", "打火机", "打火姬"],
    10000022: ["温迪", "Venti", "venti", "温蒂", "风神", "卖唱的", "巴巴托斯", "巴巴脱丝", "芭芭托斯", "芭芭脱丝", "干点正事", "不干正事", "吟游诗人", "诶嘿", "唉嘿", "摸鱼"],
    10000023: ["香菱", "Xiangling", "xiangling", "香玲", "锅巴", "厨师", "万民堂厨师", "香师傅", "卯香菱"],
    10000024: ["北斗", "Beidou", "beidou", "大姐头", "大姐", "无冕的龙王", "龙王"],
    10000025: ["行秋", "Xingqiu", "xingqiu", "秋秋人", "秋妹妹", "书呆子", "水神", "飞云商会二少爷"],
    10000026: ["魈", "Xiao", "xiao", "打桩机", "插秧", "三眼五显仙人", "三眼五显真人", "降魔大圣", "护法夜叉", "快乐风男", "无聊", "靖妖傩舞", "矮子仙人", "三点五尺仙人", "跳跳虎"],
    10000027: ["凝光", "Ningguang", "ningguang", "富婆", "天权星", "天权"],
    10000029: ["可莉", "Klee", "klee", "嘟嘟可", "火花骑士", "蹦蹦炸弹", "炸鱼", "放火烧山", "放火烧山真君", "蒙德最强战力", "逃跑的太阳", "啦啦啦", "哒哒哒", "炸弹人", "禁闭室", "太阳", "小太阳"],
    10000030: ["钟离", "Zhongli", "zhongli", "摩拉克斯", "岩王爷", "岩神", "钟师傅", "天动万象", "岩王帝君", "未来可期", "帝君", "拒收病婿"],
    10000031: ["菲谢尔", "Fischl", "fischl", "皇女", "小艾米", "小艾咪", "奥兹", "断罪皇女", "中二病", "中二少女", "中二皇女", "奥兹发射器", "菲谢尔·冯·露弗施洛斯·那菲多特", "露弗施洛斯", "那菲多特"],
    10000032: ["班尼特", "Bennett", "bennett", "点赞哥", "点赞", "倒霉少年", "倒霉蛋", "霹雳闪雷真君", "班神", "班爷", "倒霉", "火神", "六星真神"],
    10000033: ["达达利亚", "Tartaglia", "tartaglia", "Childe", "childe", "Ajax", "ajax", "达达鸭", "达达利鸭", "公子", "玩具销售员", "玩具推销员", "钱包", "鸭鸭", "愚人众末席", "阿贾克斯"],
    10000034: ["诺艾尔", "Noelle", "noelle", "女仆", "高达", "岩王帝姬"],
    10000035: ["七七", "Qiqi", "qiqi", "僵尸", "肚饿真君", "度厄真君", "77"],
    10000036: ["重云", "Chongyun", "chongyun", "纯阳之体", "冰棍"],
    10000037: ["甘雨", "Ganyu", "ganyu", "椰羊", "椰奶", "王小美"],
    10000038: ["阿贝多", "Albedo", "albedo", "可莉哥哥", "升降机", "升降台", "电梯", "白垩之子", "贝爷", "白垩", "阿贝少", "花呗多", "阿贝夕", "abd", "阿师傅"],
    10000039: ["迪奥娜", "Diona", "diona", "迪欧娜", "dio", "dio娜", "冰猫", "猫猫", "猫娘", "喵喵", "调酒师", "迪奥娜·凯茨莱茵", "凯茨莱茵"],
    10000041: ["莫娜", "Mona", "mona", "穷鬼", "穷光蛋", "穷", "莫纳", "占星术士", "占星师", "讨龙真君", "半部讨龙真君", "阿斯托洛吉斯·莫娜·梅姬斯图斯", "阿斯托洛吉斯", "梅姬斯图斯", "梅姬斯图斯姬"],
    10000042: ["刻晴", "Keqing", "keqing", "刻情", "氪晴", "刻师傅", "刻师父", "牛杂", "牛杂师傅", "斩尽牛杂", "免疫", "免疫免疫", "屁斜剑法", "玉衡星", "玉衡", "阿晴", "啊晴", "璃月雷神"],
    10000043: ["砂糖", "Sucrose", "sucrose", "雷莹术士", "雷萤术士", "雷荧术士"],
    10000044: ["辛焱", "Xinyan", "xinyan", "辛炎", "黑妹", "摇滚"],
    10000045: ["罗莎莉亚", "Rosaria", "rosaria", "罗莎莉娅", "白色史莱姆", "白史莱姆", "修女", "罗莎利亚", "罗莎利娅", "罗沙莉亚", "罗沙莉娅", "罗沙利亚", "罗沙利娅", "萝莎莉亚", "萝莎莉娅", "萝莎利亚", "萝莎利娅", "萝沙莉亚", "萝沙莉娅", "萝沙利亚", "萝沙利娅"],
    10000046: ["胡桃", "Hu Tao", "hu tao", "HuTao", "hutao", "Hutao", "胡淘", "往生堂堂主", "火化", "抬棺的", "蝴蝶", "核桃", "堂主", "胡堂主", "雪霁梅香", "桃子"],
    10000047: ["枫原万叶", "Kaedehara Kazuha", "Kazuha", "kazuha", "万叶", "叶天帝", "天帝", "叶师傅"],
    10000048: ["烟绯", "Yanfei", "yanfei", "烟老师", "律师", "罗翔"],
    10000051: ["优菈", "Eula", "eula", "优拉", "尤拉", "尤菈", "浪花骑士", "记仇", "优菈·劳伦斯", "劳伦斯"],

    //2.0
    10000002: ["神里绫华", "Kamisato Ayaka", "Ayaka", "ayaka", "神里", "绫华", "神里凌华", "凌华", "白鹭公主", "神里大小姐", "小乌龟", "龟龟"],
    10000049: ["宵宫", "Yoimiya", "yoimiya", "霄宫", "烟花", "肖宫", "肖工", "绷带女孩", "长野原宵宫"],
    10000052: ["雷电将军", "Raiden Shogun", "Raiden", "raiden", "雷神", "将军", "雷军", "巴尔", "阿影", "影", "巴尔泽布", "煮饭婆", "奶香一刀", "无想一刀", "宅女"],
    10000053: ["早柚", "Sayu", "sayu", "小狸猫", "狸猫", "忍者", "貉"],
    10000054: ["珊瑚宫心海", "Sangonomiya Kokomi", "Kokomi", "kokomi", "心海", "军师", "珊瑚宫", "书记", "观赏鱼", "水母", "鱼", "美人鱼"],
    10000056: ["九条裟罗", "Kujou Sara", "Sara", "sara", "九条", "九条沙罗", "裟罗", "沙罗", "天狗"],
    10000062: ["埃洛伊", "Aloy", "aloy"],
    10000050: ["托马", "Thoma", "thoma", "家政官", "太郎丸", "地头蛇", "男仆", "拖马"],
    10000055: ["五郎", "Gorou", "gorou", "柴犬", "土狗", "希娜", "希娜小姐"],
    10000057: ["荒泷一斗", "Arataki Itto", "Itto", "itto", "荒龙一斗", "荒泷天下第一斗", "一斗", "一抖", "荒泷", "1斗", "牛牛", "斗子哥", "牛子哥", "牛子", "孩子王", "斗虫", "巧乐兹", "放牛的"],
    10000058: ["八重神子", "Yae Miko", "Miko", "miko", "八重", "神子", "狐狸", "想得美哦", "巫女", "屑狐狸", "骚狐狸", "八重宫司", "婶子", "小八", "八重寄子", "寄子"],
    10000059: ["鹿野院平藏", "shikanoin heizou", "Heizou", "heizou", "heizo", "鹿野苑", "鹿野院", "平藏", "鹿野苑平藏", "小鹿"],
    10000060: ["夜兰", "Yelan", "yelan", "夜阑", "叶澜", "腋兰", "夜天后"],
    10000063: ["申鹤", "Shenhe", "shenhe", "神鹤", "小姨", "小姨子", "审鹤"],
    10000064: ["云堇", "Yun Jin", "yunjin", "yun jin", "云瑾", "云先生", "云锦", "神女劈观", "土女"],
    10000065: ["久岐忍", "Kuki Shinobu", "Kuki", "kuki", "Shinobu", "shinobu", "97忍", "小忍", "久歧忍", "97", "茄忍", "茄子", "紫茄子", "阿忍", "忍姐"],
    10000066: ["神里绫人", "Kamisato Ayato", "Ayato", "ayato", "绫人", "神里凌人", "凌人", "0人", "神人", "零人", "大舅哥"],

    //3.0
    10000069: ["提纳里", "Tighnari", "tighnari", "提那里", "驴", "柯莱老师", "巡林官"],
    10000067: ["柯莱", "Collei", "collei", "柯来", "科莱", "科来", "小天使", "须弥安柏", "须弥飞行冠军", "见习巡林员", "巡林员"],
    10000068: ["多莉", "Dori", "dori", "多利", "多力"],  10000070: ['妮露', 'Nilou', '尼露', '妮璐', '舞娘', '红牛'],
  10000071: ['赛诺', 'Cyno', '塞诺', '胡狼', '大风纪官', '大风机关'],
  10000072: ['坎蒂丝', 'Candace', '坎迪斯'],
  10000073: ['纳西妲', 'Nahida', '草神', '小吉祥', '大吉祥', '小草神', '大慈树王', '小吉祥草王', '草萝莉', '羽毛球', '摩诃善法大吉祥智慧主', '智慧主', '智慧之神', '布耶尔'],
  10000074: ['莱依拉', 'Layla', '莱依菈', '来依菈', '来依拉'],
  10000075: ['流浪者', 'Wanderer', '散兵', '国崩', '雷电国崩', '大炮', '雷电大炮', '雷大炮', '伞兵', '斯卡拉姆齐', '七叶寂照秘密主'],
10000076: ['珐露珊', 'Faruzan', '法露珊', '法璐珊', '法露姗', '法璐姗', '珐露姗', '珐璐姗', '百岁珊', '百岁山'],
  10000077: ['瑶瑶', '遥遥', '萝卜'],
  10000078: ['艾尔海森', '海哥', '埃尔海森', '海森', '海参'],
10000079: ['迪希雅', '迪希亚', '迪希娅', '迪西雅', '迪西亚'],
  10000080: ['米卡', '鹦鹉', '凤头', '凤头鹦鹉'],
  10000081: ['卡维', '艾尔海森室友'],
  10000082: ['白术', '长生'],
10000061: ["绮良良", "Kirara", "kirara", "琦良良", "草猫", "猫又", "宅急便", "送货员", "快递员", "草猫快递"],

//4.0
10000083: ["琳妮特", "林尼特", "琳尼特", "Lynette", "lynette", "魔术助手", "登登", "噔噔", "锵锵", "二妹"],
10000084: ["林尼", "大魔术师", "大哥", "魔术师", "lyney", "Lyney"],
10000085: ["菲米尼", "非米尼", "潜水员", "三弟", "企鹅", "freminet", "Freminet"],
10000086: ["莱欧斯利", "莱欧斯里", "来欧斯里", "来欧斯利", "监狱长", "典狱长", "冰拳", "承太郎", "白金之星", "公爵"],
10000087: ["那维莱特", "那维来特", "审判官", "那维", "最高审判官", "美露辛爸爸", "那位来客", "水龙王", "水龙"],
10000088: ["夏洛蒂", "Charlotte", "charlotte", "夏洛特", "夏洛", "记者", "狗仔队", "战地记者"],
10000089: ["芙宁娜", "芙卡洛斯", "水神", "大明星", "芙芙", "假水神", "水的女儿", "黑芙", "白芙"],
10000090: ["夏沃蕾", "夏沃雷", "特巡队队长", "特巡队长", "火枪", "枫丹帕姆", "枫丹西琳", "火铳"],
10000091: ["娜维娅", "刺玫会会长", "娜维雅", "娜维亚", "会长", "大小姐", "黄豆姐", "炮姐", "西尔弗", "迈勒斯"],
10000092: ["嘉明", "佳明", "嘉铭", "镖师", "威水舞兽", "威水舞兽话事人", "舞狮少年", "雄狮少年", "嘉乐"],
10000093: ["闲云", "xianyun", "Xianyun", "留云", "流云", "留云借风真君", "那个女人", "鸟人", "机关仙人", "闲云阿姨", "两块禽肉真君", "那只鸟", "那只鸡", "仙鹤", "仙鸟", "留云借风", "哪个女人", "很会说话真君"],

    //卫星角色
    10000000: [],
};

function roleIdToName(keyword, search_val = false) {
    if (!keyword) {
        return false
    }
    if (search_val) {
        if (genshin.roleId[keyword] && genshin.roleId[keyword][0]) {
            return genshin.roleId[keyword][0]
        } else {
            return ""
        }
    }

    if (!nameID) {
        nameID = new Map()
        for (let i in genshin.roleId) {
            for (let val of genshin.roleId[i]) {
                nameID.set(val, i)
            }
        }
    }
    let name = nameID.get(keyword)
    return name ? name : ""
}

async function replayAnswer(e, message, cfg, isReply = false) {
    clearTimeout(cfg.timer)
    cfg.playing = false
    let answer = await cfg.answer
    if (answer) {
        message.push('\n')
        message.push(segment.image(`base64://${answer}`))
    }
    await e.reply(message, isReply)
    cfg.delete()
}

function init() {
    let pluginPath = path.join(_path, 'plugins', pluginName)
    let templatePath = path.join(pluginPath, `resources`, templateName)
    let questionPath = path.join(templatePath, 'question.html')
    let answerPath = path.join(templatePath, 'answer.html')
    if (!fs.existsSync(questionPath)) {
        if (!fs.existsSync(templatePath)) {
            Data.createDir(_path, `/plugins/${pluginName}/resources/${templateName}`)
        }
        // 创建新模板，动态生成模板的好处是不用重启且安装方便
        fs.writeFileSync(questionPath, getTemplate())
        fs.writeFileSync(answerPath, getTemplate(false))
    }
}

function getTemplate(flag = true) {
    return `
  <!DOCTYPE html>
  <html lang="zh">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>猜头像</title>
    <style>
        *, html, body {padding: 0;margin: 0;}
        .container {overflow: hidden;position: relative;transform-origin: 0 0;}
        .container img {position: absolute;}
        .container .invert {filter: invert(100%);}
        .container .grayscale {filter: grayscale(100%);}
        #answer-wrap {margin:auto;display: flex;align-items: center;justify-content: center;}
        #answer-wrap #mask{position:absolute;z-index: 1;border: 1px solid white;box-shadow: 0 0 0 2000px rgba(0,0,0,0.6);}
    </style>
  </head>
  
  <body>
  <div class="container" id="container">
    <img id="img" src="{{src}}" alt="头像">
    <div id="answer-wrap" style="display: none;">
      <img src="{{src}}" alt="头像">
      <div id="mask"></div>
    </div>
  </div>
  <script>
  // 图片大小
  const flag = ${flag}
  const size = {{size}}
  const imgTop = {{imgTop}}
  const imgLeft = {{imgLeft}}
  const imgWidth = {{imgWidth}}
  const imgHeight = {{imgHeight}}
  const imgColor = "{{imgColor}}"
  const hardMode = {{hardMode}}
  const hellMode = {{hellMode}}
  
  const boxEl = document.getElementById("container")
  if (flag) {
    boxEl.style.width = size + 'px'
    boxEl.style.height = size + 'px'
    boxEl.style.transform = 'scale(3)'
  } else {
    boxEl.style.width = imgWidth + 'px'
    boxEl.style.height = imgHeight + 'px'
    boxEl.style.transform = 'scale(1.5)'
    document.getElementById('answer-wrap').style.display = 'block'
  }
  boxEl.style.backgroundColor = imgColor
  
  let controlEl 
  if (flag) {
    controlEl = document.getElementById('img')
    controlEl.style.top = "-" + imgTop + "px"
    controlEl.style.left = "-" + imgLeft + "px"
    if (hardMode) {
      controlEl.classList.add('grayscale')
    } else if (hellMode) {
      controlEl.classList.add('invert')
    }
  } else {
    controlEl = document.getElementById('mask')
    controlEl.style.top =  imgTop + "px"
    controlEl.style.left =  imgLeft + "px"
    controlEl.style.width =  size + "px"
    controlEl.style.height =  size + "px"
  }
  </script>
  </body>
  </html>
    `
}