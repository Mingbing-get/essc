<template>
    <div class="index-container">
        <nav class="navbar navbar-light bg-light" v-show="!isdenglu">
            <a class="btn btn-primary float-left" href="/public/load.html">去登陆</a>
            <a class="btn btn-primary float-right" href="/public/load.html#/regist">去注册</a>
        </nav>
        <nav class="navbar navbar-light bg-light" v-show="isdenglu">
            <div class="navbar-brand">
                <img class="rounded-circle" :src="$store.state.user.touxiang" width="30" height="30" alt="">
            </div>
            <p class="text-center mb-0">{{ $store.state.user.name }}</p>
            <a class="btn btn-primary float-right" href="/tuichu" @click="tuichu">退出登录</a>
        </nav>

        <div class="main mt-3">
            <div class="slide" v-if="isdenglu">
                <ul class="nav nav-pills flex-column bg-light" v-show="isshow" ref="ullist">
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" to="/essc">二手商城</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link " active-class="active" to="/wdsc">我的商城</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link car " active-class="active" to="/gwc">
                            购物车
                            <span class="mui-badge mui-badge-danger">{{ $store.state.carcount }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link " active-class="active" to="/wddd">我的订单</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link " active-class="active" to="/grzx">个人中心</router-link>
                    </li>
                </ul>
                <div class="align-middle" @click="isshow = !isshow" ref="kongzhi">
                    <span class="fa " :class="[isshow?'fa-angle-left':'fa-angle-right']"></span>
                </div>
            </div>
            <div class="main-right" ref="mr">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            isdenglu:false,
            isshow:true
        };
    },
    created : function () {
        this.$http.get('/isdenglu')
            .then(function (res) {
                if (res.data.status == 1){
                    localStorage.setItem('isdenglu',res.data.user.zhanghu);
                    this.isdenglu = true;
                    if (res.data.user.touxiang == null || res.data.user.touxiang == undefined || res.data.user.touxiang == ''){
                        res.data.user.touxiang = '/public/static/image/logo.png';
                    }
                    this.$store.commit('setuser', res.data.user);
                    this.$refs.mr.style.marginLeft = 115+'px';
                    //获取购物车数量
                    return this.$http.get('/api/carcount?userzhanghu='+res.data.user.zhanghu);
                }
                localStorage.setItem('isdenglu',false);
            })
            .then(function (result) {
                if (result.data.status == 1){
                    if (result.data.data.count)
                        this.$store.commit('setcarcount',parseInt(result.data.data.count));
                }
            })
            .catch(function(err){

            });
    },
    methods : {
        tuichu() {
            this.isdenglu = false;
            localStorage.setItem('isdenglu',false);
            this.$store.commit('setuser', {});
            this.$router.push({
                path:'/'
            });
        }
    },
    watch : {
        isshow(newval, oldval) {
            //判断侧边栏是否显示，若显示，则右边的div需要设置115的左边距，若没有显示，则只需要设置15的左边距
            if (newval){
                this.$refs.mr.style.marginLeft = 115+'px';
            }
            else{
                this.$refs.mr.style.marginLeft = 15+'px';
            }
        }
    },
    updated : function () {
        //当页面中的dom发生改变的时候，判断有没有侧边栏，若有并且侧边栏显示则设置收缩按钮的位置
        if (this.isdenglu && this.isshow)
            this.$refs.kongzhi.style.top = this.$refs.ullist.offsetHeight/2+8+'px';
    }
}
</script>

<style scoped lang="less">
    .index-container {
        min-width: 320px;
        max-width: 1180px;
        margin: 0 auto;

        .main {
            .slide {
                text-align: center;
                display: inline-block;
                position: relative;
                margin-right: 10px;
                float: left;
                ul {
                    display: block;
                    width: 100px;
                    .car {
                        position: relative;
                        span {
                            position: absolute;
                            top: 2px;
                            left: 75px;
                        }
                    }
                }
                div {
                    display: inline-block;
                    position: absolute;
                    font-size: 20px;
                    right: -10px;
                    transform: translateY(-50%);
                    z-index: 10;
                }
            }
            .main-right {
                margin-left: 0px;
            }
        }
    }
</style>