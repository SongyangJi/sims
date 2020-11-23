<template>
    <el-container>
        <el-aside width="250px" class="aside_container">

            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>学生信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">
                            <router-link to="/home/add-students" tag="span">导入学生信息</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/home/display-students" tag="span">查看学生信息</router-link>
                        </el-menu-item>
                    </el-menu-item-group>

                    <!--                        二级菜单                       -->
                    <!--                        <el-submenu index="1-4">-->
                    <!--                            <template slot="title">选项4</template>-->
                    <!--                            <el-menu-item index="1-4-1">选项1</el-menu-item>-->
                    <!--                        </el-submenu>-->

                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>教学课程</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">添加教学课程</el-menu-item>
                        <el-menu-item index="2-2">查看教学课程</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>


                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>考试成绩</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">添加考试成绩</el-menu-item>
                        <el-menu-item index="3-2">统计考试成绩</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-collection"></i>
                        <span>社会成果</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1">添加社会成果</el-menu-item>
                        <el-menu-item index="4-2">查看社会成果</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>

        </el-aside>
    </el-container>
</template>

<script>
    export default {
        name: "siderbar",
        methods:{
            handleOpen(){

            },
            handleClose(){

            },
        }
    }
</script>

<style scoped>



</style>