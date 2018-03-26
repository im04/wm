# 说明文档

> vr-mu 后台管理
## svn地址
前端文件地址：http://192.168.30.5/svn/csmedia/trunk/html/vr-mu-manage
原型地址：    http://192.168.30.5/svn/vrmu/产品/原型/交互文件/V1.0

## 使用指令

``` bash
# 安装依赖
npm install 或者 cnpm i

# 启动测试环境热替换调试服务
npm run dev-test

# 启动生产环境调试服务
npm run dev-po
# 打包测试环境
npm run build-test

# 打包生产环境
npm run build --report

```

## 目录结构

- vr-mu-manage      ----目录名称
    - build             ----打包配置
        - dev-server.js     ----调试服务器文件(node服务器)
        - utils.js          ----打包配置里使用的工具方法
        - webpack.build.js  ----webpack打包功能的配置文件
        - webpack.dev.js    ----webpack调试功能的配置文件
        - webpack.config.js ----webpack基础配置(打包和调试的公共部分)
    - src               ----源码
        - assets            ----静态文件存放目录
        - config            ----环境差异配置目录(如：测试(config-dev.js)和生产(config-prod.js)环境有差异的地方可以写进这里，代码里可以使用全局变量Congif获取内容)
        - containers        ----vue容器组件目录(负责把各个vue单功能组件组合的组件目录)
        - components        ----vue组件目录(只负责单个功能的组件目录)
        - router            ----路由配置目录
        - store             ----vuex的store目录(用于管理ajax请求)
        - render            ----特殊情况处理目录(存放vue的render函数的目录，有复杂情况时使用render来生成组件)
        - main.js           ----webpack入口文件
        - App.vue           ----项目根组件
    - dist              ----打包文件生成目录（打包的文件会放到这里，没有的话会自动创建）
