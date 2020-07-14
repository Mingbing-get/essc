<template>
    <div class="shouye-container">
        <el-container>
            <el-header class="bg-light">
                <el-page-header @back="tuichu" title="退出" :content="admi.name"></el-page-header>
            </el-header>
            <el-container>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="w-100">
                    <el-tab-pane label="轮播图" name="first">
                        <lunbo></lunbo>
                    </el-tab-pane>
                    <el-tab-pane label="商品管理" name="second">
                        <goods></goods>
                    </el-tab-pane>
                    <el-tab-pane label="用户管理" name="third">
                        <user></user>
                    </el-tab-pane>
                </el-tabs>
            </el-container>
        </el-container>
    </div>
</template>


<script>
    import lunbo from './lunbo.vue';
    import goods from './goods.vue';
    import user from './users.vue';
    export default {
        data(){
            return {
                admi:{},
                activeName: 'first'
            };
        },
        created : function(){
            this.$http.get('/isdenglu')
                .then(function (result) {
                    if (result.data.status == 1){
                        this.admi = result.data.user;
                    }
                    else{
                        this.$router.push({path: '/login'});
                    }
                })
                .catch(function (err) {
                    this.$router.push({path: '/login'});
                });
        },
        methods:{
            tuichu(){
                this.$http.get('/tuichu')
                    .then(function (result) {
                        localStorage.removeItem('admi');
                        this.$router.push({path:'/login'});
                    })
                    .catch(function (err) {

                    });
            },
            handleClick(tab, event) {
                // tab.$el.id == 'pane-first'
                // console.log(tab.$el.id == 'pane-first');
            }
        },
        components : {
            lunbo,
            goods,
            user
        }
    }
</script>


<style scoped lang="less">
.shouye-container {
    width: 800px;
    margin: 0 auto;
    .el-page-header {
        line-height: 60px;
    }
}
</style>