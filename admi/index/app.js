//入口文件

//导入第三方模块
import Vue from 'vue';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import Vuex from 'vuex';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Vuex);
Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(ElementUI);

//导入路由
import router from './router.js'

//导入组件
import index from './index.vue';

//导入样式
import '../lib/bootstrap-4.3.1-dist/css/bootstrap.min.css';

const store = new Vuex.Store({
    state : {

    },
    mutations : {

    }
});

var vm = new Vue({
    el:'#app',
    render:c=>c(index),
    router,
    store
});