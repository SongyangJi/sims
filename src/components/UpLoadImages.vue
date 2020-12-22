<template>
    <!-- 覆盖默认的上传行为，可以自定义上传的实现   -->
    <el-upload
            class="upload-demo"
            action=""
            :on-progress="handleProgress"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            list-type="picture"
            :http-request="Uploadfile"
    >
        <el-button size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>


<script>
    import {getRequest, postRequest} from "../utils/api";

    export default {
        name: "UpLoadImages",
        data() {
            return {
                urlList: []
            };
        },
        methods: {

            beforeRemove(){
                return false;
            },
            handleRemove(file, fileList) {
                // console.log(file, fileList);
            },
            handlePreview(file) {
                // console.log(file);
            },
            handleProgress(){
            },

            getURLS(){
                return this.urlList;
            },
            setURLS(urlList){
                this.urlList = urlList;
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
                            let url = ossUrl + '/' + accessUrl;//获得到的url需要将其存数据库中
                            this.urlList.push(url);
                            console.log('上传到阿里云的图片地址：' + url)
                        })
                    }
                })
            },

        }
    }
</script>

<style scoped>

</style>