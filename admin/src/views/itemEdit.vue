<template>
    <div>
        <h2>{{id?"编辑":"新建"}}分类</h2>
        <el-form    @submit.native.prevent='save' >
<!--            <el-form-item label="上级分类">-->
<!--            <el-select v-model="model.parent"  >-->
<!--                <el-option v-for="item in parent" :label="item.name" :value="item._id" :key="item._id"  ></el-option>-->
<!--            </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="名称"  label-width="70px">
                <el-input v-model="model.name" style="width: 40%" ref="checkname" @change="checkitems"></el-input>
            </el-form-item>
            <el-form-item label="图标"  label-width="70px">
                <el-upload
                    class="avatar-uploader"
                    :before-upload="beforeAvatarUpload"
                    :action="$http.defaults.baseURL+'/upload'"
                    :headers="getAuthorization()"
                    :show-file-list="false"
                    :on-success="afteruploader"
                    >

                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" native-type="submit" :disabled="id?false:(ischeckitems?false:true)">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props:{
           id:{}
        },
        data(){
           return({
               model:{},
               ischeckitems:false
           })
        },
        methods:{
            afteruploader(res){
                this.$set(this.model,'icon',res.url)
                console.log(this.model.icon)
            },
           async save(){
                let res
                if (this.id)
                {

                    res=await this.$http.put(`rest/items/${this.id}`,this.model)

                }
                else {

                    res=await this.$http.post('rest/items',this.model)
                }
               this.model=res
               this.$router.push('/items/list')
               this.$message({
                   type:"success",
                   message:"保存成功"
               })
          },
            async checkitems()
            {
                if (this.$refs.checkname.value=='')
                {
                    this.ischeckitems=false
                    this.$message({
                        showClose:true,
                        type:'error',
                        message:'用户名不能为空'
                    })
                    return
                }
                const  res= await this.$http.post('/checkitems',this.model)
                console.log(this.model)
                if (res.data.length==0)
                {
                    this.ischeckitems=true
                }
                else{
                    this.$message({
                        showClose:true,
                        type:'error',
                        message:'用户名已存在'
                    })
                    this.ischeckitems=false
                    return
                }

            },
            async fecthedit()
            {
               let modele= await this.$http.get(`rest/items/${this.id}`)
                this.model=modele.data
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }

        },
        created()
        {
            this.id&&this.fecthedit()

        },

    }
</script>

<style scoped>
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