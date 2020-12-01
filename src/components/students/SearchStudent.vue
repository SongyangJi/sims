<template>
    <div>

        <el-dialog title="名字匹配的所有学生" :visible.sync="dialog.state">
            <div>
                <el-table :data="dialog.students">
                    <el-table-column property="sid" label="日期"></el-table-column>
                    <el-table-column property="sname" label="姓名" ></el-table-column>
                </el-table>
            </div>
        </el-dialog>

        <el-row>
            <el-col :span="8">
                <el-input prefix-icon="el-icon-user" v-model.number="inputSID" placeholder="请输入学生学号查询"
                          @keypress.enter.native="handleQueryByID"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" icon="el-icon-search" circle @click="handleQueryByID"></el-button>
            </el-col>

            <el-col :span="8">
                <el-input prefix-icon="el-icon-user-solid" v-model="inputName" placeholder="请输入学生姓名模糊查询"
                          @keypress.enter.native="handleQueryName"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-search" circle @click="handleQueryName"></el-button>
            </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-card class="container">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">

                    <el-form-item label="学生证照片">
                        <UpLoadImage ref='UpLoadImage'></UpLoadImage>
                    </el-form-item>

                    <el-form-item label="学号" prop="sid">
                        <el-input v-model.number="ruleForm.sid" :readonly="readonly"></el-input>
                    </el-form-item>

                    <el-form-item label="登录密码" prop="pwd">
                        <el-input v-model="ruleForm.pwd" placeholder="学生登录密码默认为 123 ,您不能修改" disabled></el-input>
                    </el-form-item>


                    <el-form-item label="姓名" prop="sname">
                        <el-input v-model="ruleForm.sname" placeholder="学生姓名" :readonly="readonly"></el-input>
                    </el-form-item>


                    <el-form-item label="性别" prop="gender">
                        <el-col :span="8">
                            <el-select v-model="ruleForm.gender" placeholder="请选择学生性别" :disabled="readonly">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="专业名称" prop="profession">
                        <el-col :span="8">
                            <el-select v-model="ruleForm.profession" placeholder="请选择学生专业" :disabled="readonly">
                                <el-option label="软件工程" value="软件工程"></el-option>
                                <el-option label="信息与计算科学" value="信息与计算科学"></el-option>
                                <el-option label="工程力学" value="工程力学"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>


                    <el-form-item label="院系" prop="faculty">
                        <el-col :span="8">
                            <el-select v-model="ruleForm.faculty" placeholder="请选择学生所属院系" :disabled="readonly">
                                <el-option label="软件学院" value="软件学院"></el-option>
                                <el-option label="数学院" value="数学院"></el-option>
                                <el-option label="土建学院" value="土建学院"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>


                    <el-form-item label="年级" prop="grade" :readonly="readonly">
                        <el-col :span="8">
                            <el-input-number v-model="ruleForm.grade" @change="" :min="2000" :max="2040"
                                             label="年级" :disabled="readonly"></el-input-number>
                        </el-col>
                    </el-form-item>


                    <el-form-item label="班级" prop="s_class">
                        <el-input v-model="ruleForm.s_class" placeholder="输入学生所在班级，如： 软工1班" :readonly="readonly"></el-input>
                    </el-form-item>


                    <el-form-item label="电话" prop="phone">
                        <el-input v-model.number="ruleForm.phone" placeholder="如：156xxxx0123" :readonly="readonly"></el-input>
                    </el-form-item>

                    <el-form-item label="政治面貌" prop="politics_status">
                        <el-col :span="8">
                            <el-select v-model="ruleForm.politics_status" placeholder="请选择学生的政治面貌" :disabled="readonly">
                                <el-option label="共青团员" value="共青团员"></el-option>
                                <el-option label="共产党员" value="共产党员"></el-option>
                                <el-option label="入党积极分子" value="入党积极分子"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="籍贯" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="如:山东省济南市高新区xxxx" :readonly="readonly"></el-input>
                    </el-form-item>


                    <el-form-item label="出生日期" prop="birth">
                        <el-col :span="8">
                            <el-date-picker v-model="ruleForm.birth" type="date" placeholder="选择日期" :readonly="readonly">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>


                    <!--                <el-form-item>-->
                    <!--                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
                    <!--                    <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                    <!--                </el-form-item>-->
                </el-form>

                <el-button type="primary" round @click="handleClick">编辑</el-button>
                <el-button type="success" round @click="submitForm('ruleForm')">更新</el-button>
                <el-button type="danger" round @click="handleRemove">删除</el-button>
            </div>
        </el-card>
    </div>

