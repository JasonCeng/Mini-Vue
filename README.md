# Mini-Vue

## 前言

本文为vue+vue-router+axios构建vue最简项目的手记。

涉及的技术如下：

1.vue.js 核心

2.vue-router 实现路由工具

3.webpack 项目打包以及编译工具

4.nodejs 前端开发环境

5.npm 前端包管理器

6.axios ajax 接口请求工具

7.sass-loader 和 node-sass  css 预处理

8.element-ui  基于 vue 的组件库

9.vue-cli   vue 项目脚手架（一键安装 vue 全家桶的工具）

## 一、初始化
1.安装vue-cli：
```bash
npm install vue-cli -g
```

2.用vue-cli构建一个项目：
```bash
vue init webpack my-vue-project
```

3.安装cnpm：
```bash
npm install cnpm -g --registry=https://registry.npm.taobao.org
```

4.运行项目：
```bash
cd my-vue-project

npm run dev
```

## 二、项目文件解读
```bash

├── node_modules                    # 项目依赖包文件夹
├── build                           # 编译配置文件，一般不用管
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                           # 项目基本设置文件夹
│   ├── dev.env.js                   # 开发配置文件
│   ├── index.js                     # 配置主文件
│   └── prod.env.js                  # 编译配置文件
├── src                              # 项目源码编写文件
│   ├── App.vue                      # APP入口文件
│   ├── assets                       # 初始项目资源目录，回头删掉
│   │   └── logo.png
│   ├── components                   # 组件目录
│   │   └── Hello.vue                # 测试组件，回头删除
│   ├── main.js                      # 主配置文件
│   └── router                       # 路由配置文件夹
│       └── index.js                 # 路由配置文件
└── static                           # 资源放置目录
├── index.html                       # 项目入口html模板
├── package.json                     # 项目依赖包配置文件
├── .babelrc                         # babel 配置
├── .postcssrc.js                    # postcss 配置
├── .editorconfig                    # editor 配置
└── README.md                        # 项目说明文档
```

## 三、配置src和static目录
src目录：
```bash
├── api                           // 接口调用工具文件夹
│   └── index.js                   
├── components                    // 组件文件夹
│    ├── header.vue                
│    └── footer.vue                  
├── page                          // 页面文件夹
│   ├── content.vue               // 内容页面
│   └── index.vue                 // 首页列表
├── router                        // 路由配置文件夹
│   └── index.js                
├── store                         // vuex状态管理目录    
├── style                         // scss 样式存放目录
│   └── style.scss                // 主样式文件，可以按分类创建多个文件夹
└── utils                         // 常用工具文件夹
│   └── index.js                    
├── App.vue                       // APP入口文件
└── main.js                       // 项目配置文件
```

static目录：
```bash
├── css               # 放第三方的样式文件
├── font              # 放字体图标文件
├── image             # 放图片文件，里面可以根据图片种类创建文件夹
└── js                # 放第三方的JS文件，比如datepicker
```

## 四、修改App.vue与router文件
1.修改App.vue如下：
```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./style/style";
</style>
```

2.安装sass加载工具
```bash
cnpm install -D node-sass sass-loader
```

3.修改router/index.js如下：
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import content from '@/page/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',     //path别名，可删除
      meta:{
        title: '首页'   //设置页面title
      },
      component: index
    },
    {
      path: '/content/:id',
      name: '详情',
      meta:{
        title: '详情'
      },
      component: content
    }
  ]
})
```

## 五、修改index.vue和content.vue文件
1.修改index.vue如下：
```html
<template>
    <div>index page</div>
</template>
<script>
    export default {

    }
</script>
<style lang='scss'>
    @import '..style/style'
</style>
``

2.修改content.vue如下：
```html
<template>
    <div>content page</div>
</template>
<script>
    export default {

    }
</script>
<style lang='scss'>
    @import '..style/style'
</style>
```

3.启动项目
```bash
npm run dev
```

4.在浏览器中查看
```bash
http://localhost:8080

http://localhost:8080/#/content/10
```

## 六、配置axios api接口调用
1.安装axios：
```bash
npm install axios --save
```

2.修改main.js如下：
```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
//全局注册axios
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

3.调整src/page/index.vue 文件：
```html
<template>
    <div>index page</div>
</template>

<script>
export default {
    mounted (){
          this.$http.get('https://unpkg.com/axios@0.18.0/dist/axios.min.js')
         .then(res => {
           console.log(res);
         })
     }
}
</script>

<style lang="scss">
  @import "../style/style";
</style>
```

## 七、渲染index.vue列表
1.编写src/page/index.vue 文件：
```html
<template>
  <div>
    <ul>
      <li v-for="item in getList" :key="item.id">
        <span>{{item.create_at}}</span>
        <router-link :to="'/content/'+item.id" :target="'_blank'">
          {{item.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      getList: []
    }
  },
  mounted () {
    this.getTopics()
  },
  methods: {
    getTopics () {
      this.$http.get('/topics')
        .then(res => {
          console.log(res)
          res.data.success && (this.getList = res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
  @import "../style/style";
</style>
```

2.修改main.js
```javascript
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// 设置全局访问接口
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

**在浏览器中查看：http://localhost:8081/#/**

3.创建一个公用工具处理文件
编写 src/utils/index.js 文件：
```javascript
export default {
  //格式化日期
  formatDate (str) {
    let result = ''
    const date = new Date(str).toLocaleDateString()
    const hour = new Date(str).getHours()
    const minute = new Date(str).getMinutes()
    const second = new Date(str).getSeconds()
    result = date.replace(/\//g, '-') + ' ' + hour + ':' + minute + ':' + second
    return result
  }
}

```

修改main.js:
```javascript
//引用utils工具文件
import utils from './utils'
//全局注册utils
Vue.prototype.$utils = utils
```

修改 index.vue 中的代码，将 span 调整为：
```html
<span>{{$utils.formatDate(item.create_at)}}</span>
```

**再次在浏览器中查看：http://localhost:8081/#/**

## 七、渲染content.vue内容
1.编写src/page/content.vue 文件
```html
<template>
  <div>
    <h3>{{getMsg.title}}</h3>
    <p>作者：{{getMsg.author.loginname}}&nbsp;&nbsp;发表于：{{$utils.formatDate(getMsg.create_at)}}</p>
    <hr>
    <article v-html="getMsg.content"></article>
    <h4>网友回复：</h4>
    <ul>
      <li v-for="item in getMsg.replies" :key="item.id">
        <p>评论者：{{item.author.loginname}}，&nbsp;&nbsp;发表于：{{$utils.formatDate(item.create_at)}}</p>
        <article v-html="item.content"></article>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      getMsg: {}
    }
  },
  mounted () {
    this.getContent()
  },
  methods: {
    getContent () {
      this.$http.get('topic/' + this.id)
        .then(res => {
          res.data.success && (this.getMsg = res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
  @import "../style/style";
</style>

```

## 八、引用组件
1.编写header.vue和footer.vue文件

header.vue
```html
<template>
  <div style="background: red">
    <h3>Vue header</h3>
  </div>
</template>
```

footer.vue
```html
<template>
  <div style="background: blue">
    <h3>Vue footer</h3>
  </div>
</template>
```

2.编写App.vue文件
```html
<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './components/header'
import myFooter from './components/footer'
export default {
  components: {
    myHeader, myFooter
  },
  name: 'App'
}
</script>

<style lang="scss">
  @import "./style/style";
</style>

```

**在浏览器中查看：http://localhost:8081/#/**

## 总结

以上为vue+vue-router+axios构建vue最简项目的全过程，如有疑问，欢迎探讨交流。
