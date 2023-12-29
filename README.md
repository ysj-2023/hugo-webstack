# Hugo版 WebStack 主题

**预览**DEMO：[oulh.github.io/nav](https://oulh.github.io/nav)

![](https://raw.githubusercontent.com/oulh/hugo-webstack/master/static/images/smartmockups_lqc03197.jpg)

本项目是基于**纯静态**的网址导航网站[webstack.cc](https://github.com/WebStackPage/WebStackPage.github.io) 制作的[Hugo](https://gohugo.io/)主题，在[iplaycode/webstack-hugo](https://github.com/iplaycode/webstack-hugo/tree/5e85297db430079c468dd33e78a945556973c73a/)的基础上完善和增加功能：

1. 增加：api自动获取网站logo图片
2. 增加：支持添加多个导航(子)页面
3. 增加：卡片显示列数变化
   - 手机端显示双列
   - 高分辨率大屏或网页缩放时显示5~6列
   - 分类菜单收回或展开时，显示列数+1或-1
4. 内容增加
   - 友情链接区域
   - 页面顶部天气
   - 在线编辑按钮(适用于 github + 自动化部署；可隐藏)
5. 修改个别样式，增加一些可自定义配置项
6. 分类标题前的图标库升级到 [FontAwesome-v6-free](https://origin.fontawesome.com/search)

## 使用方式

### 本地构建

方式1：把主题文件夹hugo-webstack复制到themes目录，即`/themes/hugo-webstack`，将exampleSite目录下的文件复制到hugo站点根目录（覆盖原有文件），然后自行修改和构建。

方式2：以git子模块方式安装

在站点根目录下 ：

```sh
git init
git submodule add https://github.com/oulh/hugo-webstack.git themes/hugo-webstack
```

### 自动构建

方式3：**最方便**

可以 导入 或 Fork 这个初始模板： [github.com/oulh/nav](https://github.com/oulh/nav)，直接在线编辑+自动构建，无需本地环境。

自动构建平台可以选择 Github Pages、Cloudflare、Vercel、Netlify等。

## 文件说明

以下是可自定义的与网站内容相关的文件：

- 网站配置：/hugo.toml

- 主页面配置：/data/webstack.yml

- 子页面配置：/content/xxx.md

- “关于”页面：/content/about.md

- 图标等静态文件：/static/images


## 使用说明

#### 网站配置项

```toml
baseURL = "http://example.org/"
languageCode = "zh-CN"
title = "一二导航"
theme = "hugo-webstack"

#true:允许大写字母url路径，false:将url路径转换成小写
disablePathToLower = true

#页脚：作者名字
copyright = "oulh"

#网站信息，不显示，仅供搜索引擎参考
[params]
  keywords = "网页导航,webstack,hugo"
  description = "Webstack Hugo版主题"

#是否开启搜索栏，true开启，false关闭
[params.search]
  enable = true

#是否开启暗色模式，true暗色模式，false亮色模式
[params.darkmode]
  enable = false

#主页菜单栏显示在线编辑按钮（编辑github文件，适用于自动化部署的情况）
[params.edit]
  # true显示按钮，false不显示
  enable = true
  # 站点对应的github仓库链接
  url = "https://github.com/oulh/nav/blob/main/data/webstack.yml"
  
#桌面端右上角github按钮
[params.github]
  enable = true
  url = "https://github.com/oulh/nav"
```

#### 导航网址logo图标

1. 使用api自动获取，**留空或去掉**"logo" 配置项即自动在线加载logo图标。api提供者：**[一为API](https://api.iowen.cn/)**, thanks!

2. 使用本地静态文件，存放路径：`/static/images/logos/`；

   配置写法：

   - 主页面：logo: `images/logos/xxx.png`
   - 子页面：logo: `../images/logos/xxx.png`

   如果写错或图片不存在，则自动使用默认的 `images/favicon.png`（可替换）

#### 添加自定义导航(子)页面

在`content/` 目录下新建markdown文件，使用示例`sub1.md`配置 ，即可生成子页面。

md文件名就是访问链接的子路径，如 [oulh.github.io/nav/sub1](https://oulh.github.io/nav/sub1)

示例配置：

```yaml
---
type: nav #固定值nav(生成导航页)
title: 子页面一 #留空则使用网站标题
search: #搜索栏
  enable: true #true显示，false不显示
edit: #在线编辑
  enable: true #true显示，false:不显示
  url: https://github.com/oulh/nav/blob/main/content/sub1.md

data: #以下为导航链接内容
#下面内容的格式与/data/webstack.tml 一样
---
```

#### **其他：**

+ 分类标题前面的图标参考：[FontAwesome-v6-free](https://origin.fontawesome.com/search) ，如果访问不了就试试这个：[FontAwesome中文网图标库v5](https://fontawesome.com.cn/v5)
```yaml
<i class="fa-solid fa-star"></i>
icon: fa-star

<i class="fa-regular fa-star"></i>
icon：fa-regular fa-star
```
+ 可以加公众号二维码，webstack.yml中的配置如下
```yaml
    - title: 二维码演示
      qrcode: ../images/qrcodes/cli.png
      logo: 
      url: https://cli.im/url
      description: 二维码演示，手机扫一扫，也可以点击
```
