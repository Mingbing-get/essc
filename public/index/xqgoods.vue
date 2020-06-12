<template>
<div class="xq-container bg-light">
    <div class="lunbo-container">
        <div id="carouselExampleCaptions" class="carousel xq slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="(item, index) in goods.images" data-target="#carouselExampleCaptions" :data-slide-to="index" :class="[index==0?'active':'']"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item " v-for="(item,index) in goods.images" :key="index" :class="[index==0?'active':'']">
                    <img :src="item" class="d-block">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" data-slide="prev">
                <span class="fa fa-angle-left"></span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" data-slide="next">
                <span class="fa fa-angle-right"></span>
            </a>
        </div>
    </div>
    <div class="content mt-3 pl-3 pr-3 pb-3">
        <p class="price">
            <span class="old">￥{{ goods.price }}</span>
            <span class="now">￥{{ goods.nowprice }}</span>
        </p>
        <p class="discription">{{ goods.discription }}</p>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='parseInt(goods.number)'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" ref="buycount"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
        <div class="btn-group d-block">
            <button type="button" class="btn btn-primary mt-2" @click="addbuy">立即购买</button>
            <button type="button" class="btn btn-primary mt-2" @click="addcar">加购物车</button>
        </div>
        <div class="form-group mt-3">
            <label for="exampleFormControlTextarea1">商品评价</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="content" rows="3" placeholder="请输入您的评价"></textarea>
            <button type="button" class="btn btn-primary btn-block" @click="saveaugment">发表评论</button>
        </div>
        <div class="media mb-3" v-for="(value, index) in augments" :key="index">
            <img :src="value.touxiang" width="40px" height="40px" class="mr-3 rounded-circle">
            <div class="media-body">
                <h4 class="mt-0">
                    {{ value.name }}
                    <span>{{ value.time |  formatdata}}</span>
                </h4>
                {{ value.content }}
            </div>
        </div>
        <p class="text-center" v-show="!ismore">没有更多……</p>
        <button class="btn btn-block btn-primary" v-show="ismore" @click="loaddata">加载更多</button>
    </div>
</div>
</template>


