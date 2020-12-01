<template>
    <el-card class="container">
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="上传学生照片">
                    <UpLoadImage ref='UpLoadImage'></UpLoadImage>
                </el-form-item>

                <el-form-item label="学号" prop="sid">
                    <el-input v-model.number="ruleForm.sid"></el-input>
                </el-form-item>

                <el-form-item label="登录密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" placeholder="学生登录密码默认为 123 ,您不能修改" disabled></el-input>
                </el-form-item>


                <el-form-item label="姓名" prop="sname">
                    <el-input v-model="ruleForm.sname" placeholder="学生姓名"></el-input>
                </el-form-item>


                <el-form-item label="性别" prop="gender">
                    <el-col :span="8">
                        <el-select v-model="ruleForm.gender" placeholder="请选择学生性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="专业名称" prop="profession">
                    <el-col :span="8">
                        <el-select v-model="ruleForm.profession" placeholder="请选择学生专业">
                            <el-option label="软件工程" value="软件工程"></el-option>
                            <el-option label="信息与计算科学" value="信息与计算科学"></el-option>
                            <el-option label="工程力学" value="工程力学"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>


                <el-form-item label="院系" prop="faculty">
                    <el-col :span="8">
                        <el-select v-model="ruleForm.faculty" placeholder="请选择学生所属院系">
                            <el-option label="软件学院" value="软件学院"></el-option>
                            <el-option label="数学院" value="数学院"></el-option>
                            <el-option label="土建学院" value="土建学院"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>


                <el-form-item label="年级" prop="grade">
                    <el-col :span="8">
                        <el-input-number v-model="ruleForm.grade" @change="" :min="2000" :max="2040"
                                         label="年级"></el-input-number>
                    </el-col>
                </el-form-item>


                <el-form-item label="班级" prop="s_class">
                    <el-input v-model="ruleForm.s_class" placeholder="输入学生所在班级，如： 软工1班"></el-input>
                </el-form-item>


                <el-form-item label="电话" prop="phone">
                    <el-input v-model.number="ruleForm.phone" placeholder="如：156xxxx0123"></el-input>
                </el-form-item>

                <el-form-item label="政治面貌" prop="politics_status">
                    <el-col :span="8">
                        <el-select v-model="ruleForm.politics_status" placeholder="请选择学生的政治面貌">
                            <el-option label="共青团员" value="共青团员"></el-option>
                            <el-option label="共产党员" value="共产党员"></el-option>
                            <el-option label="入党积极分子" value="入党积极分子"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="籍贯" prop="address">
                    <el-input v-model="ruleForm.address" placeholder="如:山东省济南市高新区xxxx"></el-input>
                </el-form-item>


                <el-form-item label="出生日期" prop="birth">
                    <el-col :span="8">
                        <el-date-picker v-model="ruleForm.birth" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>

</template>


<script>
    import {postRequest} from "../../utils/api";
    import UpLoadImage from "../UpLoadSingleImage";

    export default {
        name: "AddSingleStudent",
        data() {
            return {
                ruleForm: {
                    sid: null,
                    pwd: '123',
                    sname: null,
                    gender: null,
                    birth: '2000-01-01',
                    profession: null,
                    faculty: null,
                    s_class: null,
                    grade: 2020,
                    phone: null,
                    politics_status: null,
                    address: null
                },
                rules: {
                    sid: [
                        {required: true, message: '请输入学生的学号，学号为12位纯数字', trigger: 'blur'},
                        {type: 'number', message: '学号必须为纯数字'},
                    ],
                    phone: [
                        {required: false, message: '请输入学生的学号，学号为12位纯数字', trigger: 'blur'}
                    ]
                }
            };
        },
        components: {
            UpLoadImage
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const api = '/api/student';


                        let head_url = this.$refs['UpLoadImage'].getURL();


                        let student = {
                            sid: this.ruleForm.sid,           // 学号
                            pwd: this.ruleForm.pwd,         // 密码
                            sname: this.ruleForm.sname,       // 姓名
                            gender: this.ruleForm.gender,    // 数据库用枚举类型
                            birth: this.ruleForm.birth,     // 格式为：1999-09-05
                            profession: this.ruleForm.profession,  // 专业
                            faculty: this.ruleForm.faculty,    // 院系
                            s_class: this.ruleForm.s_class,     //班级
                            grade: this.ruleForm.grade,       // 年级
                            phone: this.ruleForm.phone,       // 电话
                            politics_status: this.ruleForm.politics_status,// 政治面貌
                            address: this.ruleForm.address,     //籍贯
                            head_url: head_url                  //头像url
                        }



                        console.log("头像url:  " + head_url);

                        postRequest(api, student)
                            .then(response => {
                                if (response.status == 201) {

                                    this.$notify.success({
                                        title: '成功！',
                                        message: response.data.message,
                                    });

                                } else if (response.status == 202) {
                                    this.$notify.warning({
                                        title: '警告！',
                                        message: response.data.message
                                    });
                                }
                            }).catch(response => {
                            console.log(response);
                            this.$notify.error({
                                title: '错误！',
                                message: "内部错误"
                            });
                        })

                    } else {
                        this.$message.error('学生的学号为必填项');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log("重置");
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .container {
        clear: both;
    }

</style>