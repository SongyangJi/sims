<template>
    <div>
        <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
                <span>课程列表</span>
            </div>
            <el-table
                    :data="courseData"
                    border
                    :summary-method="getSummaries"
                    show-summary
                    style="width: 100%; margin-top: 20px">
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


            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/api";

    export default {
        name: "DisplayMyCourses",
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
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总修读学分';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '学分';
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            },
            refresh() {
                const api = 'api/course-student/'+this.$store.getters.getStudentID;
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
        }
    }
</script>

<style scoped>

</style>