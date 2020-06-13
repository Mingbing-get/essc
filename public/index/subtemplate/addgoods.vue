<template>
    <div class="addgoods-container">
        <div class="alert alert-danger mb-3" v-show="tishi">
            {{ message }}
            <button type="button" class="close" @click="tishi=!tishi">
                <span >&times;</span>
            </button>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="title" class="col-sm-2 col-lg-1 col-form-label">商品标题:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="text" class="form-control" id="title" v-model="biaoti">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="discription" class="col-sm-2 col-lg-1 col-form-label">商品描述:</label>
            <div class="col-sm-10 col-lg-11">
                <textarea class="form-control" id="discription" rows="3" v-model="discription" placeholder="请输入商品描述，最多250字"></textarea>
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="oldprice" class="col-sm-2 col-lg-1 col-form-label">原价:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="number" class="form-control" id="oldprice"  v-model="oldprice">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="nowprice" class="col-sm-2 col-lg-1 col-form-label">现价:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="number" class="form-control" id="nowprice"  v-model="nowprice">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="number" class="col-sm-2 col-lg-1 col-form-label">数量:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="number" class="form-control" id="number"  v-model="gnumber">
            </div>
        </div>
        <div class="form-group myupload row pr-3 pl-3 pr-md-5 pl-md-5">
            <label class="col-sm-2 col-lg-1 col-form-label">样品图:</label>
            <div class="col-sm-10 col-lg-11 text-center">
                <label for="yp1">
                    <div :style="{backgroundImage: 'url('+bgimages[0]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                </label>
                <input type="file" name="yp1" id="yp1" ref="yp1" @change="change1" accept="image/*">
                <label for="yp2">
                    <div :style="{backgroundImage: 'url('+bgimages[1]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                </label>
                <input type="file" name="yp1" id="yp2" ref="yp2" @change="change2" accept="image/*">
                <label for="yp3">
                    <div :style="{backgroundImage: 'url('+bgimages[2]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                </label>
                <input type="file" name="yp1" id="yp3" ref="yp3" @change="change3" accept="image/*">
                <label for="yp4">
                    <div :style="{backgroundImage: 'url('+bgimages[3]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                </label>
                <input type="file" name="yp1" id="yp4" ref="yp4" @change="change4" accept="image/*">
                <label for="yp5">
                    <div :style="{backgroundImage: 'url('+bgimages[4]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                </label>
                <input type="file" name="yp1" id="yp5" ref="yp5" @change="change5" accept="image/*">
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="sell">出售商品</button>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                tishi:false,
                message:'',
                biaoti:'',
                discription:'',
                oldprice:'',
                nowprice:'',
                gnumber:'',
                bgimages:[]
            };
        },
        created : function (){
            for (var i = 0; i < 5; i++)
                this.bgimages.push('/public/static/image/add.png');
        },
        methods : {
            change1(){
                var tx = this.$refs.yp1.files[0];
                this.change(tx,0);
            },
            change2(){
                var tx = this.$refs.yp2.files[0];
                this.change(tx,1);
            },
            change3(){
                var tx = this.$refs.yp3.files[0];
                this.change(tx,2);
            },
            change4(){
                var tx = this.$refs.yp4.files[0];
                this.change(tx,3);
            },
            change5(){
                var tx = this.$refs.yp5.files[0];
                this.change(tx,4);
            },
            change (tx, index) {
                // var tx = this.$refs.tx.files[0];
                var formdata = new FormData();
                formdata.append('yangping',tx);
                this.$http.post('/api/yangping',formdata,{
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
                    this.bgimages[index] = '/'+path;
                    this.$forceUpdate();
                }).catch(function (err) {
                    this.tishi = true;
                    this.message = '上传图片失败!';
                });
            },
            sell (){
                //检查数据的完整性
                if (this.biaoti == '' || this.nowprice <= 0 || this.gnumber <= 0){
                    this.tishi = true;
                    this.message = '标题不能为空或价格、数量必须大于0!';
                    return;
                }
                if (this.discription.length > 250){
                    this.tishi = true;
                    this.message = '商品描述最多250字!';
                    return;
                }
                var flag = false;
                var images = ''
                this.bgimages.forEach(value=>{
                    if (value != '/public/static/image/add.png'){
                        flag = true;
                        images = images+value+';';
                    }
                });
                if (!flag){
                    this.tishi = true;
                    this.message = '至少传入一张图片!';
                    return;
                }
                images = images.substring(0,images.length-1);
                var data = {
                    title:this.biaoti,
                    discription: this.discription,
                    price:this.oldprice,
                    nowprice: this.nowprice,
                    images:images,
                    userzhanghu:this.$store.state.user.zhanghu,
                    number:this.gnumber,
                    status:'出售'
                };
                this.$http.post('/api/addgoods', data, {emulateJSON:true})
                    .then(function (res) {
                        if (res.data.status == 1){
                            //修改成功，刷新数据,并且自动跳转到二手商城的页面上
                            this.$router.push({ path:'/wdsc/history' });
                        }
                        else {
                            this.tishi = true;
                            this.message = res.data.message;
                        }
                    })
                    .catch(function (err) {
                        this.tishi = true;
                        this.message = '展示商品失败!';
                    });
            }
        }
    }
</script>


<style scoped lang="less">
    .addgoods-container {
        .myupload {
            div {
                div {
                    display: inline-block;
                    background-repeat: no-repeat;
                    background-size:cover;
                    background-position:center;
                    width: 100px;
                    height: 100px;
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