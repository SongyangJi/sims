<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="按学生查询" name="">
            <QueryScoreByStudent></QueryScoreByStudent>
        </el-tab-pane>

        <el-tab-pane label="按科目查询" name="">
            <QueryScoreByCourse></QueryScoreByCourse>
        </el-tab-pane>

    </el-tabs>

</template>

<script>
    import QueryScoreByCourse from "../components/score/QueryScoreByCourse";
    import QueryScoreByStudent from "../components/score/QueryScoreByStudent";
    export default {
        name: "DisplayScore",
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
            QueryScoreByStudent,
            QueryScoreByCourse
        }
    }
</script>

<style scoped>

</style>