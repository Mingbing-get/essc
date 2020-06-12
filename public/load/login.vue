<template>
    <div>
        <div class="alert alert-danger mb-3" v-show="tishi">
            {{ message }}
            <button type="button" class="close" @click="tishi=!tishi">
                <span >&times;</span>
            </button>
        </div>
        <div class="form-group row">
            <label for="zhanghao" class="col-sm-3 col-lg-2 col-form-label">账号:</label>
            <div class="col-sm-9 col-lg-10">
                <input type="text" class="form-control" id="zhanghao" v-model="zhanghu">
            </div>
        </div>
        <div class="form-group row">
            <label for="mima" class="col-sm-3 col-lg-2 col-form-label">密码:</label>
            <div class="col-sm-9 col-lg-10">
                <input type="password" class="form-control" id="mima" v-model="mima">
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="denglu">登录</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            zhanghu:'',
            mima:'',
            tishi:false,
            message:''
        };
    },
    created : function () {
        this.zhanghu = this.$route.query.zhanghu;
    },
    methods : {
        denglu(){
            if (this.zhanghu == '' || this.mima == ''){
                this.tishi = true;
                this.message = '账户和密码不能为空!';
                return;
            }
            this.$http.post('/api/denglu',{zhanghu:this.zhanghu,mima:this.mima},{emulateJSON:true})
                .then(function (res) {
                    if (res.data.status == 1){
                        window.location.href = '/public/index.html';
                    }
                    else {
                        this.tishi = true;
                        this.message = res.data.message;
                    }
                })
                .catch(function (err) {
                    this.tishi = true;
                    this.message = '登录失败!';
                });
        }
    }
}
</script>


<style>

</style>