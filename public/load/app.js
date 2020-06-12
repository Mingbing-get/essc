//入口文件

//导入第三方模块
import Vue from "vue";
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
Vue.use(vueRouter);
Vue.use(vueResource);

//导入路由
import router from './router.js'

//导入组件
import load from './load.vue';

//导入样式
import '../lib/bootstrap-4.3.1-dist/css/bootstrap.min.css';

var vm = new Vue({
    el:'#app',
    render:c=>c(load),
    router
});