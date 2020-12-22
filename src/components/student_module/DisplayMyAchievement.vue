<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="社会成果一览" name="AllAchievements">
            <AllAchievements></AllAchievements>
        </el-tab-pane>

<!--        <el-tab-pane label="社会成果详情" name="SingleAchievement">-->
<!--            <SingleAchievement></SingleAchievement>-->
<!--        </el-tab-pane>-->

    </el-tabs>
</template>

<script>

    import AllAchievements from "./AllAchievements";
    import SingleAchievement from "./SingleAchievement";

    export default {
        name: "DisplayMyAchievement",
        data(){
            return{
                activeName:'AllAchievements',
            }
        },
        methods:{
            handleClick(){

            }
        },
        components:{
            AllAchievements,
            SingleAchievement
        }
    }
</script>

<style scoped>

</style>

