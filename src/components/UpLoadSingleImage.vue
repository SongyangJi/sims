<template>
    <div class="upLoader">
        <el-upload
                action=""
                class="avatar-uploader"
                :show-file-list="false"
                :http-request="Uploadfile"
        >
            <el-image v-if="pictureUrl!=null && pictureUrl.trim()!=''" :src="pictureUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>


        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
    </div>
</template>

<script>
    import {getRequest} from "../utils/api";
    import {postRequest} from "../utils/api";

    export default {
        name: 'UpLoadSingleImage',
        data() {
            return {
                pictureUrl: ''
            };
        },
        methods: {

            setURL(url){
                this.pictureUrl = url;
            },
            getURL(){
                return this.pictureUrl;
            },


            getUUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
                })
            },

            Uploadfile(param) {
                let file = param.file; // 得到文件的内容
                // console.log(file);
                //填写获取签名的地址
                const api = '/api/ossSign'; //获取oss签名的地址
                // 获取oss签名
                getRequest(api).then((response) => {
                    if (response.status == 200) {
                        let policyData = response.data;
                        // console.log(policyData);
                        /**
                         ossUrl 换成自己的Bucket的外网地址，
                         例如 https://human-resource-manage.oss-cn-shenzhen.aliyuncs.com
                         */
                        let ossUrl = 'https://sims-web-jsy.oss-cn-shanghai.aliyuncs.com';//填写自己OSS服务器的地址
                        let accessUrl = policyData.dir + '/' + this.getUUID() + file.name;//设置上传的访问路径
                        let sendData = new FormData();// 上传文件的data参数
                        sendData.append('OSSAccessKeyId', policyData.accessid);
                        sendData.append('policy', policyData.policy);
                        sendData.append('Signature', policyData.signature);
                        sendData.append('keys', policyData.dir);
                        sendData.append('key', accessUrl);//上传的文件路径
                        sendData.append('success_action_status', 200); // 指定返回的状态码
                        sendData.append('type', 'image/jpeg');
                        sendData.append('file', file);
                        // console.log(sendData);
                        postRequest(ossUrl, sendData).then((res) => {
                            this.pictureUrl = ossUrl + '/' + accessUrl;//获得到的url需要将其存数据库中
                            // console.log('上传到阿里云的图片地址：' + this.pictureUrl)
                        })
                    }
                })
            },

        }
    }

</script>

<style scoped>

    .upLoader {
        float: left;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        /*图片溢出矩形边框的部分隐藏起来 */
        overflow: hidden;
        width: 178px;
        height: 178px;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>