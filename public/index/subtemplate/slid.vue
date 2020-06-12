<template>
    <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
            <div class="mui-switch mui-switch-mini mui-switch-blue " :class="cargoods.cselect=='是'?'mui-active':''" @click="switchtg" ref="sw">
                <div class="mui-switch-handle"></div>
            </div>
            <div class="media">
                <img :src="cargoods.images[0]" class="mr-3">
                <div class="media-body">
                    <h4 class="mt-0">{{ cargoods.title }}</h4>
                    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='cargoods.number'>
                        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                        <input class="mui-numbox-input" type="number" ref="buycount" :value="cargoods.count" @change="changecount"/>
                        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                    </div>
                </div>
            </div>
            <div class="mybtn">
                <span>￥{{ total }}</span>
                <button class="btn btn-danger ml-2" @click="deletethis">删除</button>
            </div>
        </div>
    </div>
</template>


<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return {
                total:0
            };
        },
        created:function(){
            this.jisuantotal();
            this.$parent.addprice(this.cargoods.cselect, this.total);
        },
        mounted : function () {
            mui('.mui-switch')['switch']();
            mui('.mui-numbox').numbox().setOption('max',parseInt(this.cargoods.number));
            mui('.mui-scroll-wrapper').scroll({
                scrollY: false, //是否竖向滚动
                scrollX: true, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            });
        },
        methods : {
            deletethis(){
                this.$parent.delete(this.cargoods.id);
            },
            jisuantotal(){
                this.total = parseInt(this.cargoods.count)*parseInt(this.cargoods.nowprice);
                this.total = Math.floor(this.total*100)/100;
                this.total = this.total.toFixed(2);
            },
            changecount(){
                var count = parseInt(this.$refs.buycount.value);
                if (count < 1 || count > parseInt(this.cargoods.number)){
                    mui.toast('数量小于1或大于最大库存!',{ duration:'购物车', type:'div' });
                    return;
                }
                var data = {
                    count:count,
                    id:this.cargoods.id
                };
                this.$http.post('/pai/updatecar', data, {emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status = 1){
                            var index = this.$refs.sw.classList.value.indexOf('mui-active');
                            var ptotal = this.total;
                            this.total = parseInt(count)*parseInt(this.cargoods.nowprice);
                            this.total = Math.floor(this.total*100)/100;
                            this.total = this.total.toFixed(2);
                            if (index != -1){
                                this.$store.commit('incrcecount',count-parseInt(this.cargoods.count));
                                this.$parent.decerceprice(ptotal);
                                this.$parent.incerceprice(this.total);
                            }
                            this.cargoods.count = count;
                        }
                    })
                    .catch(function (err) {

                    });
            },
            switchtg(){
                var index = this.$refs.sw.classList.value.indexOf('mui-active');
                var data = {
                    id:this.cargoods.id
                };
                if (index == -1)
                    data.cselect='否';
                else
                    data.cselect='是';
                this.$http.post('/pai/updatecar', data, {emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status = 1){
                            if (index == -1){
                                this.$store.commit('decricecount',parseInt(this.cargoods.count));
                                this.$parent.decerceprice(this.total);
                                this.cargoods.cselect = '否';
                            }
                            else {
                                this.$store.commit('incrcecount',parseInt(this.cargoods.count));
                                this.$parent.incerceprice(this.total);
                                this.cargoods.cselect = '是';
                            }
                        }
                    })
                    .catch(function (err) {

                    });
            }
        },
        watch : {
            cargoods:function (newv, oldv) {
                this.jisuantotal();
            }
        },
        props:['cargoods']
    }
</script>


<style scoped lang="less">
    .mui-scroll-wrapper {
        border-radius: 5px;
        margin: 0 auto;
        margin-bottom: 5px;
        max-width: 450px;
        height: 80px;
        position: relative;
        overflow-x: scroll;
        .mui-scroll {
            height: 80px;
            background-color: #fff;
            padding: 5px;
            width: 450px;
            display: block;
            border-radius: 5px;
            .mui-switch {
                margin-top: 15px;
                float: left;
            }
            .media {
                float: left;
                img {
                    margin:10px 5px;
                    height: 50px;
                }
            }
            .mybtn {
                span {
                    color: indianred;
                }
                margin-top: 11px;
                float: right;
            }
        }
    }
</style>