<template>
    <div class="head">
        <div class="head-title">学生信息管理系统</div>
        <div>
            <el-dropdown @command="handleCommand">
                <div>
                    管理员<i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="sysMsg">系统消息</el-dropdown-item>
                    <el-dropdown-item command="myHome">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
    export default {
        name: "HeadBar",
        methods: {
            handleCommand(cmd){
                console.log(cmd);
                if (cmd == 'sysMsg'){
                    alert('系统消息')
                }else if(cmd == 'myHome'){
                    alert('个人中心')
                }else if(cmd == 'logout'){
                    alert('退出')
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