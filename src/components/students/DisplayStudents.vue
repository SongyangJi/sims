<template>
    <el-table
            :data="studentsData"
            stripe
            border
            height="250"
            style="width: 100%">
        <el-table-column
                fixed
                prop="sid"
                label="学号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="sname"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="gender"
                label="性别"
                width="180">
        </el-table-column>
        <el-table-column
                prop="profession"
                label="专业"
                width="180">
        </el-table-column>
        <el-table-column
                prop="faculty"
                label="院系"
                width="180">
        </el-table-column>
        <el-table-column
                prop="grade"
                label="年级"
                width="180">
        </el-table-column>





    </el-table>
</template>

<script>
    export default {
        name: "DisplayStudents",
        data() {
            return {
                studentsData: []
            }
        },
        methods:{

        },
        mounted() {
            const api = 'api/all-students';
            this.axios.get(api)
            .then(response=>{
                // console.log(response);
                if(response.status===200){
                    this.studentsData = response.data;
                }
            })
        }
    }
</script>

<style scoped>

</style>