<template>
    <div class="upload-avatar">
        <el-upload
            class="upload-demo"
            drag 
            :action="root"
            :data="uploadData"
            multiple
            :on-success="suucess"
            :on-remove="remove"
            :file-list="uplist"
        >
            <div class="el-upload-title">营业执照</div>
            <div class="el-upload-text">
                拖拽或
                <em>点击上传</em>
                ，仅支持JPG/PNG，小于500k
            </div>
            <div class="img-box">
                <img :src="avatarImg" alt="">
            </div>
        </el-upload>
    </div>
</template>

<script>
import { BaseUrl, getCookie } from '../../assets/js/common'
export default {
    data() {
        return {
            root: BaseUrl + "接口路径",
            uploadData: {
                token: getCookie("ssp_token")
            },
            uplist: [],
            avatarImg: ""
        }
    },
    methods: {
        success(res) {
            if(res.code === "200") {
                this.avatarImg = res.data.img_url;
            }else {
                this.avatarImg = "";
                this.uplist = [];
                this.$message.error(res.msg);
            }
        },
        remove() {
            this.avatarImg = "";
        }
    }
}
</script>

<style lang="less" scoped>

</style>