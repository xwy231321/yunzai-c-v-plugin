# yunzai-c-v-plugin<a href='https://gitee.com/xwy231321/yunzai-c-v-plugin/stargazers'><img src='https://gitee.com/xwy231321/yunzai-c-v-plugin/badge/star.svg?theme=dark' alt='star'></img></a>

#### 访问量:2023.1.8 16：30开始

[![访问量](https://profile-counter.glitch.me/yunzai-c-v-plugin/count.svg)](https://gitee.com/xwy231321/yunzai-c-v-plugin)

## 安装教程

Yunzai-Bot目录下执行

```
git clone https://gitee.com/xwy231321/yunzai-c-v-plugin.git ./plugins/yunzai-c-v-plugin/

```

| 食用方法 | 更新方法 |
|------|------|
| #清凉图帮助 | #清凉图更新 |



#### 插件功能 

[V1.2.95](./CHANGELOG.md)

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


<details><summary>注意事项</summary>

其中 铯图，三铯图，原神铯图，原神cos图，清凉图可以配置黑名单群聊，见blacklist.yaml

清凉图、铯图 私聊：图片，群聊：聊天记录（概率裂图），云溪图：聊天记录，均不撤回。

群聊中使用时会遇到以下报错

```
发送消息错误:[{"type":"flash","file":"hppts://xxxxxxxxxxxx.com"}]
[ERRO] ApiRejection { code: -70, message: ' 群消息发送失败，可能被风控' }

```
属于**正常情况**。

资源占用10mb左右，仅支持v3云崽，已适配锅巴

**为减缓卡片被和谐的速度，其他功能将不再加入卡片，卡片功能仅维护现存功能。**

</details>

#### 反馈

QQ：2060403379（高三小白）

Q群：[597427372](https://jq.qq.com/?_wv=1027&k=rPN5Kmfx)（交流.外群）

如果可以的话，给本项目个star，来支持本项目，您的支持就是给我的最大的鼓励，谢谢。

<details><summary>其他事项</summary>

由于插件性质特殊，内群**分享交流**只提供给开发者等有贡献/赞助人员

#### 支持与赞助

鸣谢（排名不分先后）

| 名单  | 主要贡献      |
|-----|-----------|
| 小飞  | 消息风控处理等   |
| 无解  | Linux清理内存 |
| 星念  | 仓库动态检测 |
| Parker Liang  | 图库支持 |

#### 赞助名单

**赞助方式请联系作者**

仅按时间顺序排名，谢谢支持~

| 名单  | 铯图量 | 备注 |
|-----|-----|-----|
| 倾听 | 2000张 | 无 |
| 维拉 | 10000张 | 无 |
| 青骢 | 888张 | 我好喜欢xwy |
| 喵喵喵~ | 888张 | 欸嘿 |
| Agoni | 521张 | sagiri天下第一可爱 |
| 黑甘雨 | 10000张 | 千羽 yyds |
| .. | 3000张 | 祝越做越好 |
| puppet | 3000张 | 想做八重大人的修勾 |
| 慕言 | 5000张 | 暂无 |
| 绝对不熬夜 | 2000张 | 无 |
| 琉璃·霜染月 | 1500张 | 无 |

#### 推荐修改配置使用：

蓝奏云：[☞Windows](https://xwy2.lanzouf.com/ipg2u0im7ybi)/[☞Android](https://xwy2.lanzouf.com/iABUt0im7y8f)密码；1234，蓝奏云无法打开自行百度解决办法

gitee仓库：[☞Windows](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/PC%E7%AB%AF%E4%BA%91%E5%B4%BDjs%E6%8F%92%E4%BB%B6%E7%BC%96%E8%BE%91%E5%99%A8.rar)/[☞Android](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/NMM_1.12.6.apk)

注：软件源于网络

附赠近万张二次元图片下载地址[点击此处跳转仓库界面](https://gitee.com/xwy231321/cv-plugins-in-resources/tree/master/%E5%9B%BE%E5%BA%93%E9%93%BE%E6%8E%A5) ，注意，txt文件里仅为图片的下载链接，在线查看会报403，请使用批量下载的软件下载

[已知问题](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/1.md)

</details>

Yunzai-Bot插件库：[☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Github](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

Yunzai-Bot（V2）：[☞Github](https://github.com/yoimiya-kokomi/Yunzai-Bot)/[☞Gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) 

yunzai-c-v-plugin：[☞Github](https://github.com/xwy231321/yunzai-c-v-plugin)/[☞Gitee](https://gitee.com/xwy231321/yunzai-c-v-plugin)


