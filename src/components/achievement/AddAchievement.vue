<template>
    <el-card>
        <el-form ref="form" :model="form" label-width="80px" label-position="left" :rules="rules">

            <el-form-item label="成就名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input
                        type="textarea"
                        size="medium"
                        v-model="form.description"
                        placeholder="请进行奖项描述"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="获奖级别" prop="level">
                <el-col :span="8">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option label="国家级" value="国家级"></el-option>
                        <el-option label="省级" value="省级"></el-option>
                        <el-option label="校级" value="校级"></el-option>
                        <el-option label="院级" value="院级"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>

            <el-form-item label="类别" prop="kind">
                <el-col :span="8">
                    <el-select v-model="form.kind" placeholder="请选择">
                        <el-option label="科研创新" value="科研创新"></el-option>
                        <el-option label="社会服务" value="社会服务"></el-option>
                        <el-option label="学科竞赛" value="学科竞赛"></el-option>
                        <el-option label="文艺活动" value="文艺活动"></el-option>
                        <el-option label="体育赛事" value="体育赛事"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>

            <el-form-item label="获奖时间" prop="time">
                <el-col :span="8">
                    <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="form.time"
                            style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>


            <el-form-item label="附加图片">
                <UpLoadImages ref='UpLoadImages'></UpLoadImages>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>
<script>
    import UpLoadImages from "../UpLoadImages";

    export default {
        name: "Achievement",
        data() {
            return {
                form: {
                    name: "",
                    description: "",
                    level: "",
                    kind: "",
                    time: "",
                },
                rules:{
                    name:[{required:true,message: '不可缺少'}]
                }
            };
        },
        components: {
            UpLoadImages
        },
        methods: {

            onSubmit(formName) {
                this.$refs[formName].validate((valid)=>{
                    if(valid){

                    }else{
                        this.$message.warning('尚有信息缺失');
                        return false;
                    }
                })

            },
            resetForm(form) {
                this.$refs[form].resetFields();
            }
        },
    };
</script>


<style scoped>
</style>