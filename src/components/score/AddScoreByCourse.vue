<template>

    <div>
        <el-row>
            <el-col :span="8">
                <el-input prefix-icon="el-icon-user" v-model.number.trim="inputCID" placeholder="请按课程号添加学生成绩"
                          @keypress.enter.native="handleQuery"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" icon="el-icon-search" circle @click="handleQuery"></el-button>
            </el-col>
        </el-row>



        <el-card class="box-card" v-if="courseMap">
            <div slot="header" class="clearfix">
                <span>课程信息</span>
            </div>
            <div v-for="item of courseMap.entries()" :key="item[0]" class="text item">
                {{item[0]}} :{{item[1]}}
            </div>
        </el-card>


        <el-table
                v-if="scores.length"
                :data="scores.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="student.sid"
                    label="学号"
            >
            </el-table-column>
            <el-table-column
                    prop="student.sname"
                    label="姓名"
            >
            </el-table-column>
            <el-table-column
                    prop = "student.profession"
                    label = "专业"
            >
            </el-table-column>
            <el-table-column
                    prop="student.grade"
                    label="年级"
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



    </div>



</template>

<script>
    import {getRequest} from "../../utils/api";

    export default {
        name: "AddScoreByCourse",
        data(){
            return {
                inputCID:"",
                courseMap:null,

                scores:[],

                currentPage:1,
                pageSize:10,
                totalSize: 0,

            }
        },
        methods:{
            handleQuery(){
                this.inputCID = this.inputCID+"";

                if(this.inputCID.length){


                    console.log(this.inputCID);

                    const api = '/api/course/'+this.inputCID;

                    getRequest(api)
                    .then(res=>{

                        if(res.status == 200){

                            let course = res.data;


                            this.courseMap = new Map();

                            this.courseMap.set("课程号",course.cid);
                            this.courseMap.set("课程名",course.cname);
                            this.courseMap.set("学分",course.credit);
                            this.courseMap.set("属性",course.prop);


                        }else{

                        }

                    })
                    .catch(()=>{

                    })


                }else{
                    this.$message.error("请输入课程号之后再添加学生信息。");
                }
            }
        },

    }
</script>

<style scoped>

</style>