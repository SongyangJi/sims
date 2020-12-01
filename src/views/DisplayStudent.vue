<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="所有学生" name="DisplayAllStudents">
            <DisplayAllStudents ref="DisplayAllStudents"></DisplayAllStudents>
        </el-tab-pane>

        <el-tab-pane label="查询学生" name="second">
            <SearchStudent></SearchStudent>
        </el-tab-pane>

    </el-tabs>

</template>

<script>
    import DisplayAllStudents from "../components/students/DisplayAllStudents";
    import SearchStudent from "../components/students/SearchStudent";
    export default {
        name: "DisplayStudent",
        data(){
            return {
                activeName:'DisplayAllStudents'
            }
        },
        methods:{
            handleClick(tab){
                // 可以用于热刷新，否则主动刷新页面才向后台请求数据
                console.log(this.activeName);
                if(this.activeName==='DisplayAllStudents') this.$refs[""+this.activeName].refresh();
            }
        },
        components:{
            DisplayAllStudents,
            SearchStudent
        }
    }
</script>

<style scoped>

</style>