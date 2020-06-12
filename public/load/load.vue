<template>
    <div class="load-container p-3">
        <router-view></router-view>
        <router-link to="/login" class="btn btn-primary btn-block mt-2" v-show="!islogin">去登录</router-link>
        <router-link to="/regist" class="btn btn-primary btn-block mt-2" v-show="islogin">去注册</router-link>
    </div>
</template>


<script>
export default {
    data() {
        return {
            islogin : true
        };
    },
    methods : {

    },
    created : function () {
        if (this.$route.path == '/regist')
            this.islogin = false;
    },
    watch : {
        '$route.path' : function (newval, oldval) {
            if (newval == '/login')
                this.islogin = true;
            else if (newval == '/regist')
                this.islogin = false;
        }
    }
};
</script>


<style scoped>
.load-container{
    width: 50%;
    min-width: 320px;
    max-width: 600px;
    background-color: #ccc;
    margin: 0 auto;
    margin-top: 100px;
}
</style>