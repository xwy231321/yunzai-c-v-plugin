# yunzai-c-v-plugin<a href='https://gitee.com/xwy231321/yunzai-c-v-plugin/stargazers'><img src='https://gitee.com/xwy231321/yunzai-c-v-plugin/badge/star.svg?theme=dark' alt='star'></img></a>


[![雷神八重](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/%E9%9B%B7%E7%A5%9E%E5%85%AB%E9%87%8D.jpg)](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/%E9%9B%B7%E7%A5%9E%E5%85%AB%E9%87%8D.jpg)


#### 前言

**注：为减缓卡片被和谐的速度，其他功能将不再加入卡片，卡片功能仅维护现存功能。**

yunzai插件，依赖云崽实现功能。**仅适配V3。** 已支持锅巴，占储存资源很小（约11mb左右），对性能要求很小。

如果遇到bug，**请提issues**，谢谢

修改所用工具在**结尾处**有相关跳转链接

[已知问题](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/1.md)

[查看版本更新信息](./CHANGELOG.md)

#### 插件功能 

V1.2.95

| 功能名称                          | 默认启用配置 | 默认单次获取最大数量 |
|-------------------------------|----|------------|
| B站404随机漫画                     | 开启 | 20         |
| 图片盲盒（二次元随机 18-）               | 开启 | 20         |
| 原神图片盲盒（二次元随机 18-）             | 开启 | 20         |
| mc酱戳一戳(群聊生效)                  | **关闭** | 无          |
| 戳一戳清理内存(Linux生效)              | **关闭** | 无          |
| 三元图(三次元随机，支持卡片 18-）           | 开启 | 20         |
| 三铯图（三次元铯图18 +）                | **关闭** | 20         |
| 原神cos图（三次元铯图18 +）             | **关闭** | 20         |
| 清凉图（默认18-可调节18 +或混合）          | 开启 | 20         |
| 原神铯图（二次元18 +）             | 同铯图配置 | 20         |
| 铯图(二次元，支持卡片18 +)  | **关闭** | 20         |
| 云溪图（二次元，18-+混合）                       | 开启 | 20          |
| 消息风控处理                        | 开启 | 无          |
| 发大图/转大图                       | 开启 | 无          |
| 体力（卡片形式，仅支持原生样式）              | **关闭** | 无          |
| 仓库更新检测              | -- | --          |
| 清凉图api检测              | -- | --          |

其中 铯图，三铯图，原神铯图，原神cos图，清凉图可以配置黑名单群聊，见blacklist.yaml

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

[![清凉图帮助](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/1.jpg)](https://gitee.com/xwy231321/cv-plugins-in-resources/raw/master/1.jpg)

#### 安装方法（安装后需要重启）

推荐使用**gitee**安装（github更新不及时）

在云崽目录打开终端，运行：（和其他插件一样）

```
git clone https://gitee.com/xwy231321/yunzai-c-v-plugin.git ./plugins/yunzai-c-v-plugin/

```

如果不会或者报错请自行百度或者问其他交流群群友，如果确定是本插件问题请提issue，目前高三没太多精力去回复，谢谢

#### 更新

**发送#清凉图更新**

如果遇到冲突，请删除冲突文件后再次更新即可

#### 反馈

QQ：2060403379（高三小白）（有问题提issue）

Q群：[597427372](https://jq.qq.com/?_wv=1027&k=rPN5Kmfx)（交流.外群）

内群只提供给开发者等有贡献/赞助人员

如果可以的话，给本项目个star，来支持本项目，您的支持就是给我的最大的鼓励，谢谢。

#### 访问量

（2023.1.8 16：30开始统计数据）

[![访问量](https://profile-counter.glitch.me/yunzai-c-v-plugin/count.svg)](https://gitee.com/xwy231321/yunzai-c-v-plugin)

#### 支持与赞助

鸣谢（排名不分先后）

| 名单  | 主要贡献      |
|-----|-----------|
| 小飞  | 消息风控处理等   |
| 无解  | Linux清理内存 |

#### 赞助名单

仅接受为爱赞助

微信和支付宝方式赞助请加作者qq(**推荐**,无.第.三.方.赚.差.价，让爱不打折)

[爱发电](https://afdian.net/a/yunzai-c-v-plugin)https://afdian.net/a/yunzai-c-v-plugin (**不**.**推**.**荐**，平.台.有.抽.成)

以下名单仅按时间顺序排名，谢谢支持~

| 名单  | 赞助金额 | 备注 |
|-----|-----|-----|
| 倾听 | 20 | 无 |
| 维拉 | 100 | 无 |
| 青骢 | 8.88 | 我好喜欢xwy |
| 喵喵喵~ | 8.88 | 欸嘿 |
| Agoni | 5.21 | sagiri天下第一可爱 |
| 黑甘雨 | 50 | 千羽 yyds |

#### 其他

推荐修改配置用的软件：[☞Windows](https://xwy2.lanzouf.com/ipg2u0im7ybi)/[☞Android](https://xwy2.lanzouf.com/iABUt0im7y8f)密码；1234，蓝奏云无法打开自行百度解决办法

软件gitee仓库地址：[☞Windows](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/PC%E7%AB%AF%E4%BA%91%E5%B4%BDjs%E6%8F%92%E4%BB%B6%E7%BC%96%E8%BE%91%E5%99%A8.rar)/[☞Android](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/NMM_1.12.6.apk)

注：软件源于网络

附赠近万张二次元图片下载地址[点击此处跳转仓库界面](https://gitee.com/xwy231321/cv-plugins-in-resources/tree/master/%E5%9B%BE%E5%BA%93%E9%93%BE%E6%8E%A5) ，注意，txt文件里仅为图片的下载链接，在线查看会报403，请使用批量下载的软件下载

Yunzai-Bot插件库：[☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Github](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

Yunzai-Bot（V2）：[☞Github](https://github.com/yoimiya-kokomi/Yunzai-Bot)/[☞Gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) 

yunzai-c-v-plugin：[☞Github](https://github.com/xwy231321/yunzai-c-v-plugin)/[☞Gitee](https://gitee.com/xwy231321/yunzai-c-v-plugin)


