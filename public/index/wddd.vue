<template>
    <div class="wddd-container bg-light">
        <ddbox v-for="item in wfkdata" :key="item.id" :ddboxdata="item" :fukuan="false"></ddbox>
        <ddbox v-for="item in yfkdata" :key="item.id" :ddboxdata="item" :fukuan="true"></ddbox>
    </div>
</template>


<script>
    import mui from '../lib/mui/js/mui.min.js';
    import ddbox from './subtemplate/ddbox.vue';
    export default {
        data(){
            return {
                wfkdata:[],
                yfkdata:[]
            };
        },
        beforeCreate : function(){
            if (!localStorage.getItem('isdenglu')){
                window.location.href = '/public/load.html';
            }
        },
        created : function(){
            this.$http.get('/api/selectdingdan?userzhanghu='+localStorage.getItem('isdenglu'))
                .then(function (result) {
                    if (result.data.status == 1){
                        result.data.data.forEach(value=>{
                            var ids = value.goodsids.split(',');
                            var counts = value.counts.split(',');
                            value.counts = {};
                            for (var i = 0; i < ids.length; i++){
                                value.counts[ids[i]] = counts[i];
                            }
                            if (value.status == '已付款'){
                                this.yfkdata.push(value);
                            }
                            else {
                                this.wfkdata.push(value);
                            }
                        });
                    }
                })
                .catch(function (err) {

                });
        },
        methods : {
            fukuan(id,counts){
                if (this.$store.state.user.zhanghu == null || this.$store.state.user.zhanghu == undefined){
                    window.location.href = '/public/load.html';
                    return;
                }
                var data = {
                    status:'已付款',
                    id:id,
                    counts:JSON.stringify(counts)
                };
                mui.confirm('是否确认购买？','购买提示',['朕再想想','确认购买'],function (e) {
                    if (e.index == 0)
                        return;
                    this.$http.post('/api/updingdan',data,{emulateJSON:true})
                        .then(function (result) {
                            if (result.data.status == 1){
                                this.$router.go(0);
                                // var index = this.wfkdata.findIndex(value => {
                                //     return value.id == id;
                                // });
                                // this.wfkdata[index].status = '已付款';
                                // this.yfkdata.unshift(this.wfkdata.splice(index,1));
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
        components : {
            ddbox
        }
    }

</script>


<style scoped lang="less">

</style>