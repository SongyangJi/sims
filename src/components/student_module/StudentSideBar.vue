<template>
    <el-container>
        <el-aside width="250px" class="aside_container">

            <el-menu
                    default-active="-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    router
            >

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>教学课程</span>
                    </template>
                    <el-menu-item-group style="float: right">

                        <el-menu-item index="">
                            选课
                        </el-menu-item>
                        <el-menu-item index="/student-home/courses">
                            教学课程列表
                        </el-menu-item>

                    </el-menu-item-group>

                </el-submenu>



                <el-menu-item index="/student-home/my-score">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>考试成绩</span>
                    </template>
                </el-menu-item>

                <el-menu-item index="">
                    <template slot="title">
                        <i class="el-icon-collection"></i>
                        <span>社会成果</span>
                    </template>
                </el-menu-item>


            </el-menu>


        </el-aside>
    </el-container>
</template>

<script>
    export default {
        name: "StudentSideBar",
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