<script>
import 'bootstrap/dist/js/bootstrap.min.js';
import mui from '../lib/mui/js/mui.min.js';
export default {
    data() {
        return {
            goods:{},
            yeshu:1,
            pianyi:0,
            ismore:true,
            augments:[],
            content:''
        }
    },
    created : function () {
        this.$http.get('/api/xqgoods?id='+this.$route.query.goodsid)
            .then(function (result) {
                if (result.data.status == 1){
                    this.goods = result.data.data;
                    this.goods.images = this.goods.images.split(';');
                    mui('.mui-numbox').numbox().setOption('max',parseInt(this.goods.number));//手动设置最大值，否则不生效
                    $('.xq').carousel();
                }
            })
            .catch(function (err) {

            });
            this.loaddata();
    },
    methods : {
        saveaugment() {
            if (this.content == '')
                return;
            if (this.$store.state.user.zhanghu == null || this.$store.state.user.zhanghu == undefined){
                window.location.href = '/public/load.html';
                return;
            }
            var data = {
                goodsid:this.goods.id,
                userzhanghu:this.$store.state.user.zhanghu,
                time:new Date().getTime(),
                content: this.content
            };
            this.$http.post('/api/savesugment',data,{emulateJSON:true})
                .then(function (result) {
                    if (result.data.status == 1){
                        data.touxiang = this.$store.state.user.touxiang;
                        data.name = this.$store.state.user.name;
                        this.augments.unshift(data);
                        this.pianyi++;
                        this.content = '';
                    }
                })
                .catch(function (err) {

                });
        },
        loaddata() {
            this.$http.get('/api/augment?goodsid='+this.$route.query.goodsid+'&yeshu='+this.yeshu+'&pianyi='+this.pianyi)
                .then(function (result) {
                    if (result.data.status == 1){
                        result.data.data.forEach(value => {
                            if (value.touxiang == null || value.touxiang == undefined || value.touxiang == ''){
                                value.touxiang = '/public/static/image/logo.png';
                            }
                            this.augments.push(value);
                        });
                        this.yeshu++;
                        if (result.data.data.length < 10)
                            this.ismore = false;
                    }
                })
                .catch(function (err) {

                });
        },
        addcar() {
            //由于是用mui中的js改变的框中的值，所以不可以利用数据的双向绑定
            var count = parseInt(this.$refs.buycount.value);
            //判断数据的正确性
            if(count <= 0){
                mui.toast('加入购物车失败!',{ duration:'购物车', type:'div' });
                return;
            }
            if (this.$store.state.user.zhanghu == null || this.$store.state.user.zhanghu == undefined){
                window.location.href = '/public/load.html';
                return;
            }
            var data = {
                userzhanghu:this.$store.state.user.zhanghu,
                goodsid:this.goods.id,
                count:count,
                cselect:'是'
            }
            this.$http.post('/api/savecar',data,{emulateJSON:true})
                .then(function (result) {
                    if (result.data.status == 1){
                        mui.toast('加入购物车成功!',{ duration:'购物车', type:'div' });
                        this.$store.commit('incrcecount',count);
                    }
                    else
                        mui.toast('加入购物车失败!',{ duration:'购物车', type:'div' });
                })
                .catch(function (err) {
                    mui.toast('加入购物车失败!',{ duration:'购物车', type:'div' });
                });
        },
        addbuy() {
            //由于是用mui中的js改变的框中的值，所以不可以利用数据的双向绑定
            var count = parseInt(this.$refs.buycount.value);
            //判断数据的正确性
            if(count <= 0){
                mui.toast('加入购物车失败!',{ duration:'购物车', type:'div' });
                return;
            }
            if (this.$store.state.user.zhanghu == null || this.$store.state.user.zhanghu == undefined){
                window.location.href = '/public/load.html';
                return;
            }
            var data = {
                userzhanghu:this.$store.state.user.zhanghu,
                goodsids:this.goods.id,
                counts:count,
                price:parseInt(this.goods.nowprice)*parseInt(count)
            };
            mui.confirm('是否确认购买？','购买提示',['朕再想想','确认购买'],function (e) {
                if (e.index == 0)
                    data.status = '未付款';
                else
                    data.status = '已付款';
                this.$http.post('/api/savedingdan',data,{emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status == 1){
                            mui.toast(result.data.message,{ duration:'购买提示', type:'div' });
                        }
                        else
                            mui.toast(result.data.message,{ duration:'购买提示', type:'div' });
                    })
                    .catch(function (err) {
                        mui.toast('购买失败!',{ duration:'购买提示', type:'div' });
                    });
            }.bind(this),'div')
        }
    },
    filters:{
        formatdata(date){
            var tdate = new Date(date);
            var ta = {
                month:''+(tdate.getMonth()+1),
                date:''+tdate.getDate(),
                hours:''+tdate.getHours(),
                minutes:''+tdate.getMinutes(),
                seconds:''+tdate.getSeconds()
            };
            for (var key in ta){
                if (ta[key].length >= 2)
                    continue;
                ta[key] = '0'+ta[key];
            }
            return tdate.getFullYear()+'-'+ta.month+'-'+ta.date+' '+ta.hours+':' +ta.minutes+':'+ta.seconds;
        }
    }
}
</script>


<style scoped lang="less">
.xq-container {
    .lunbo-container {
        display: flex;
        .xq {
            background-color: #fff;
            margin: auto;
            width: 500px;
            overflow: hidden;
            .carousel-indicators {
                margin-bottom: 0;
                bottom: 3%;
                li {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
            }
            a {
                span {
                    font-size: 30px;
                    font-weight: bold;
                    color: #ccc;
                }
            }
        }
        img {
            width: 50%;
            margin: 0 auto;
        }
    }
    .content {
        max-width: 500px;
        margin: 0 auto;
        .price {
            .old {
                text-decoration-line: line-through;
            }
            .now {
                font-size: 24px;
                color: indianred;
            }
        }
        .media {
            width: 100%;
            .media-body {
                width: 100%;
                font-size: 10px;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                h4 {
                    font-size: 16px;
                    span {
                        margin-left: 10px;
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>