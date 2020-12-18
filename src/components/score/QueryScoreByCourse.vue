<template>

    <div>

        <el-row>
            <el-col :span="8">
                <el-input prefix-icon="el-icon-user" v-model.number.trim="inputCID" placeholder="请按课程号搜索课程"
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
                v-if="scores!=null"
                :data="scores.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="student.sid"
                    label="学号"
                    sortable
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
                    sortable
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
        name: "QueryScoreByCourse",
        data(){
            return {
                inputCID:"",

                courseMap:null,
                scores:null,

                currentPage:1,
                pageSize:10,
                totalSize: 0,

            }
        },
        methods:{
            handleQuery(){

                this.inputCID = this.inputCID+"";
                if(this.inputCID.length){


                    const api = '/api/scores-by-course/'+this.inputCID;

                    getRequest(api)
                    .then(res=>{

                        let course = res.data.course;

                        this.courseMap = new Map();

                        this.courseMap.set("课程号",course.cid);
                        this.courseMap.set("课程名",course.cname);
                        this.courseMap.set("学分",course.credit);
                        this.courseMap.set("属性",course.prop);


                        let scores = res.data.scores;

                        for(let dt of scores) {
                            dt.GPA = ""+(dt.score>60 ?dt.score/10-5:0);
                        }
                        // console.log(scores);

                        this.scores = scores;
                        this.totalSize = scores.length;


                    })
                    .catch(()=>{
                        alert("内部错误");
                    })


                }else{
                    this.$message.warning("请输入课程号");
                }

            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 16px;
    }

    .item {
        margin-bottom: 10px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

</style>