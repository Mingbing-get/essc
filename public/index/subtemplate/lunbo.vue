<template>
    <div class="lunbo-container">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="(item, index) in images" data-target="#carouselExampleCaptions" :data-slide-to="index" :class="[index==0?'active':'']"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item " v-for="(item,index) in images" :key="index" :class="[index==0?'active':'']" @click="boxclick(item.title)">
                    <img :src="item.image" class="d-block w-100">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.discription }}</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" data-slide="next">
                <span class="carousel-control-next-icon"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.min.js';
    export default {
    data() {
        return {
            images:[],
            allimages:[],
            oversize:true
        };
    },
    created : function () {
        this.$http.get('/api/lunbo')
            .then(function (result) {
                if (result.data.status == 1){
                    this.allimages = result.data.images;
                    this.init();
                    window.onresize = function () {
                        this.changescreen();
                    }.bind(this);
                }
            })
            .catch(function (err) {

            });
    },
    methods : {
        changescreen(){
            var docWidth = document.body.clientWidth;
            if (docWidth<576 && this.oversize){
                $('.carousel').carousel(0);
                this.setdata(false);
            }
            else if (docWidth>=576 && !this.oversize){
                $('.carousel').carousel(0);
                this.setdata(true);
            }
        },
        setdata(isover){
            this.oversize = isover;
            var temp = [];
            var duankou = isover?'pc':'phone';
            this.allimages.forEach((value, index) => {
                if (value.pingtai.indexOf(duankou) != -1){
                    var newvalue = {};
                    for (var key in value){
                        newvalue[key] = value[key];
                    }
                    temp.push(newvalue);
                }
            });
            this.images = temp;
            this.$forceUpdate();
        },
        init(){
            var docWidth = document.body.clientWidth;
            if (docWidth<576){
                this.setdata(false);
            }
            else if (docWidth>=576){
                this.setdata(true);
            }
            $('.carousel').carousel();
        },
        boxclick(serchtext){
            if (serchtext == '')
                return;
            this.$router.push({
                path:'/serchgoods',
                query:{
                    serchtext:serchtext
                }
            });
        }
    }
}
</script>


<style scoped lang="less">
.lunbo-container {
    margin: 0 15%;
    width: 70%;
    .carousel-indicators {
        margin-bottom: 0;
        bottom: 3%;
        li {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
    }
    .carousel-inner {
        .carousel-item {
            cursor: pointer;
        }
    }
}
@media (max-width: 576px ) {
    .lunbo-container {
        margin: 0;
        width: 100%;
    }
}    
</style>