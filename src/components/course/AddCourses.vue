<template>
    <div>
        <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
                <span>注册课程</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm" :rules="rules">

                <el-form-item label="课程号" prop="cid" >
                    <el-input v-model.number="form.cid" autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="课程名称" prop="cname">
                    <el-input v-model="form.cname"></el-input>
                </el-form-item>

                <el-form-item label="课程属性">
                    <el-col :span="8">
                        <el-select v-model="form.prop" placeholder="请选择课程属性">
                            <el-option label="必修" value="必修"></el-option>
                            <el-option label="限选" value="限选"></el-option>
                            <el-option label="任选" value="任选"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="开科学院">
                    <el-col :span="8">
                        <el-select v-model="form.faculty" placeholder="请选择开课学院">
                            <el-option label="数学院" value="数学院"></el-option>
                            <el-option label="软件学院" value="软件学院"></el-option>
                            <el-option label="计算机学院" value="计算机学院"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="开课老师">
                    <el-input v-model="form.teacher_name"></el-input>
                </el-form-item>

                <el-form-item label="开课日期">
                    <el-col :span="10">
                        <el-input-number v-model="form.begin" controls-position="right" :min="1" :max="5">
                        </el-input-number>
                    </el-col>
                    <el-col class="line" :span="2">——</el-col>
                    <el-col :span="10">
                        <el-input-number v-model="form.end" controls-position="right" :min="13" :max="18">
                        </el-input-number>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import {postRequest} from "../../utils/api";

    export default {
        name: "AddCourse",
        data() {
            return {
                num: 1,
                num1: 16,
                form: {
                    cid: null, // 课程号
                    cname: null, // 课程名称
                    credit: null, // 学分
                    prop: null, // 课程属性 必修 选修 通选
                    faculty: null, // 开课学院
                    teacher_name: null, // 任课老师，可拓展为对象
                    begin: null,
                    end: null
                },
                rules:{
                    cid:[
                        { required: true, message: '课程号不能为空' },
                        { type: 'number', message: '课程号必须为数字值'}
                    ],
                    cname:[
                        { required: true, message: '课程名不能为空' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const api = '/api/course';

                        let course = {
                            cid: this.form.cid, // 课程号
                            cname: this.form.cname, // 课程名称
                            credit: this.form.credit, // 学分
                            prop: this.form.prop, // 课程属性 必修 选修 通选
                            faculty: this.form.faculty, // 开课学院
                            teacher_name: this.form.teacher_name, // 任课老师，可拓展为对象
                            begin: this.form.begin,
                            end: this.form.end
                        }
                        console.log(course);

                        postRequest(api,course)
                        .then(response=>{
                            if(response.status==201){
                                this.$notify.success({
                                    title: '成功！',
                                    message: response.data.message,
                                });
                            }else if (response.status==202){
                                this.$notify.warning({
                                    title: '警告',
                                    message: response.data.message,
                                });
                            }
                        })
                        .catch(response=>{
                            this.$notify.error({
                                title: '失败！',
                                message: "添加课程失败",
                            });
                        })

                    } else {
                        this.$message.error('有必填项未填');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    };
</script>

<style scoped>
    .box-card {
        width: 720px;
    }
</style>