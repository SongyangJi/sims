<template>
    <el-container class="home_container">

        <!-- 顶部导航 -->
        <el-header class="head"><HeadBar></HeadBar></el-header>

        <el-container>
            <!-- 侧边栏导航 -->
            <el-aside><SiderBar></SiderBar></el-aside>

            <!-- 中间主界面 -->

            <el-main>
                <router-view></router-view>
            </el-main>


        </el-container>


        <el-footer><BottomBar></BottomBar></el-footer>


    </el-container>
</template>

<script>
    import SiderBar from "../components/SiderBar";
    import HeadBar from "../components/HeadBar";
    import BottomBar from "../components/BottomBar";
    export default {
        name: "Home",
        components:{
            SiderBar,
            HeadBar,
            BottomBar,
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