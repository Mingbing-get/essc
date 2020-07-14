<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="img"
                    label="图片">
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
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="pingtai"
                    label="显示平台">
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="adddata">添加数据</el-button>
        </div>
        <el-dialog title="修改轮播图信息" :visible.sync="dialogFormVisible">
            <el-form :model="temp">
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <!--<el-input v-model="temp.img" autocomplete="off"></el-input>-->
                    <el-upload
                            action="/saveimage"
                            list-type="picture-card"
                            accept="image/*"
                            name="lbt"
                            :limit="1"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleDeleteimg"
                            :on-success="sccg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="temp.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="temp.discription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="temp.status" placeholder="请选择活动区域">
                        <el-option label="展示" value="展示"></el-option>
                        <el-option label="不展示" value="不展示"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台" :label-width="formLabelWidth">
                    <el-select v-model="temp.pingtai" placeholder="请选择活动区域">
                        <el-option label="pc" value="pc"></el-option>
                        <el-option label="phone" value="phone"></el-option>
                        <el-option label="pc,phone" value="pc,phone"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="xiugai">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加轮播图数据" :visible.sync="addVisible">
            <el-form :model="temp">
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <!--<el-input v-model="temp.img" autocomplete="off"></el-input>-->
                    <el-upload
                            action="/saveimage"
                            list-type="picture-card"
                            accept="image/*"
                            name="lbt"
                            :limit="1"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleDeleteimg"
                            :on-success="sccg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="temp.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="temp.discription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="temp.status" placeholder="请选择活动区域">
                        <el-option label="展示" value="展示"></el-option>
                        <el-option label="不展示" value="不展示"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台" :label-width="formLabelWidth">
                    <el-select v-model="temp.pingtai" placeholder="请选择活动区域">
                        <el-option label="pc" value="pc"></el-option>
                        <el-option label="phone" value="phone"></el-option>
                        <el-option label="pc,phone" value="pc,phone"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="adddb">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import Vue from 'vue';
    export default {
        data(){
            return {
                tableData:[],
                dialogFormVisible : false,
                addVisible:false,
                index:0,
                formLabelWidth: '120px',
                temp:{},
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        created : function () {
            this.$http.get('/getlunbo')
                .then(function (result) {
                    if (result.data.status == 1){
                        this.tableData = result.data.data;
                        this.tableData.forEach(value => {
                           var temp = value.image.split('/');
                           value.img = temp[temp.length-1];
                        });
                    }
                })
                .catch(function (err) {

                });
        },
        methods : {
            handleEdit(index){
                this.index = index;
                this.temp = {...this.tableData[index]};
                this.dialogFormVisible = true;
            },
            handleDelete(index){
                this.$http.get('/deletelunbo?inid='+this.tableData[index].inid)
                    .then(function (result) {
                        if (result.data.status == 1){
                            this.tableData.splice(index,1);
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                        }
                        else {
                            this.$message.error('删除失败!');
                        }
                    })
                    .catch(function (err) {
                        this.$message.error('删除失败!');
                    });
            },
            xiugai(){
                //准备数据
                var tempimage = this.temp.image.split('/');
                tempimage[tempimage.length-1] = this.temp.img;
                this.temp.image = tempimage.join('/');
                var data = {};
                for (var key in this.temp){
                    if (key == 'img')
                        continue;
                    data[key] = this.temp[key];
                }
                //请求数据
                this.$http.post('/updatelunbo', data, {emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status == 1){
                            Vue.set(this.tableData, this.index, this.temp);//使用这样的方法设置数组改变，才会刷新页面
                            // this.tableData[this.index] = this.temp;
                            // this.$forceUpdate();
                            this.dialogFormVisible = false;
                        }
                        else
                            this.$message.error('修改失败!');
                    })
                    .catch(function (err) {
                        this.$message.error('修改失败!');
                    });
            },
            adddata(){
                this.temp = {
                    status:'展示',
                    pingtai:'pc.phone'
                };
                this.addVisible = true;
            },
            adddb(){
                //检查数据的正确性
                if (!this.temp.discription || !this.temp.img || !this.temp.pingtai || !this.temp.status || !this.temp.title){
                    this.$message.error('数据不全!');
                    return;
                }
                var data = {};
                for (var key in this.temp){
                    if (key == 'img')
                        continue;
                    data[key] = this.temp[key];
                }
                data.image = '/public/static/image/'+this.temp.img;
                this.$http.post('/savelunbo', data, {emulateJSON:true})
                    .then(function (result) {
                        if (result.data.status == 1){
                            Vue.set(this.tableData, this.tableData.length, this.temp);//使用这样的方法设置数组改变，才会刷新页面
                            this.addVisible = false;
                        }
                        else
                            this.$message.error(result.data.message);
                    })
                    .catch(function (err) {
                        this.$message.error('添加失败!');
                    });
                this.addVisible = false;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDeleteimg(){
                this.temp.img = null;
            },
            sccg(response, file, fileList){
                var path = file.response.path.replace(/\\/g,'/');
                path = path.split('/');
                this.temp.img = path[path.length-1];
            }
        }
    }
</script>


<style scoped lang="less">

</style>