#### 项目准备 - 插件安装
1.scss/sass编译
2.typescript
3.HBuilder无法格式sass文件的解决办法
    -- HBuilderX安装目录下plugins\format\jsbeautifyrc.js文件parsers对象添加".scss": "css",
    -- HBuilderX安装目录下plugins\format\package.json文件filetypes数组添加"scss",
    -- 用户目录下\AppData\Roaming\HBuilder X\extensions\format\jsbeautifyrc.js文件parsers对象添加".scss": "css",

#### 目录结构
common          公共文件
components      自定义组件
pages           页面
static          静态资源
  --css         css
  --image       图片
store           vuex存储
uni_modules     uni-ui
manifest.json   全局配置
pages.json      页面配置
readme.md       说明文件
tsconfig.json   typescript配置
uni.scss        全局scss

#### 小程序可能遇到的问题（error or notice）
1.TypeError: Cannot read property 'forceUpdate' of undefined
    -- manifest.json 配置小程序Appid
2.[sitemap 索引情况提示] 根据 sitemap 的规则[0]，当前页面 [pages/index/index] 将被索引
    -- manifest.json 添加"checkSiteMap"
    "mp-weixin" : {
        "setting" : {
            "checkSiteMap": false
        }
    }
3.tabbar图标尺寸
    -- 81*81，四周留空
4.Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.
    -- 页面不能使用id选择器#a、属性选择器[a]和标签名选择器，全部改用class选择器
5.Do not set same key [object Object] in wx:key
    -- 添加属性 :range-key="'name'"