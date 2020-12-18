<template>
    <el-container class="home_container">

        <!-- 顶部导航 -->
        <el-header class="head"><StudentHeadBar></StudentHeadBar></el-header>

        <el-container>
            <!-- 侧边栏导航 -->
            <el-aside><StudentSideBar></StudentSideBar></el-aside>

            <!-- 中间主界面 -->

            <el-main>
                <router-view></router-view>
            </el-main>


        </el-container>


        <el-footer><BottomBar></BottomBar></el-footer>


    </el-container>

</template>

<script>
    import StudentSideBar from "../../components/student_module/StudentSideBar";
    import StudentHeadBar from "../../components/student_module/StudentHeadBar";
    import BottomBar from "../../components/BottomBar";
    export default {
        name: "StudentHome",
        components:{
            StudentSideBar,
            StudentHeadBar,
            BottomBar
        }
    }
</script>

<style scoped>

    .home_container {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }


    .head {
        display: flex;
        align-items: center;
    }


</style>