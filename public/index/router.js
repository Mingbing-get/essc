import vueRouter from 'vue-router';

//导入组件
import grzx from './grzx.vue';
import essc from './essc.vue';
import gwc from './gwc.vue';
import wddd from './wddd.vue';
import wdsc from './wdsc.vue';
import serchgoods from './serchgoods.vue';
import xqgoods from './xqgoods.vue';

var router =  new vueRouter({
    routes : [
        {path : '/', redirect : '/essc'},
        {path : '/grzx', component : grzx},
        {path : '/essc', component : essc},
        {path : '/gwc', component : gwc},
        {path : '/wddd', component : wddd},
        {path : '/wdsc', component : wdsc},
        {path : '/serchgoods', component : serchgoods},
        {path : '/xqgoods', component : xqgoods}
    ]
});
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//         if (localStorage.getItem('isdenglu')=='true') {// 判断是否登录
//             next()
//         } else {// 没登录则跳转到二手商城页面
//             next({
//                 path: '/essc'
//             })
//         }
//     } else {
//         next()
//     }
// });

export default router