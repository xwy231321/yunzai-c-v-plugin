import YAML from 'yaml'
import chokidar from 'chokidar'
import fs from 'node:fs'

/** 配置文件 */
class GsCfg {
  constructor () {
    /** 默认设置 */
    this.defSetPath = './plugins/yunzai-c-v-plugin/defSet/'
    this.defSet = {}

    /** 用户设置 */
    this.configPath = './plugins/yunzai-c-v-plugin/config/'
    this.config = {}


    /** 监听文件 */
    this.watcher = { config: {}, defSet: {} }

    this.ignore = ['group.name']
  }

  /**
   * @param app  功能
   * @param name 配置文件名称
   */
  getdefSet (app, name) {
    return this.getYaml(app, name, 'defSet')
  }

  /** 用户配置 */
  getConfig (app, name) {
    if (this.ignore.includes(`${app}.${name}`)) {
      return this.getYaml(app, name, 'config')
    }
    return { ...this.getdefSet(app, name), ...this.getYaml(app, name, 'config') }
  }

  /**
   * 获取配置yaml
   * @param app 功能
   * @param name 名称
   * @param type 默认跑配置-defSet，用户配置-config
   */
  getYaml (app, name, type) {
    let file = this.getFilePath(app, name, type)
    let key = `${app}.${name}`

    if (this[type][key]) return this[type][key]

    try {
      this[type][key] = YAML.parse(
        fs.readFileSync(file, 'utf8')
      )
    } catch (error) {
      logger.error(`[${app}][${name}] 格式错误 ${error}`)
      return false
    }

    this.watch(file, app, name, type)

    return this[type][key]
  }

  getFilePath (app, name, type) {
    if (type === 'defSet') return `${this.defSetPath}${app}/${name}.yaml`
    else {
      try {
        if (!fs.existsSync(`${this.configPath}${app}.${name}.yaml`) && this.ignore.includes(`${app}.${name}`)) {
          fs.writeFileSync(`${this.configPath}${app}.${name}.yaml`, fs.readFileSync(`${this.defSetPath}${app}/${name}.yaml`, 'utf8'))
        }
      } catch (error) {
        logger.error(`缺失默认文件[${app}][${name}]${error}`)
      }
      return `${this.configPath}${app}.${name}.yaml`
    }
  }

  /** 监听配置文件 */
  watch (file, app, name, type = 'defSet') {
    let key = `${app}.${name}`

    if (this.watcher[type][key]) return

    const watcher = chokidar.watch(file)
    watcher.on('change', path => {
      delete this[type][key]
      logger.mark(`[修改配置文件][${type}][${app}][${name}]`)
      if (this[`change_${app}${name}`]) {
        this[`change_${app}${name}`]()
      }
    })

    this.watcher[type][key] = watcher
  }

  get element () {
    return { ...this.getdefSet('element', 'role'), ...this.getdefSet('element', 'weapon') }
  }

  checkarr (arr, num) {
    if (!arr) return false
    while (arr.length > num) {
      arr.pop()
    }
    while (arr.length < num) {
      arr.push(arr[arr.length - 1])
    }
    return arr
  }

  getStar (roleID) {
    let allrole = this.getYaml('role', 'other', 'defSet')
    return !!allrole.five.includes(parseInt(roleID))
  }
}

export default new GsCfg()
