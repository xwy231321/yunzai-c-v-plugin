import setting from "./components/settings.js";
import lodash from "lodash";

// 支持锅巴
export function supportGuoba () {
    return {
        // 配置项信息
        configInfo: {
            // 配置项 schemas
            schemas: [{
                field: 'cfg.ssttoooc',
                label: '清凉图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.seettuuplus',
                label: '铯图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.yunxiyuan',
                label: '云溪图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.sanciyuan',
                label: '三元图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.cchuoyichuom',
                label: 'mc戳一戳（优先清理内存生效）',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.qlnc',
                label: '戳一戳清理内存',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.yifensuijimanghe',
                label: '盲盒',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.yuanmangheshen',
                label: '原神盲盒',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.asuijimanhua',
                label: '随机b站404漫画',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.xiaofeifengkong',
                label: '消息风控处理',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            }],

            getConfigData () {
                return setting.merge()
            },
            // 设置配置的方法（前端点确定后调用的方法）
            setConfigData (data, { Result }) {
                let config = {}
                for (let [keyPath, value] of Object.entries(data)) {
                    lodash.set(config, keyPath, value)
                }
                config = lodash.merge({}, setting.merge, config)
                setting.analysis(config)
                return Result.ok({}, '保存成功~')
            }
        }
    }
}