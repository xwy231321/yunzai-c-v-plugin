export const helpCfg = {
  title: '清凉图帮助', //帮助名字
  subTitle: 'Yunzai-Bot & yunzai-c-v-Plugin', //插件显示名字
  columnCount: 0,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    //修改此处字体颜色无效
    // 主文字颜色
    fontColor: '#ceb78b',
    // 描述文字颜色
    descColor: '#eee',
  /* 面板整体底色，会叠加在标题栏及帮助行之下，方便整体帮助有一个基础底色
  *  若无需此项可将rgba最后一位置为0即为完全透明
  *  注意若综合透明度较低，或颜色与主文字颜色过近或太透明可能导致阅读困难 */
    contBgColor: 'rgba(47,171,255,0.5)',
    // 面板底图毛玻璃效果，数字越大越模糊，0-10 ，可为小数
    contBgBlur: 3,
    // 板块标题栏底色
    headerBgColor: 'rgba(12,111,148,0.4)',
    // 帮助奇数行底色
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    // 帮助偶数行底色
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  }
} //plugin
export const helpList = [{
  group: "触发指令",
  list: [
    {
      icon: 88,
      title: "#清凉图 #3张清凉图",
      desc: "随机清凉图（可设置图片类型）"
    },
    {
      icon: 61,
      title: "#铯图 #3张铯图",
      desc: "随机漏丶的图片"
    },
    {
      icon: 63,
      title: "#随机漫画 #3张随机漫画",
      desc: "随机b站404小漫画"
    }, 
    {
      icon: 66,
      title: "#盲盒 #3份盲盒",
      desc: "随机二次元图片"
    },
    {
      icon: 65,
      title: "#三元图 #3张三元图",
      desc: "随机三次元图片"
    },
    {
      icon: 64,
      title: "#云溪图 #3张云溪图",
      desc: "#随机云溪院图片"
    },
    {
      icon: 67,
      title: "#原神盲盒 #3份原神盲盒",
      desc: "随机一张原神图片（质量一般）"
    },
    {
      icon: 62,
      title: "#清凉图文字帮助",
      desc: "文字版帮助"
    },
    {
      icon: 71,
      title: "#清凉图更新 #清凉图强制更新",
      desc: "#清凉图(强制)更新"
    },
  ]
}, {
  group: '管理类命令',
  auth: 'master',
  list: [{
    icon: 32,
    title: '#开启/关闭铯图',
    desc: '配置'
  }, {
    icon: 35,
    title: '#开启/关闭随机漫画',
    desc: '配置'
  }, {
    icon: 34,
    title: '#开启/关闭mc戳一戳',
    desc: '配置'
  }, {
    icon: 49,
    title: '#开启/关闭戳一戳清理内存',
    desc: '配置（linux生效）'
  }, {
    icon: 11,
    title: '#开启/关闭盲盒',
    desc: '配置'
  }, {
    icon: 88,
    title: '#开启/关闭清凉图',
    desc: '配置'
  }, {
    icon: 59,
    title: '#开启/关闭三元图',
    desc: '配置'
  }, {
    icon: 57,
    title: '#开启/关闭原神盲盒',
    desc: '配置'
  }, {
    icon: 56,
    title: '#开启/关闭云溪图',
    desc: '配置'
  }, {
    icon: 53,
    title: '#开启/关闭风控处理',
    desc: '配置（不推荐关闭）'
  }, {
    icon: 77,
    title: '#清凉图插件全部开启/关闭',
    desc: '功能全部打开（戳一戳生效mc戳一戳）'
  }, {
    icon: 85,
    title: '#清凉图(开启|关闭)(18|混合)',
    desc: '配置清凉图出图类型'
  }]
}
]


export const isSys = true