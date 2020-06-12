//入口文件

//导入第三方模块
import Vue from 'vue';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.use(vueRouter);
Vue.use(vueResource);

//导入路由
import router from './router.js'

//导入组件
import index from './index.vue';

//导入样式
import '../lib/bootstrap-4.3.1-dist/css/bootstrap.min.css';
import '../lib/font-awesome-4.7.0/css/font-awesome.min.css';
import '../lib/mui/css/mui.min.css';

// import mui from '../lib/mui/js/mui.min.js';

const store = new Vuex.Store({
    state : {
        user:{},
        carcount:0
    },
    mutations : {
        setuser(state,user){
            state.user=user;
        },
        setcarcount(state,count){
            state.carcount = count;
        },
        incrcecount(state,count){
            state.carcount += count;
        },
        decricecount(state,count){
            state.carcount -= count;
        }
    },
});

var vm = new Vue({
    el:'#app',
    render:c=>c(index),
    router,
    store
});