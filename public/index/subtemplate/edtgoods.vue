<template>
    <div class="edt-container">
        <div class="alert alert-danger mb-3" v-show="tishi">
            {{ message }}
            <button type="button" class="close" @click="tishi=!tishi">
                <span >&times;</span>
            </button>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="title" class="col-sm-2 col-lg-1 col-form-label">商品标题:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="text" class="form-control" id="title" v-model="$route.query.title">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="discription" class="col-sm-2 col-lg-1 col-form-label">商品描述:</label>
            <div class="col-sm-10 col-lg-11">
                <textarea class="form-control" id="discription" rows="3" v-model="$route.query.discription" placeholder="请输入商品描述，最多250字"></textarea>
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="oldprice" class="col-sm-2 col-lg-1 col-form-label">原价:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="number" class="form-control" id="oldprice"  v-model="$route.query.price">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="nowprice" class="col-sm-2 col-lg-1 col-form-label">现价:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="number" class="form-control" id="nowprice"  v-model="$route.query.nowprice">
            </div>
        </div>
        <div class="form-group row pr-3 pl-3 pr-md-5 pl-md-5">
            <label for="number" class="col-sm-2 col-lg-1 col-form-label">数量:</label>
            <div class="col-sm-10 col-lg-11">
                <input type="number" class="form-control" id="number"  v-model="$route.query.number">
            </div>
        </div>
        <div class="form-group myupload row pr-3 pl-3 pr-md-5 pl-md-5">
            <label class="col-sm-2 col-lg-1 col-form-label">样品图:</label>
            <div class="col-sm-10 col-lg-11 text-center">
                <div class="yp">
                    <span v-show="$route.query.images[0]=='/public/static/image/add.png'?false:true" @click.stop="quxiiao(0)">&times;</span>
                    <label for="yp1">
                        <div :style="{backgroundImage: 'url('+$route.query.images[0]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                    </label>
                    <input type="file" name="yp1" id="yp1" ref="yp1" @change="change1" accept="image/*">
                </div>
                <div class="yp">
                    <span v-show="$route.query.images[1]=='/public/static/image/add.png'?false:true" @click.stop="quxiiao(1)">&times;</span>
                    <label for="yp2">
                        <div :style="{backgroundImage: 'url('+$route.query.images[1]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                    </label>
                    <input type="file" name="yp1" id="yp2" ref="yp2" @change="change2" accept="image/*">
                </div>
                <div class="yp">
                    <span v-show="$route.query.images[2]=='/public/static/image/add.png'?false:true" @click.stop="quxiiao(2)">&times;</span>
                    <label for="yp3">
                        <div :style="{backgroundImage: 'url('+$route.query.images[2]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                    </label>
                    <input type="file" name="yp1" id="yp3" ref="yp3" @change="change3" accept="image/*">
                </div>
                <div class="yp">
                    <span v-show="$route.query.images[3]=='/public/static/image/add.png'?false:true" @click.stop="quxiiao(3)">&times;</span>
                    <label for="yp4">
                        <div :style="{backgroundImage: 'url('+$route.query.images[3]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                    </label>
                    <input type="file" name="yp1" id="yp4" ref="yp4" @change="change4" accept="image/*">
                </div>
                <div class="yp">
                    <span v-show="$route.query.images[4]=='/public/static/image/add.png'?false:true" @click.stop="quxiiao(4)">&times;</span>
                    <label for="yp5">
                        <div :style="{backgroundImage: 'url('+$route.query.images[4]+')'}"><img src="/public/static/image/upload.png" alt="" width="80px" height="80px"></div>
                    </label>
                    <input type="file" name="yp1" id="yp5" ref="yp5" @change="change5" accept="image/*">
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="sell">修改商品</button>
    </div>
</template>


<script>
export default {
    data(){
        return {
            tishi:false,
            message:''
        };
    },
    created : function () {
        //处理图片数据
        if (!(this.$route.query.images instanceof Array)){
            this.$route.query.images = this.$route.query.images.split(';');
        }
        var len = this.$route.query.images.length;
        for (var i = 0; i < 5-len; i++){
            this.$route.query.images.push('/public/static/image/add.png');
        }
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
                this.$route.query.images[index] = '/'+path;
                this.$forceUpdate();
            }).catch(function (err) {
                this.tishi = true;
                this.message = '上传图片失败!';
            });
        },
        sell (){
            //检查数据的完整性
            if (this.$route.query.title == '' || this.$route.query.nowprice <= 0 || this.$route.query.number <= 0){
                this.tishi = true;
                this.message = '标题不能为空或价格、数量必须大于0!';
                return;
            }
            if (this.$route.query.discription.length > 250){
                this.tishi = true;
                this.message = '商品描述最多250字!';
                return;
            }
            var flag = false;
            var images = ''
            this.$route.query.images.forEach(value=>{
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
            var data = {};
            for(var key in this.$route.query){
                if (key == 'images')
                    continue;
                data[key] = this.$route.query[key];
            }
            data.images = images;
            this.$http.post('/api/uspategoods', data, {emulateJSON:true})
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
                    this.message = '修改失败!';
                });
        },
        quxiiao(index){
            this.$route.query.images[index] = '/public/static/image/add.png';
            this.$forceUpdate();
        }
    }
}
</script>


<style scoped lang="less">
    .edt-container {
        .myupload {
            .yp {
                position: relative;
                display: inline-block;
                span {
                    position: absolute;
                    top: -15px;
                    left: 0px;
                    font-size: 20px;
                }
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