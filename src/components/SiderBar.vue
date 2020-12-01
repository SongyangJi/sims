<template>
    <el-container>
        <el-aside width="250px" class="aside_container">

            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    router
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>学生信息</span>
                    </template>
                    <el-menu-item-group style="float: right">

                        <el-menu-item index="/home/add-students">
                            导入学生信息
                        </el-menu-item>

                        <el-menu-item index="/home/display-students">
                            查看学生信息
                        </el-menu-item>

                    </el-menu-item-group>

                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>教学课程</span>
                    </template>
                    <el-menu-item-group style="float: right">

                        <el-menu-item index="/home/add-courses">
                            添加教学课程
                        </el-menu-item>
                        <el-menu-item index="/home/display-courses">
                            查看教学课程
                        </el-menu-item>

                    </el-menu-item-group>

                </el-submenu>


                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>考试成绩</span>
                    </template>
                    <el-menu-item-group style="float: right">
                        <el-menu-item index="/home/add-score">添加考试成绩</el-menu-item>
                        <el-menu-item index="/home/display-score">统计考试成绩</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-collection"></i>
                        <span>社会成果</span>
                    </template>
                    <el-menu-item-group style="float: right">
                        <el-menu-item index="/home/add-achievement">添加社会成果</el-menu-item>
                        <el-menu-item index="/home/display-achievement">查看社会成果</el-menu-item>
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