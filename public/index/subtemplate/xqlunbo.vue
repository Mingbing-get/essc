<template>
    <div class="lunbo-container">
        <div id="carouselExampleCaptions" class="carousel xq slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="(item, index) in images" data-target="#carouselExampleCaptions" :data-slide-to="index" :class="[index==0?'active':'']"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item " v-for="(item,index) in images" :key="index" :class="[index==0?'active':'']">
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
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.min.js';
    export default {
        data() {
            return {
                images:[]
            };
        },
        created : function () {
            this.images = this.$route.query.images;
            $('.xq').carousel();
        },
        methods : {

        }
    }
</script>


<style scoped lang="less">
    .lunbo-container {
        background-color: #eee;
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
    /*@media (max-width: 500px) {*/
        /*.lunbo-container {*/
            /*img {*/
                /*width: 80%;*/
            /*}*/
        /*}*/
    /*}*/
    /*@media (max-width: 400px) {*/
        /*.lunbo-container {*/
            /*img {*/
                /*width: 100%;*/
            /*}*/
        /*}*/
    /*}*/
</style>