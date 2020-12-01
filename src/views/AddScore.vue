<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="导入成绩" name="">
            <AddScoreByCourse></AddScoreByCourse>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    import AddScoreByCourse from "../components/score/AddScoreByCourse";
    export default {
        name: "AddScore",
        data() {
            return {
                activeName: ''
            }
        },
        methods: {
            handleClick() {

            }
        },
        components: {
            AddScoreByCourse
        }
    }
</script>

<style scoped>

</style>