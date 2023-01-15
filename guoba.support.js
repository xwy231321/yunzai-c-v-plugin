import setting from "./components/settings.js";
import lodash from "lodash";
export function supportGuoba () {
    return {
        configInfo: {
            schemas: [{
                field: 'tobig.tobigset',
                label: '转大图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'tobig.tobignote',
                label: '卡片体力(原版)',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
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
                field: 'cfg.one',
                label: '三铯图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'cfg.two',
                label: '原神cos图18+',
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
                label: 'mc戳一戳',
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