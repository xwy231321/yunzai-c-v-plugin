# yunzai-c-v-plugin<a href='https://gitee.com/xwy231321/yunzai-c-v-plugin/stargazers'><img src='https://gitee.com/xwy231321/yunzai-c-v-plugin/badge/star.svg?theme=dark' alt='star'></img></a>

#### 前言

yunzai插件，依赖云崽实现功能。仅适配V3。

如果更新发现有冲突了，强制更新、或者删掉插件重新拉一下就好了（理解万岁～）

如需修改配置，请打开此插件目录下的config文件夹，在cfg.js里修改即可（改完重启生效）

如果遇到bug，请提issues，谢谢

[查看版本信息](./CHANGELOG.md)

#### 插件功能 

V1.0.8

群名片内存占用（默认关闭）系统占用查询(默认开启)

B站404随机漫画（默认开启）

图片盲盒（默认开启）

原神图片盲盒（默认开启）

mc酱戳一戳（默认关闭）

清凉图:(默认开启,60s撤回，可修改图片年龄限制)

铯图(默认关闭,60s撤回)

消息风控处理（已经过小飞插件作者同意，默认开启，若安装了小飞插件，请配置为关闭）

清凉图（st）和铯图（stplus）私聊将以闪照形式发送，群聊将以聊天记录形式发送（图片尺度较大时会裂图）。

注：群聊中使用时会遇到以下报错

```
发送消息错误:[{"type":"flash","file":"hppts://xxxxxxxxxxxx.com"}]
[ERRO] ApiRejection { code: -70, message: ' 群消息发送失败，可能被风控' }

```
属于正常情况。（依然不推荐群聊食用，防内，鬼和t，x检测）

（占用系统资源极少，可放心安装）

#### 食用方法

发送#cv帮助  即可查看插件菜单（当前简陋，后续有时间可能会考虑改成图片样式）

#### 安装方法（安装后需要重启）

推荐使用gitee安装

在云崽目录打开终端，运行：（和其他插件一样）

```
git clone https://gitee.com/xwy231321/yunzai-c-v-plugin.git ./plugins/yunzai-c-v-plugin/

```

如果不会或者报错请自行百度或者问其他交流群群友，如果确定是本插件问题请提issue，目前高三没太多精力去回复，谢谢



如果您使用的是时雨的脚本：TRSS_Yunzai，则安装方法为：依次打开：脚本的 插件管理-Git插件管理-安装插件，划到最下面，选择：自定义，“请输入插件名”填：yunzai-c-v-plugin，“请输入插件URL”填：

```
https://gitee.com/xwy231321/yunzai-c-v-plugin

```
确认 即可安装本插件

#### 更新

发送#yunzai-c-v-plugin更新  （yunzai自带的插件更新）无法生效时请：#全部更新

#### 反馈

QQ：2060403379（高三小白）

#### 其他

鸣谢

| 名单      | 联系方式         | 主要贡献    |
|---------|--------------|---------|
| 小飞   | QQ203017966  | 消息风控处理.js |
| 西北一枝花 | QQ1679659 | 系统占用，群名片内存占用 |

推荐修改配置用的软件：[☞Windows](https://xwy2.lanzouf.com/ipg2u0im7ybi)/[☞Android](https://xwy2.lanzouf.com/iABUt0im7y8f)密码；1234，蓝奏云无法打开自信百度解决办法

软件gitee仓库地址：[☞Windows](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/PC%E7%AB%AF%E4%BA%91%E5%B4%BDjs%E6%8F%92%E4%BB%B6%E7%BC%96%E8%BE%91%E5%99%A8.rar)/[☞Android](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/NMM_1.12.6.apk)

注：软件源于网络

Yunzai-Bot插件库：[☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Github](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

Yunzai-Bot（V2）：[☞Github](https://github.com/yoimiya-kokomi/Yunzai-Bot)/[☞Gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) 

yunzai-c-v-plugin：[☞Github](https://github.com/xwy231321/yunzai-c-v-plugin)/[☞Gitee](https://gitee.com/xwy231321/yunzai-c-v-plugin)

注：靠API获取图片，如果接口寄了的话，提个issue

指令修改配置已经挖坑，但鉴于修改后需要重启yunzai才生效，估计得呆好久了

在尝试适配锅巴（有会的佬帮一下忙，谢谢）