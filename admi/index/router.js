import vueRouter from 'vue-router';

//导入组件
import login from './login.vue';
import shouye from './shouye.vue';

var router =  new vueRouter({
    routes : [
        {path:'/',redirect:'/login'},
        {path:'/login',component:login},
        {
            path:'/shouye',
            component:shouye,
            meta:{requireAuth:true}
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {// 判断是否需要登录权限
        if (localStorage.getItem('admi') != null) {// 判断是否登录
            next()
        } else {// 没登录则跳转到二手商城页面
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
});
export default router