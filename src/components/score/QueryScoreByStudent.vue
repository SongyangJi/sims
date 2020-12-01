<template>

    <div>

        <el-row>
            <el-col :span="8">
                <el-input prefix-icon="el-icon-user" v-model.number.trim="inputSID" placeholder="请输入学生学号查询"
                          @keypress.enter.native="handleQuery"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" icon="el-icon-search" circle @click="handleQuery"></el-button>
            </el-col>
        </el-row>

        <el-divider></el-divider>


        <el-row v-if="student != null && student.sid!=null">
            <el-col :span="12">
                {{"学号： "+(student.sid==null?"":student.sid)}}
            </el-col>
            <el-col :span="12">
                {{"姓名： "+(student.sname==null?"":student.sname)}}
            </el-col>
        </el-row>


        <el-table
                :data="scores.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="course.cid"
                    label="课程号"
            >
            </el-table-column>
            <el-table-column
                    prop="course.cname"
                    label="课程名"
            >
            </el-table-column>
            <el-table-column
                    prop="course.credit"
                    label="学分"
            >
            </el-table-column>
            <el-table-column
                    prop="course.prop"
                    label="属性"
            >
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="分数"
            >
            </el-table-column>

            <el-table-column
                    prop="GPA"
                    label="绩点"
            >
            </el-table-column>

            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">

                    <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row)">更改
                    </el-button>

                    <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>

                </template>
            </el-table-column>

        </el-table>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-form-item label=分数 label-width="120px">
                    <el-input-number v-model="form.sc" :min="0" :max="100" label=""></el-input-number>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit()">确 定</el-button>
            </div>

        </el-dialog>



    </div>


</template>

<script>
    import {getRequest} from "../../utils/api";
    import {putRequest} from "../../utils/api";
    import {deleteRequest} from "../../utils/api";

    export default {
        name: "QueryScoreByStudent",
        data() {
            return {
                inputSID: "",
                //分页
                pageSize: 10,
                currentPage: 1,
                totalSize: 0,
                scores: [],
                student:{
                    sid:null,
                    sname:null
                },
                dialogFormVisible: false,

                form: {
                    sc:'',
                },
                cid:null,

            }
        },
        methods: {
            handleQuery() {
                this.inputSID = this.inputSID+"";
                if(this.inputSID.length){


                    var r = /^\+?[1-9][0-9]*$/;　　//正整数
                    if(!r.test(this.inputSID)){
                        this.$message.warning("输入的学号有误");
                        return;
                    }


                    const api = '/api/scores-by-student/'+this.inputSID;

                    getRequest(api)
                    .then(res=>{
                        // console.log(res);
                        if(res.status==200){

                            this.student = res.data.student;

                            let scores = res.data.scores;

                            if(scores.length==0){
                                this.$notify.info({
                                    title:'提醒',
                                    message:'数据库无此学生的任何成绩',
                                })
                                return;
                            }
                            console.log(scores);
                            // of才是元素, in 只是 index
                            for(let dt of scores) {
                                dt.GPA = ""+(dt.score>60 ?dt.score/10-5:0);
                            }
                            this.scores = scores;

                        }else{
                            this.$notify.error({
                                title:"错误",
                                message: "查询失败",
                            })
                        }
                    })
                    .catch((res)=>{
                        this.$notify.error({
                            title:"错误",
                            message: "查询失败",
                        })
                    })



                }else{
                    this.$message.error("请输入学生学号之后再查询。");
                }
            },

            handleEdit(row){
                this.cid = row.course.cid;
                this.dialogFormVisible = true;
            },

            handleSubmit(){

                let sid = this.inputSID;

                let cid = this.cid;

                let score = this.form.sc;

                const api = '/api/scores/'+cid+"/"+sid+"/"+score;
                console.log(api);

                putRequest(api)
                .then(res=>{
                    if(res.status == 204){
                        this.dialogFormVisible = false;
                        this.$notify.success({
                            title:'成功',
                            message:"该学生的此项成绩已被修改"
                        })
                    }else{
                        this.$notify.error({
                            title:'失败',
                            message:"操作失败"
                        })
                    }
                })
                .catch(()=>{
                    this.$message.error("内部错误");
                })

            },


            remove(row){
                this.$confirm('此操作将永久删除该学生成绩, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.handleRemove(row);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            handleRemove(row){

                let sid = this.inputSID;
                let cid = row.course.cid;

                const api = '/api/scores/'+cid+"/"+sid;
                console.log(api);
                deleteRequest(api)
                .then(res=>{
                    if(res.status == 204){
                        this.$notify.success({
                            title:'成功',
                            message:"该学生的此项成绩已被删除"
                        })
                    }else{
                        this.$notify.error({
                            title:'失败',
                            message:"操作失败"
                        })
                    }
                })
                .catch(()=>{
                    this.$message.error("内部错误");
                })

            }


        },

    }
</script>

<style scoped>

</style>