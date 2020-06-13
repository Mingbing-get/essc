<template>
    <div class="historyitem-container" @click="edtgoods">
        <div class="mui-scroll">
            <div class="media">
                <img :src="goodsitem.images[0]" class="mr-3">
                <div class="media-body">
                    <h4 class="mt-0">{{ goodsitem.title }}</h4>
                    <h5 class="mt-1">{{ goodsitem.number }}件</h5>
                </div>
            </div>
            <div class="mybtn">
                <button class="btn ml-2 " :class="goodsitem.status=='停售'?'btn-primary':'btn-danger'" @click.stop="stopsell">{{ goodsitem.status=='停售'?'出售':'停售' }}</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {

        };
    },
    methods : {
        stopsell(){
            var data = {
                id:this.goodsitem.id,
                status:this.goodsitem.status=='停售'?'出售':'停售'
            };
            this.$http.post('/api/uspategoods', data,{emulateJSON:true})
                .then(function (result) {
                    if (result.data.status == 1){
                        this.goodsitem.status = this.goodsitem.status=='停售'?'出售':'停售';
                    }
                })
                .catch(function (err) {

                });
        },
        edtgoods(){
            this.$router.push({
                path:'/wdsc/edtgoods',
                query:this.goodsitem
            });
        }
    },
    props : ['goodsitem']
}
</script>


<style scoped lang="less">
    .historyitem-container {
        border-radius: 5px;
        margin: 0 auto;
        margin-bottom: 5px;
        max-width: 250px;
        height: 80px;
        position: relative;
        .mui-scroll {
            height: 80px;
            background-color: #fff;
            padding: 5px;
            width: 250px;
            display: block;
            border-radius: 5px;
            .media {
                float: left;
                img {
                    margin:10px 5px;
                    height: 50px;
                }
                .media-body {
                    margin-top: 15px;
                }
            }
            .mybtn {
                margin-top: 11px;
                float: right;
            }
        }
    }
</style>