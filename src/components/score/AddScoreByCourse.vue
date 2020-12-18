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

        <el-divider/>

        <el-card class="box-card" v-if="courseMap">
            <div slot="header" class="clearfix">
                <span>课程信息</span>
            </div>
            <div v-for="item of courseMap.entries()" :key="item[0]" class="text item">
                {{item[0]}} :{{item[1]}}
            </div>
        </el-card>

        <el-divider/>

        <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="courseMap">

            <el-form-item label="学生学号">
                <el-input v-model="formInline.sid" placeholder="输入学生学号"></el-input>
            </el-form-item>

            <el-form-item label="分数">
                <el-input-number v-model="formInline.score" :precision="1" :step="0.5" :min="0" :max="100"></el-input-number>
<!--                <el-input-number v-model="formInline.score" controls-position="right" @change="" :min="0" :max="100"></el-input-number>-->
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleAdd">添加</el-button>
            </el-form-item>

        </el-form>

        <el-table
                v-if="scores.length"
                :data="scores.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                border
                style="width: 100%">

            <el-table-column
                    fixed
                    prop="sid"
                    label="学号"
            >
            </el-table-column>

            <el-table-column
                    prop="score"
                    label="分数"
            >
            </el-table-column>

        </el-table>


        <el-button type="success" v-if="courseMap" @click="handleUp">上传</el-button>
        <el-button type="info" v-if="courseMap" @click="handleReset">重置</el-button>




    </div>



</template>

<script>
    import {getRequest} from "../../utils/api";
    import {postRequest} from "../../utils/api";

    export default {
        name: "AddScoreByCourse",
        data(){
            return {
                inputCID:"",
                courseMap:null,

                formInline:{
                    sid:null,
                    score:0,
                },
                scores:[],

                currentPage:1,
                pageSize:10,
                totalSize: 0,

            }
        },
        methods:{

            handleUp(){
                if(this.scores.length>0){
                    for(let sc of this.scores){
                        sc["cid"] = this.inputCID;
                    }

                    console.log(this.scores);
                    const api = '/api/scores';
                    postRequest(api,this.scores)
                    .then(res=>{
                        if(res.status==201){
                            this.$notify.success({
                                title:"成功",
                                message:"成功批量导入学生成绩！"
                            })
                            this.scores = [];
                        }
                    })
                    .catch(res=>{
                        this.$notify.warning({
                            title:"失败",
                            message:"添加学生成绩失败"
                        })
                    })
                }
            },
            handleReset(){
                this.scores = [];
                this.$notify.info({
                    message:"请重新添加学生成绩。"
                })
            },
            handleAdd(){
                if(this.formInline.sid==null){
                    return;
                }

                for(let x of this.scores){
                    if(x.sid == this.formInline.sid){
                        this.$message.warning("不允许重复添加学生分数");
                        return;
                    }
                }

                this.scores.push({
                    sid:this.formInline.sid,
                    score:this.formInline.score+""
                });
                this.formInline.sid = null;
                this.formInline.score = 0;
            },
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


                            this.$message.success("请依次添加学号和该学生的成绩")


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
        mounted() {
            this.$message.info("按照不同科目添加学生成绩。");
        }
    }
</script>

<style scoped>

</style>