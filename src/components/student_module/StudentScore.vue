<template>

    <div>

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

    export default {
        name: "StudentScore",
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

        },
        mounted() {
            let inputSID = this.$store.state.student.id;

            if(inputSID.length){



                const api = '/api/scores-by-student/'+inputSID;

                getRequest(api)
                    .then(res=>{
                        // console.log(res);
                        if(res.status==200){

                            this.student = res.data.student;

                            console.log(res);

                            let scores = res.data.scores;

                            if(scores.length==0){
                                this.$notify.info({
                                    title:'提醒',
                                    message:'数据库无此学生的任何成绩',
                                })
                                return;
                            }
                            console.log('长度',scores.length,scores);

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
        }

    }
</script>

<style scoped>

</style>