import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import axios from 'axios'

import Vant from 'vant';
import 'vant/lib/index.css';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

Vue.use(VueMarkdownEditor);

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdPreview);

Vue.use(Vant);
import { Notify } from 'vant';

// 全局注册
Vue.use(Notify);
Vue.use(VueAxios, axios)

// axios.defaults.baseURL="http://127.0.0.1:8888/api/v1";

axios.defaults.baseURL = "/api/v1";

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 判断该路由是否需要登录权限 */
 
  if (to.matched.some(record => record.meta.requireAuth)) {
    //是否登录
    if(localStorage.getItem("authKey") == null){
      next({path:'/login'}) 
    }
  }
  next();
})

Vue.filter("dateFormat", function (dateStr, pattern = "") {
  var dt = new Date(dateStr)
  var y = dt.getFullYear()
  var m = dt.getMonth() + 1
  var d = dt.getDate()
  if (pattern.toLowerCase() == "yyyy-mm-dd") {
    return `${y}年${m}月${d}日`
  } else {
    var hh = dt.getHours()
    var mm = dt.getMinutes()
    return `${y}-${m}-${d} ${hh}:${mm}`
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
