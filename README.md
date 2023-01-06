# yunzai-c-v-plugin<a href='https://gitee.com/xwy231321/yunzai-c-v-plugin/stargazers'><img src='https://gitee.com/xwy231321/yunzai-c-v-plugin/badge/star.svg?theme=dark' alt='star'></img></a>


[![雷神八重](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/%E9%9B%B7%E7%A5%9E%E5%85%AB%E9%87%8D.jpg)](https://pixiv.net/i/96839227)


#### 前言

yunzai插件，依赖云崽实现功能。**仅适配V3。** 已支持锅巴，占储存资源很小（约10mb左右），对性能要求很小。

如果遇到bug，请提issues，谢谢

修改所用工具在**结尾处**有相关跳转链接

[查看版本信息](./CHANGELOG.md)

#### 插件功能 

V1.2.2

| 功能名称             | 默认配置            |
|------------------|-----------------|
| B站404随机漫画        | 开启              |
| 图片盲盒             | 开启              |
| 原神图片盲盒           | 开启              |
| mc酱戳一戳(群聊生效)     | **关闭**          |
| 戳一戳清理内存(Linux生效) | **关闭**          |
| 三元图(支持卡片）        | 开启              |
| 清凉图              | 开启，非18(**可更改**） |
| 云溪图(支持卡片)        | 开启，18**混**      |
| 铯图(支持卡片)         | **关闭**，18       |
| 消息风控处理           | 开启              |
| 发大图/转大图          | 开启              |
| 体力（卡片形式，仅支持原生样式） | **关闭**          |

<details><summary>其他事项</summary>

清凉图（st）和铯图（stplus）私聊将以图片形式发送，群聊将以聊天记录形式发送（图片尺度较大时会裂图），云溪图默认以聊天记录形式发送，均不撤回。

注：群聊中使用时会遇到以下报错

```
发送消息错误:[{"type":"flash","file":"hppts://xxxxxxxxxxxx.com"}]
[ERRO] ApiRejection { code: -70, message: ' 群消息发送失败，可能被风控' }

```
属于**正常情况**。(依然不推荐群聊食用，防内，鬼和t，x检测)

（占用系统资源**极少**，可放心安装）

</details>

#### 食用方法

发送#清凉图帮助

[![清凉图帮助](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/%E6%B8%85%E5%87%89%E5%9B%BE%E5%B8%AE%E5%8A%A9.jpg)](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/%E6%B8%85%E5%87%89%E5%9B%BE%E5%B8%AE%E5%8A%A9.jpg)

#### 安装方法（安装后需要重启）

推荐使用gitee安装（github已经停止更新）

在云崽目录打开终端，运行：（和其他插件一样）

```
git clone https://gitee.com/xwy231321/yunzai-c-v-plugin.git ./plugins/yunzai-c-v-plugin/

```

如果不会或者报错请自行百度或者问其他交流群群友，如果确定是本插件问题请提issue，目前高三没太多精力去回复，谢谢

#### 更新

**发送#清凉图更新**

#### 反馈

QQ：2060403379（高三小白）

Q群(不定时锁群)：[597427372](https://jq.qq.com/?_wv=1027&k=rPN5Kmfx)

#### 其他

鸣谢

| 名单  | 联系方式 | 主要贡献         |
|-----|-----|--------------|
| 小飞  | QQ203017966 | 消息风控处理，ark打包 |
| 无解  | QQ3146312184  | 清理内存         |

推荐修改配置用的软件：[☞Windows](https://xwy2.lanzouf.com/ipg2u0im7ybi)/[☞Android](https://xwy2.lanzouf.com/iABUt0im7y8f)密码；1234，蓝奏云无法打开自行百度解决办法

软件gitee仓库地址：[☞Windows](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/PC%E7%AB%AF%E4%BA%91%E5%B4%BDjs%E6%8F%92%E4%BB%B6%E7%BC%96%E8%BE%91%E5%99%A8.rar)/[☞Android](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/NMM_1.12.6.apk)

注：软件源于网络

附赠近万张二次元图片下载地址[点击此处跳转仓库界面](https://gitee.com/xwy231321/cv-plugins-in-resources/tree/master/%E5%9B%BE%E5%BA%93%E9%93%BE%E6%8E%A5) ，注意，txt文件里仅为图片的下载链接，在线查看会报403，请使用批量下载的软件下载

Yunzai-Bot插件库：[☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Github](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

Yunzai-Bot（V2）：[☞Github](https://github.com/yoimiya-kokomi/Yunzai-Bot)/[☞Gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) 

yunzai-c-v-plugin：[☞Github](https://github.com/xwy231321/yunzai-c-v-plugin)/[☞Gitee](https://gitee.com/xwy231321/yunzai-c-v-plugin)

如果可以的话，给本项目个star，或者[爱发电](https://afdian.net/a/yunzai-c-v-plugin)来支持本项目，您的支持就是给我的最大的鼓励，谢谢。