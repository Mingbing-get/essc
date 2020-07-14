<template>
    <div>
        <el-table
                :data="goodsData"
                style="width: 100%"
                @sort-change="schange">
            <el-table-column
                    prop="id"
                    label="编号"
                    width="50px">
            </el-table-column>
            <el-table-column
                    prop="userzhanghu"
                    width="100px">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="serchtext"
                            size="mini"
                            placeholder="筛选账户"
                            @keyup.enter.native="serchzh"/>
                            <!--这里需要加上native, 否则不生效-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="discription"
                    label="描述">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="原价"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="nowprice"
                    label="现价"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="数量"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="images"
                    label="图片地址"
                    width="150px">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100px"
                             :filters="selectitemobj"
                             :filter-method="filterHandler">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.status" placeholder="请选择" @change="changestatus(scope.$index)">
                        <el-option
                                v-for="(item, index) in selectitem"
                                :key="index"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
    export default {
        data(){
            return{
                goodsData:[],
                selectitem:[],
                selectitemobj:[],
                yeshu : 1,
                serchtext:'',
                ordername:'',
                ordermethod:''
            };
        },
        created : function () {
            //访问服务器，拿到商品状态的可选项
            this.$http.get('/getgoodsstatus')
                .then(function (result) {
                    if (result.data.status == 1){
                        result.data.data.forEach(value=> {
                            this.selectitem.push(value.status);
                            this.selectitemobj.push({
                                text:value.status,
                                value:value.status
                            });
                        });
                    }
                })
                .catch(function (err) {

                })
            //访问服务器，拿到商品数据
            var data = {yeshu:this.yeshu};
            // var data = {yeshu:1,status:'出售'};
            this.getgoodsdata(data);
        },
        methods : {
            schange(e){
                this.ordername = e.prop;
                this.ordermethod = e.order=='descending'?'desc':'asc';
                // 准备数据
                var data = {
                    yeshu:this.yeshu,
                    order:{
                        name:this.ordername,
                        method:this.ordermethod
                    }
                };
                if (this.serchtext != ''){
                    data.userzhanghu = this.serchtext;
                }
                //访问服务器
                this.getgoodsdata(data);
            },
            serchzh(){
                //准备数据
                var data = {
                    yeshu:this.yeshu
                };
                if (this.serchtext != ''){
                    data.userzhanghu = this.serchtext;
                }
                if (this.ordername != ''){
                    data.order = {
                        name:this.ordername,
                        method:this.ordermethod
                    };
                }
                // 访问服务器
                this.getgoodsdata(data);
            },
            filterHandler(value, row, column){
                return row.status == value;
            },
            getgoodsdata(data){
                this.$http.post('/getgoods', data, {emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status == 1)
                            this.goodsData = result.data.data;
                    })
                    .catch(function (err) {

                    })
            },
            changestatus(index){
                var data = {
                    id:this.goodsData[index].id,
                    status:this.goodsData[index].status
                };
                this.$http.post('/updategoods', data, {emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status == 1)
                            this.$message.success('修改成功!');
                        else
                            this.$message.warning('修改失败!');
                    })
                    .catch(function (err) {
                        this.$message.warning('修改失败!');
                    });
            }
        }
    }
</script>


<style scoped lang="less">

</style>