import vueRouter from 'vue-router';

//导入组件
import login from './login.vue';
import regist from './regist.vue';

var router =  new vueRouter({
    routes : [
        {path : '/login', component : login},
        {path : '/regist', component : regist},
        {path : '/', redirect : '/login'}
    ]
});

export default router