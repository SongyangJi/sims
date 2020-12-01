<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="导入单个学生" name="">
            <AddSingleStudent></AddSingleStudent>
        </el-tab-pane>

        <el-tab-pane label="导入批量学生" name="second">
            <AddAmountOfStudents></AddAmountOfStudents>
        </el-tab-pane>

    </el-tabs>
</template>

<script>

    import AddSingleStudent from "../components/students/AddSingleStudent";
    import AddAmountOfStudents from "../components/students/AddAmountOfStudents";

    export default {
        name: "AddStudents",
        data(){
            return{
                activeName:''
            }
        },
        methods:{
            handleClick(){

            }
        },
        components:{
            AddSingleStudent,
            AddAmountOfStudents
        }
    }
</script>

<style scoped>

</style>