<template>
    <div class="dditem-container">
        <div class="media">
            <img :src="itemdata.images[0]" class="mr-3">
            <div class="media-body">
                <h4 class="mt-0">{{ itemdata.title }}</h4>
                <h5 class="mt-1">{{ itemdata.count }}件</h5>
            </div>
        </div>
        <div class="price">￥{{ itemdata.price }}</div>
    </div>
</template>


<script>
export default {
    data(){
        return{

        };
    },
    props:['itemdata']
}
</script>


<style scoped lang="less">
.dditem-container {
    height: 80px;
    background-color: #fff;
    padding: 5px;
    display: block;
    border-radius: 5px;
    border-bottom: 1px solid #ccc;
    .media {
        float: left;
        img {
            margin: 10px 5px;
            height: 50px;
        }
        .media-body {
            margin-top: 19px;
        }
    }
    .price {
        color: indianred;
        font-size: 20px;
        margin-top: 30px;
        float: right;
    }
}
</style>