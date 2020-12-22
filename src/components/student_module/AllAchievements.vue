<template>
    <div>
        <el-dialog title="成果详情" :visible.sync="dialogVisible" width="65%" center>
            <SingleAchievement :achievement="cur_achievement"></SingleAchievement>
        </el-dialog>

        <el-card>
            <el-table
                    :data="achievement_list"
            >
                <el-table-column
                        prop="name"
                        label="社会成果名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="获奖级别"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="kind"
                        label="种类">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="活动日期">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="medium" icon="el-icon-view" circle
                                   @click="handleViewDetail(scope.$index,scope.row)">

                        </el-button>
                    </template>


                </el-table-column>


            </el-table>
        </el-card>
    </div>

</template>

<script>
    import {getRequest} from "../../utils/api";
    import SingleAchievement from "./SingleAchievement";

    export default {
        name: "AllAchievements",
        data() {
            return {

                dialogVisible:false,

                cur_achievement:{

                },
                achievement_list: [
                    // {
                    //     "achievement_id": null,
                    //     "sid": null,
                    //     "name": '',
                    //     "description": "",
                    //     "level": "",
                    //     "kind": "",
                    //     "time": "",
                    //     "urls": []
                    // }
                ]
            }
        },
        methods: {
            handleViewDetail(index, row) {
                console.log('ac ',row);
                this.cur_achievement = row;
                this.dialogVisible = true;
            }
        },
        components:{
            SingleAchievement
        },
        mounted() {
            const api = '/api/achievement/' + this.$store.getters.getStudentID;

            getRequest(api).then(res => {
                if (res.status == 200) {
                    this.achievement_list = res.data;
                }
            })


        }
    }
</script>

<style scoped>

</style>