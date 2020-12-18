<template>
    <div>

        我的信息
        <el-divider></el-divider>

        <el-card class="container">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">


                    <el-form-item label="学生证照片">
                        <el-image :src="url" style="height: 150px;width: 150px;float: left"></el-image>
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

                </el-form>


            </div>
        </el-card>

    </div>

</template>


<script>
    import {getRequest} from "../../utils/api";

    export default {
        name: "MyCenter",
        data() {
            return {
                readonly:true,

                url:'',

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

        methods: {
        },
        mounted() {


            let inputSID = this.$store.getters.getStudentID + "";





            const api = '/api/student/' + inputSID;
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
                        this.url = res.data.head_url;

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
                    this.$message.warning("操作失败");
                })
        }
    }
</script>

<style scoped>

    .container {
        clear: both;
    }

</style>