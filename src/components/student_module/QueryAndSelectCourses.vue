<template>
    <div>
        <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
                <span>课程列表</span>
            </div>
            <el-table
                    :data="courseData"
                    height="500"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="cid"
                        label="课程号">
                </el-table-column>
                <el-table-column
                        prop="cname"
                        label="课程名">
                </el-table-column>
                <el-table-column
                        prop="credit"
                        label="学分">
                </el-table-column>
                <el-table-column
                        prop="prop"
                        label="课程属性">
                </el-table-column>
                <el-table-column
                        prop="faculty"
                        label="开课学院">
                </el-table-column>
                <el-table-column
                        prop="teacher_name"
                        label="授课老师"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="weeks"
                        label="开课日期">
                </el-table-column>

                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="handleSelect(scope.row)">
                            选课
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
        </el-card>
    </div>
</template>

<script>

    import {getRequest} from "../../utils/api";
    import {postRequest} from "../../utils/api";

    export default {
        name: "DisplayCourse",
        data() {
            return {
                courseData: []
            }
        },
        computed: {},
        mounted() {
            this.refresh();
        },
        methods: {

            refresh() {
                const api = 'api/all-courses';
                getRequest(api)
                    .then(response => {
                        // console.log(response);
                        if (response.status === 200) {
                            this.courseData = response.data;
                            // 添加 weeks 属性
                            for (let c of this.courseData) {
                                c["weeks"] = c.begin + "-" + c.end + "周";
                            }
                        }
                    })
            },
            handleSelect(course){
                const api = 'api/course/'+this.$store.getters.getStudentID+"/"+course.cid;
                console.log(api);

                postRequest(api)
                .then(res=>{
                    if(res.status==201){
                        this.$notify.success({
                            title:'成功',
                            message:'选课成功'
                        })
                    }
                }).catch((res)=>{
                    this.$notify.warning({
                        title:'失败',
                        message:'不能重复选课'
                    })
                })


            }
        }
    }
</script>

<style scoped>

    /*    .clearfix:before,*/
    /*    .clearfix:after {*/
    /*        display: table;*/
    /*        content: "";*/
    /*    }*/

    /*    .clearfix:after {*/
    /*        clear: both*/
    /*    }*/

</style>