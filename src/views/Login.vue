<template>
    <div>
        <el-form
                ref="loginForm"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
                class="loginContainer">
            <h3 class="loginTitle">学生信息维护系统</h3>

            <el-divider><span style="font-size: 14px;color: #8c8c8c">统一认证中心</span></el-divider>

            <el-form-item prop="username">
                <el-input size="normal" type="text" v-model="loginForm.id" auto-complete="off"
                          placeholder="职工号/学号" clearable prefix-icon="el-icon-user"
                          @keydown.enter.native="login"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input size="normal" type="password" v-model="loginForm.pwd" auto-complete="off"
                          placeholder="密码" prefix-icon="el-icon-lock" @keydown.enter.native="login" show-password
                          clearable></el-input>
            </el-form-item>

            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 40%;border: none" v-on:click="student_login">学生登录</el-button>
                <el-button type="success" style="width: 40%;border: none" v-on:click="login">教师登录</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>


<script>
    import {postRequest} from "../utils/api";

    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    id: '',
                    pwd: ''
                },
                responseResult: []
            }
        },
        methods: {
            login() {
                const api = 'api/login';
                postRequest(api, {
                    aid: this.loginForm.id,
                    pwd: this.loginForm.pwd
                })
                    .then(response => {
                        if (response.status == 201) {
                            // 在 store 的 state存储 状态
                            this.$store.commit('login', this.loginForm);
                            this.$router.replace({path: '/home'});
                        } else {
                            alert("密码错误！");
                        }
                    })
                    .catch(res => {
                        this.console.log("内部错误");
                    })
            },
            student_login(){
                const api = 'api/student-login';
                let stu = {
                    sid: this.loginForm.id,
                    pwd: this.loginForm.pwd
                };
                console.log(stu);
                postRequest(api,stu)
                .then(res=>{
                    if(res.status==200){
                        this.$message.success("登录成功");
                        this.$store.commit('student_login', this.loginForm);
                        this.$router.replace({path: '/student-home'});
                    }else{
                        this.$message.error("此学生账号密码不匹配");
                    }
                })
                .catch(res=>{

                })
            }
        }
    }
</script>

<style scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        width: 350px;
        margin: 30px auto;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

</style>
