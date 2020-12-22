<template>
    <div>
        <el-carousel :interval="4000" type="card"  height="250px">
            <el-carousel-item v-for="url in img_urls" :key="url">

                <el-image :src="url" fit="fill"/>

            </el-carousel-item>
        </el-carousel>
    </div>

</template>

<script>
    export default {
        name: "CardDisplay",
        data() {
            return {

            }
        },
        props: [
            'img_urls'
        ]
    }
</script>

<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }


</style>