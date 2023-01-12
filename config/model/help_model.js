//如需自定义清凉图帮助，请将改文件复制一份，粘贴到上一个目录（即此插件config文件夹内），并将粘贴过去的文件重命名为help.js，编辑完后重启云崽即可生效
export const helpCfg = {
  title: '清凉图帮助',
  subTitle: 'Yunzai-Bot & yunzai-c-v-Plugin',
  columnCount: 0,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
}
export const helpList = [{
  group: "触发类指令",
  list: [
    {
      icon: 88,
      title: "#清凉图 #3张清凉图",
      desc: "随机清凉图（可设置图片类型）"
    },
    {
      icon: 61,
      title: "#铯图(卡片) #原神铯图",
      desc: "随机漏•图片"
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
      title: "#三元图(卡片) #三铯图",
      desc: "随机三次元图片 随机三次元铯图"
    },
    {
      icon: 64,
      title: "#云溪图(卡片) #3张云溪图",
      desc: "#随机云溪院图片"
    },
    {
      icon: 67,
      title: "#原神盲盒 #原神cos图",
      desc: "随机原神图片 随机18原神cos图"
    },
    {
      icon: 62,
      title: "#清凉图设置",
      desc: "当前各功能启用状况"
    },
    {
      icon: 71,
      title: "#清凉图更新 #清凉图强制更新",
      desc: "#清凉图(强制)更新"
    },{
      icon:88,
      title: "#发大图 #转大图",
      desc: "#将图片(回复或消息携带)转为卡片发送"
    },{
      icon: 14,
      title: '#体力',
      desc: '大图卡片体力（需要开启）'
    }
  ]
},{
  group: '仓库动态检测(仅主人生效)',
  auth: 'master',
  list: [{
    icon: 51,
    title: '#订阅/删除仓库',
    desc: '添加/删除关注的仓库地址'
  },{
    icon: 29,
    title: '#开启/关闭仓库推送',
    desc: '开启或关闭推送'
  },{
    icon: 94,
    title: '#查看仓库列表',
    desc: '查看当前订阅的仓库'
  },{
    icon: 92,
    title: '#检查仓库更新',
    desc: '检查是否有更新'
  },{
    icon: 71,
    title: '#订阅清凉图',
    desc: '一键添加本插件(切勿多次执行)'
  },]
}
]