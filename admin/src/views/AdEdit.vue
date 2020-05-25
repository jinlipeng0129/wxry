<template>
    <div>
        <h2>{{id?"编辑":"新建"}}广告位</h2>
        <el-form    @submit.native.prevent='save' >
<!--            <el-form-item label="上级分类">-->
<!--            <el-select v-model="model.parent"  >-->
<!--                <el-option v-for="item in parent" :label="item.name" :value="item._id" :key="item._id"  ></el-option>-->
<!--            </el-select>-->
<!--            </el-form-item>-->



                        <el-form-item label="名称" >
                            <el-input v-model="model.name"></el-input>
                        </el-form-item>
                        <el-form-item label="链接（URL）">
                            <el-input v-model="model.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片"  label-width="70px">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/skillupload'"
                                    :show-file-list="false"
                                     :headers="getAuthorization()"
                                    :on-success="res=>$set(model,'img',res.url)"
                            >
                                <img v-if="model.img" :src="model.img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
            <el-form-item>
               <el-button type="primary"  style="margin-top:20px " native-type="submit">保存</el-button>
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
               model:{

               },

           })
        },
        methods:{

           async save(){
                let res
                if (this.id)
                {

                    res=await this.$http.put(`rest/ads/${this.id}`,this.model)

                }
                else {
                    res=await this.$http.post('rest/ads',this.model)
                }
               this.model=res
               this.$router.push('/ads/list')
               this.$message({
                   type:"success",
                   message:"保存成功"
               })
          },
            async fecthedit()
            {
               let modele= await this.$http.get(`rest/ads/${this.id}`)
                console.log(modele)
                this.model=Object.assign({},this.model,modele.data)
            },

        },
        created()
        {

               this.id&&this.fecthedit()

        }
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