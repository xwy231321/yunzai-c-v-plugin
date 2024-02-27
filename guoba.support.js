import setting from "./components/settings.js";
import lodash from "lodash";
export function supportGuoba () {
    return {
        configInfo: {
            schemas: [{
                component: 'Divider',
                label: '猜角色',
              },{
                field: 'guess.maxtime',
                label: '猜角色等待时间',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单位秒',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 0,
                  max: 99999999,
                  placeholder: '请输入数字',
                },
            },{
                component: 'Divider',
                label: '启用状态',
              },{
                field: 'cfg.ssttoooc',
                label: '清凉图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'mastercfg.ssttooocmaster',
                label: '仅主人生效',
                bottomHelpMessage: '清凉图是否仅主人生效',
                component: 'Switch'
            },{
                field: 'cfg.seettuuplus',
                label: '铯图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'mastercfg.seettuuplusmaster',
                label: '仅主人生效',
                bottomHelpMessage: '铯图是否仅主人生效',
                component: 'Switch'
            },{
                field: 'cfg.one',
                label: '三铯图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'mastercfg.one',
                label: '仅主人生效',
                bottomHelpMessage: '三铯图是否仅主人生效',
                component: 'Switch'
            },{
                field: 'cfg.two',
                label: '原神cos图18+',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'mastercfg.two',
                label: '仅主人生效',
                bottomHelpMessage: '原神cos图是否仅主人生效',
                component: 'Switch'
            },{
                field: 'cfg.yunxiyuan',
                label: '小冰图',
                bottomHelpMessage: '是否启用该功能',
                component: 'Switch'
            },{
                field: 'mastercfg.yunxiyuanmaster',
                label: '仅主人生效',
                bottomHelpMessage: '云溪图是否仅主人生效',
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
            },{
                component: 'Divider',
                label: '单次获取最大数量',
              },{
                field: 'number.sanciyuan',
                label: '三元图',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.sanse',
                label: '三铯图',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.ysse',
                label: '原神cos图',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.seettuuplus',
                label: '铯图 原神铯图',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.ssttoooc',
                label: '清凉图',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.yifensuijimanghe',
                label: '盲盒',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.asuijimanhua',
                label: 'b站404随即漫画',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.yuanmangheshen',
                label: '原神盲盒',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                field: 'number.yunxiyuan',
                label: '云溪图',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认20',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 100,
                  placeholder: '请输入数字',
                },
              },{
                component: 'Divider',
                label: '黑名单群配置，输入后可点击周围，以继续添加其他群',
              },{
                field: 'blacklist.groups',
                label: '黑名单群',
                bottomHelpMessage: '黑名单群',
                component: 'GTags',
                required: true,
                componentProps: {
                  placeholder: '请输入数字',
                  valueFormatter: ((value) => Number.parseInt(value)).toString(),
                },
              },],
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