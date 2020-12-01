<template>
    <div>
        <el-dialog title="学生照片" :visible.sync="photo.state">
            <div>
                <el-image :src="photo.src"></el-image>
            </div>
        </el-dialog>

        <el-table
                :data="studentsData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="sid"
                    label="学号"
            >
            </el-table-column>
            <el-table-column
                    prop="sname"
                    label="姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
            >
            </el-table-column>
            <el-table-column
                    prop="profession"
                    label="专业"
            >
            </el-table-column>
            <el-table-column
                    prop="faculty"
                    label="院系"
            >
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="年级"
            >
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleDisplay(scope.$index, scope.row)">查看照片
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :total="totalSize"
                @current-change.passive="currentChange">
        </el-pagination>
    </div>


</template>

<script>
    import {getRequest} from "../../utils/api";

    export default {
        name: "DisplayAllStudents",
        data() {
            return {
                photo:{
                    state:false,
                    src:''
                },
                pageSize: 10,
                currentPage: 1,
                totalSize: 0,
                studentsData: []
            }
        },
        methods: {
            currentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            refresh() {
                const api = 'api/all-students';
                getRequest(api)
                    .then(response => {
                        // console.log(response);
                        if (response.status === 200) {
                            this.studentsData = response.data;
                            this.totalSize = this.studentsData.length;
                            // console.log(this.totalSize);
                        }
                    })
            },
            handleDisplay(index, row){
                // console.log(index, row);
                let idx = this.pageSize*(this.currentPage-1)+index;
                // console.log(this.studentsData[idx]);
                this.photo.state = true;
                this.photo.src = this.studentsData[idx].head_url;
            }
        },
        mounted() {
            const api = 'api/all-students';
            getRequest(api)
                .then(response => {
                    // console.log(response);
                    if (response.status === 200) {
                        this.studentsData = response.data;
                        this.totalSize = this.studentsData.length;
                        // console.log(this.totalSize);
                    }
                })
        }
    }
</script>

<style scoped>

</style>