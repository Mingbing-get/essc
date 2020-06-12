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
            <label for="name" class="col-sm-3 col-lg-2 col-form-label">姓名:</label>
            <div class="col-sm-9 col-lg-10">
                <input type="text" class="form-control" id="name"  v-model="name">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 col-lg-2 col-form-label">性别:</label>
            <div class="col-sm-9 col-lg-10">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sex" id="inlineRadio1" value="男"  v-model="sex" checked>
                    <label class="form-check-label" for="inlineRadio1">男</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sex" id="inlineRadio2" value="女"  v-model="sex">
                    <label class="form-check-label" for="inlineRadio2">女</label>
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="mima" class="col-sm-3 col-lg-2 col-form-label">密码:</label>
            <div class="col-sm-9 col-lg-10">
                <input type="password" class="form-control" id="mima"  v-model="mima">
            </div>
        </div>
        <div class="form-group row">
            <label for="qrmima" class="col-sm-3 col-lg-2 col-form-label">确认密码:</label>
            <div class="col-sm-9 col-lg-10">
                <input type="password" class="form-control" id="qrmima"  v-model="qrmima">
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="zhuce">注册</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            zhanghu:'',
            mima:'',
            qrmima:'',
            name:'',
            sex:'男',
            tishi:false,
            message:''
        }
    },
    methods : {
        zhuce (){
            //验证数据的正确性
            if (this.zhanghu == '' || this.mima == '' || this.qrmima == '' || this.name == '' || this.sex == ''){
                this.tishi = true;
                this.message = '请输入完整的信息!';
                return;
            }
            if (this.mima != this.qrmima){
                this.tishi = true;
                this.message = '两次密码不一致!';
                return;
            }
            if (this.zhanghu.length > 11){
                this.tishi = true;
                this.message = '账户不得超过11位!';
                return;
            }
            if (this.mima.length > 20){
                this.tishi = true;
                this.message = '密码不得超过20位!';
                return;
            }
            if (this.name.length > 7){
                this.tishi = true;
                this.message = '姓名不得超过7位!';
                return;
            }
            var pr = {
                zhanghu:this.zhanghu,
                mima:this.mima,
                name:this.name,
                sex:this.sex
            };
            this.$http.post('/api/adduser', pr,{emulateJSON:true})
                .then(function (res) {
                    if (res.data.status == 1){
                        //注册成功，自动跳转到登录页面，同时将账号传到登录页面
                        this.$router.push({
                            path:'/login',
                            query:{
                                zhanghu:this.zhanghu
                            }
                        });
                    }
                    else {
                        this.tishi = true;
                        this.message = res.data.message;
                    }
                })
                .catch(function (err) {
                    this.tishi = true;
                    this.message = '注册失败!';
                });
        }
    }
}
</script>


<style>

</style>