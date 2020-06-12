<template>
    <div class="gwc-container bg-light">
        <slid v-for="(item,index) in cars" :cargoods="item" :key="index"></slid>
        <div class="jisuan">
            <button class="btn btn-primary" @click="addbuy">立即购买</button>
            <span>￥{{ zongji }}</span>
        </div>
    </div>
</template>


<script>
    import slid from './subtemplate/slid.vue';
    import mui from '../lib/mui/js/mui.min.js';
export default {
    data(){
        return {
            cars:[],
            zongji:0
        };
    },
    beforeCreate : function(){
        if (!localStorage.getItem('isdenglu')){
            window.location.href = '/public/load.html';
        }
    },
    created : function() {
        this.$http.get('/api/getcar?zhanghu='+localStorage.getItem('isdenglu'))
            .then(function (result) {
                if (result.data.status == 1){
                    this.cars = result.data.data;
                    this.cars.forEach(value => {
                        value.images = value.images.split(';');
                    })
                }
            })
            .catch(function (err) {

            });
    },
    methods : {
        addprice(select, price){
            if (select == '是')
                this.zongji = parseInt(this.zongji)+parseInt(price);
        },
        incerceprice(price){
            this.zongji = parseInt(this.zongji)+parseInt(price);
        },
        decerceprice(price){
            this.zongji = parseInt(this.zongji)-parseInt(price);
        },
        delete(id){
            this.$http.get('/api/delectcar?id='+id)
                .then(function (result) {
                    if (result.data.status == 1){
                        var index = this.cars.findIndex(value => {
                            return value.id == id;
                        });
                        if (this.cars[index].select == '是'){
                            //若是选中状态的商品，则需要减去他的价格
                            var total = parseInt(this.cars[index].count)*parseInt(this.cars[index].nowprice);
                            total = Math.floor(total*100)/100;
                            total = total.toFixed(2);
                            this.zongji = parseInt(this.zongji) - parseInt(total);
                            //同时需要修改购物车被选中的数量
                            this.$store.commit('decricecount',parseInt(this.cars[index].count));
                        }
                        this.cars.splice(index, 1);
                    }
                })
                .catch(function (err) {

                });
        },
        addbuy() {
            //做数据的拼接和数据正确性的检测
            var counts = '';
            var goodsids = '';
            var ids = '(';
            var temp = [];
            for (var i = 0; i < this.cars.length; i++){
                if (this.cars[i].cselect == '是'){
                    if (parseInt(this.cars[i].count) < 1){
                        mui.toast('至少购买一件!',{ duration:'购买', type:'div' });
                        return;
                    }
                    counts = counts+this.cars[i].count+',';
                    goodsids = goodsids+this.cars[i].goodsid+',';
                    ids = ids+this.cars[i].id+',';
                }
                else
                    temp.push(this.cars[i]);
            }
            counts = counts.substring(0,counts.length-1);
            goodsids = goodsids.substring(0,goodsids.length-1);
            ids = ids.substring(0,ids.length-1);
            ids = ids + ')';
            var data = {
                userzhanghu:this.$store.state.user.zhanghu,
                goodsids:goodsids,
                counts:counts,
                price:this.zongji
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
                            //若购买成功，则将数据从购物车中删除
                            this.$http.get('/api/delectcarmore?ids='+ids)
                                .then(function (res) {
                                    if (res.data.status == 1){
                                        this.cars = temp;
                                        this.$store.commit('setcarcount',0);
                                        this.zongji = 0;
                                    }
                                })
                                .catch(function (err) {

                                });
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
    components : {
        slid
    }
}
</script>


<style scoped lang="less">
.gwc-container {
    .jisuan {
        width: 450px;
        margin: 0 auto;
        span {
            color: indianred;
        }
    }
}
</style>