</template>


<script>
    import {deleteRequest} from "../../utils/api";
    import {getRequest} from "../../utils/api";
    import {putRequest} from "../../utils/api";
    import UpLoadImage from "../UpLoadSingleImage";

    export default {
        name: "SearchStudent",
        data() {
            return {
                readonly:true,
                inputSID: '',  // 输入的学号
                inputName: '',  // 输入的姓名

                dialog: {
                    state:false,
                    students:[]
                },

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
                    address: null,
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
                if(this.readonly){
                    this.$message.warning("当前状态只读！");
                    return;
                }
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

                        putRequest(api, student)
                            .then(response => {
                                if (response.status == 204) {

                                    this.$notify.success({
                                        title: '成功！',
                                        message: '学生信息修改成功',
                                    });

                                } else if (response.status == 202) {
                                    this.$notify.warning({
                                        title: '警告！',
                                        message: '操作失败'
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
            // 删除学生操作
            handleRemove() {
                const api = '/api/student/' + this.inputSID;
                deleteRequest(api)
                    .then(res => {
                        if (res.status == 204) {

                            this.$notify.success({
                                title: '成功！',
                                message: '该学生已被移除',
                            });

                        } else {

                            this.$notify.error({
                                title: '失败',
                                message: '操作无效',
                            });

                        }
                    })

            },

            handleClick(){
                this.readonly = !this.readonly;
            },

            // 根据姓名查询学生

            handleQueryName() {

                let qs = this.inputName;
                if (qs.trim().length == 0) {
                    this.$message.error('请输入姓名！');
                    return;
                }
                const api = '/api/student-name/' + this.inputName;

                getRequest(api)
                    .then(res => {
                        if (res.status == 200) {

                            // console.log("to  ",res);

                            if (res.data == null || res.data.length == 0) {
                                // console.log("为空：  "+res.data);
                                this.$notify.warning({
                                    title: '警告',
                                    message: '此学生不存在!'
                                })
                                return;
                            }

                            if(res.data.length>1){
                                this.dialog.state = true;
                                this.dialog.students = res.data;
                                return;
                            }

                            if(res.data.length==0){
                                this.$message.warning("没有学生的名字匹配！");
                                return;
                            }

                            let student = res.data[0];


                            this.ruleForm = student;
                            this.$refs['UpLoadImage'].setURL(student.head_url);

                            this.$notify.success({
                                title: '成功',
                                message: '查询学生成功！'
                            })

                        } else if (res.status == 404) {
                            this.$notify.warning({
                                title: '警告',
                                message: '此学生可能不存在'
                            })
                        }
                    })

            },

            // 根据ID查询学生
            handleQueryByID() {



                let qs = this.inputSID + "";
                qs = qs.trim();
                if (qs.length == 0) {
                    this.$message.error('请输入学号!');
                    return;
                }

                var r = /^\+?[1-9][0-9]*$/;　　//正整数
                if(!r.test(qs)){
                    this.$message.warning("输入的学号有误");
                    return;
                }

                // console.log(this.inputSID);
                const api = '/api/student/' + this.inputSID;
                getRequest(api)
                    .then(res => {
                        if (res.status == 200) {

                            // console.log("to  ",res);

                            if (res.data == null || res.data.length == 0) {
                                console.log("为空：  " + res.data);
                                this.$notify.warning({
                                    title: '警告',
                                    message: '此学生不存在!'
                                })
                                return;
                            }

                            this.ruleForm = res.data;
                            let url = res.data.head_url;
                            this.$refs['UpLoadImage'].setURL(url);

                            this.$notify.success({
                                title: '成功',
                                message: '查询学生成功！'
                            })

                        } else if (res.status == 404) {
                            this.$notify.warning({
                                title: '警告',
                                message: '此学生可能不存在'
                            })
                        }
                    })
                    .catch(() => {
                        this.$message.warning("操作失误");
                    })
            }
        }
    }
</script>

<style scoped>

    .container {
        clear: both;
    }

</style>