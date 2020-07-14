<template>
    <div class="load-container">
        <div class="load-body p-2 bg-light">
            <div class="alert alert-danger mb-3" v-show="tishi">
                {{ message }}
                <button type="button" class="close" @click="tishi=!tishi">
                    <span >&times;</span>
                </button>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">账号：</label>
                <input type="email" class="form-control" id="exampleInputEmail1" v-model="zhanghu">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">密码：</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="mima">
            </div>
            <button type="submit" class="btn btn-primary" @click="denglu">登录</button>
        </div>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                zhanghu:'',
                mima:'',
                tishi:false,
                message:''
            };
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
                            localStorage.admi = this.zhanghu;
                            this.$router.push({path:'/shouye'});
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


<style lang="less">
    html, body {
        height: 100%;
    }
    .load-container {
        width: 100%;
        height: 100%;
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        .load-body{
            width: 300px;
            display: flex;
            flex-direction: column;
            border-radius: 6px;
        }
    }
</style>