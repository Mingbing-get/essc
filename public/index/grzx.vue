<template>
    <div class="grzx-container">
        <div class="alert alert-danger mb-3" v-show="tishi">
            {{ message }}
            <button type="button" class="close" @click="tishi=!tishi">
                <span >&times;</span>
            </button>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="zhanghao" class="col-sm-2 col-lg-1 col-form-label">账号:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="text" class="form-control" id="zhanghao" v-model="tempuser.zhanghu" disabled>
            </div>
        </div>
        <div class="form-group myupload row pr-3 pl-3 pr-md-5 pl-md-5">
            <label class="col-sm-2 col-lg-1 col-form-label">头像:</label>
            <div class="col-sm-10 col-lg-11 text-center">
                <label for="touxiang">
                    <div :style="{backgroundImage: 'url('+tempuser.touxiang+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                </label>
                <input type="file" name="touxiang" id="touxiang" ref="tx" @change="changetx" accept="image/*">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="name" class="col-sm-2 col-lg-1 col-form-label">姓名:</label>
            <div class="col-sm-7 col-md-8 col-lg-9">
                <input type="text" class="form-control" id="name" v-model="tempuser.name" :disabled = "disname">
            </div>
            <button class="btn btn-primary col-sm-3 col-md-2 ml-3 mr-3 ml-sm-0 mr-sm-0 mt-2 mt-sm-0" @click="disname = !disname">编辑姓名</button>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label class="col-sm-2 col-lg-1 col-form-label">性别:</label>
            <div class="col-sm-7 col-md-8 col-lg-9">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sex" id="inlineRadio1" value="男"  v-model="tempuser.sex" :disabled="dissex">
                    <label class="form-check-label" for="inlineRadio1">男</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sex" id="inlineRadio2" value="女"  v-model="tempuser.sex" :disabled="dissex">
                    <label class="form-check-label" for="inlineRadio2">女</label>
                </div>
            </div>
            <button class="btn btn-primary col-sm-3 col-md-2 ml-3 mr-3 ml-sm-0 mr-sm-0 mt-2 mt-sm-0" @click="dissex = !dissex">修改性别</button>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="birthday" class="col-sm-2 col-lg-1 col-form-label">生日:</label>
            <div class="col-sm-7 col-md-8 col-lg-9">
                <input type="date" class="form-control" id="birthday" v-model="tempuser.birthday" :disabled="disbir">
            </div>
            <button class="btn btn-primary col-sm-3 col-md-2 ml-3 mr-3 ml-sm-0 mr-sm-0 mt-2 mt-sm-0" @click="disbir=!disbir">修改生日</button>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="mima" class="col-sm-2 col-lg-1 col-form-label">密码:</label>
            <div class="col-sm-7 col-md-8 col-lg-9">
                <input type="password" class="form-control" id="mima" v-model="tempuser.mima" :disabled="dismima">
            </div>
            <button class="btn btn-primary col-sm-3 col-md-2 ml-3 mr-3 ml-sm-0 mr-sm-0 mt-2 mt-sm-0" @click="dismima=!dismima">修改密码</button>
        </div>
        <button class="btn btn-primary btn-block" @click="xiugai">确认修改</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            tempuser:{},
            disname:true,
            dissex:true,
            dismima:true,
            disbir:true,
            tishi:false,
            message:''
        };
    },
    beforeCreate : function() {
        if (!localStorage.getItem('isdenglu')){
            this.$router.push({path:'/essc'});
        }
    },
    created : function() {
        this.init();
    },
    watch : {
        "$store.state.user" : function () {
            this.init();
        }
    },
    methods : {
        init () {
            for (var key in this.$store.state.user) {
                this.tempuser[key] = this.$store.state.user[key];
            }
            //处理生日的格式
            if (this.tempuser.birthday){
                this.tempuser.birthday = this.tempuser.birthday.substring(0,10);
            }
            this.tempuser.mima = '';//密码不展示出去
            this.$forceUpdate();//当数据改变时，强制刷新，否则数据不会渲染
        },
        changetx () {
            var tx = this.$refs.tx.files[0];
            var formdata = new FormData();
            formdata.append('touxiang',tx);
            this.$http.post('/api/touxiang',formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (result) {
                if (result.data.status == 0){
                    this.tishi = true;
                    this.message = result.data.message;
                    return;
                }
                var path = result.data.path.replace(/\\/g,'/');
                this.tempuser.touxiang = '/'+path;
                this.$forceUpdate();
            }).catch(function (err) {
                this.tishi = true;
                this.message = '上传图片失败!';
            });
        },
        xiugai (){
            //验证数据的正确性
            if (this.tempuser.zhanghu == '' || this.tempuser.name == '' || this.tempuser.sex == ''){
                this.tishi = true;
                this.message = '请输入完整的信息!';
                return;
            }
            if (this.tempuser.zhanghu.length > 11){
                this.tishi = true;
                this.message = '账户不得超过11位!';
                return;
            }
            if (this.tempuser.name.length > 7){
                this.tishi = true;
                this.message = '姓名不得超过7位!';
                return;
            }
            if (this.tempuser.mima.length > 20){
                this.tishi = true;
                this.message = '密码不得超过20位!';
                return;
            }

            this.$http.post('/api/updateuser', this.tempuser,{emulateJSON:true})
                .then(function (res) {
                    if (res.data.status == 1){
                        //修改成功，刷新数据,并且自动跳转到二手商城的页面上
                        for (var key in this.tempuser) {
                            if (key == 'mima')
                                continue;
                            this.$store.state.user[key] = this.tempuser[key];
                        }
                        this.$router.push({ path:'/essc' });
                    }
                    else {
                        this.tishi = true;
                        this.message = res.data.message;
                    }
                })
                .catch(function (err) {
                    this.tishi = true;
                    this.message = '修改失败!';
                });
        }
    }
}
</script>


<style scoped lang="less">
.grzx-container {
    .myupload {
        div {
            div {
                display: inline-block;
                background-repeat: no-repeat;
                background-size:cover;
                background-position:center;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                &:hover {
                    img {
                        display: block;
                    }
                }
                img {
                    margin-left: 10px;
                    margin-top: 10px;
                    background-color: #eee;
                    opacity: 0.4;
                    border-radius: 50%;
                    display: none;
                }
            }
            input {
                display: none;
            }
        }
    }
}
</style>