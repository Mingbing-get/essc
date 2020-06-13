<template>
    <div class="wdsc-container bg-light">
        <ul class="nav nav-pills justify-content-center mb-2" v-show="$route.path=='/wdsc/edtgoods'?false:true">
            <li class="nav-item">
                <router-link class="nav-link " active-class="active" to="/wdsc/addgoods">添加新商品</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link " active-class="active" to="/wdsc/history">查看历史</router-link>
            </li>
        </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {

        };
    },
    beforeCreate : function(){
        if (!localStorage.getItem('isdenglu')){
            window.location.href = '/public/load.html';
        }
    },
    created : function (){

    },
    methods : {

    }
}
</script>


<style scoped lang="less">
.wdsc-container {

}
</style>