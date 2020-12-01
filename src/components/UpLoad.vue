<template>
        <div>
            <el-upload
                    action=""
                    class="avatar-uploader"
                    :show-file-list="false"
                    :http-request="Uploadfile">
                <el-image  v-if="pictureUrl.trim()!=''" :src="pictureUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
</template>


<script>
    export default{ // 配置对象 options
        // 配置选项(option)
        data() {
            return {
                pictureUrl: ''
            };
        },
        methods: {
            //自己编写的函数用于生成文件名，防止上传的文件重名
            getUUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
                })
            },

            Uploadfile(param) {
                let file = param.file; // 得到文件的内容
                console.log(file);
                //填写获取签名的地址
                const getPolicyApiUrl = 'http://localhost:8088/asign'; //获取oss签名的地址
                // 获取oss签名
                axios({
                    method: 'get',
                    url: getPolicyApiUrl,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*',
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        let policyData = response.data;
                        console.log(policyData);
                        /**
                         ossUrl 换成自己的Bucket的外网地址，
                         例如 https://human-resource-manage.oss-cn-shenzhen.aliyuncs.com
                         */
                        let ossUrl = 'https://human-resource-manage.oss-cn-shenzhen.aliyuncs.com';//填写自己OSS服务器的地址
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
                        console.log(sendData);
                        axios.post(ossUrl, sendData).then((res) => {
                            this.pictureUrl = ossUrl + '/' + accessUrl;//获得到的url需要将其存数据库中
                            console.log('上传到阿里云的图片地址：' + ossUrl + '/' + accessUrl)
                        })
                    }
                })
            },

        }
    }
</script>


<style>
    /*html, body {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    margin: 0;*/
    /*}*/

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
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