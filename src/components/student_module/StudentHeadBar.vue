<template>
    <div class="head">
        <div class="head-title">学生信息管理系统</div>
        <div>
            <el-dropdown @command="handleCommand">
                <div>
                    管理<i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="center">我的信息</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
    export default {
        name: "StudentHeadBar",
        methods: {
            handleCommand(cmd){
                console.log(cmd);
                if (cmd == 'center'){
                    this.$router.replace({path: '/student-home/center'});
                }else if(cmd == 'logout'){
                    window.sessionStorage.removeItem('student')
                    this.$router.replace({path: '/login'});
                }
            }
        }
    }
</script>

<style scoped>

    .head{
        flex: 1;
        text-align: right;
        justify-content: space-between;
    }

    .head-title{
        color: #049EFF;
        font-size: 20px;
    }


</style>