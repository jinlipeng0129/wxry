<template>
    <div>
        <h2>{{id?"编辑":"新建"}}文章分类</h2>
        <el-form    @submit.native.prevent='save' >
            <el-form-item label="上级分类">
            <el-select v-model="model.categroies"  multiple >
                <el-option v-for="item in categroies" :label="item.name" :value="item._id" :key="item._id"  ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="标题"  label-width="70px">
                <el-input v-model="model.title" style="width: 40%"></el-input>
            </el-form-item>
            <el-form-item label="内容"  label-width="70px">
               <vue-editor v-model="model.body" useCustomImageHandler @image-added ='handleImageAdded'></vue-editor>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor"
    export default {
        props:{
           id:{}
        },
        data(){
           return({
               model:{body:''},
               categroies:[]
           })
        },
        components: {
            VueEditor
        },
        methods:{
           async save(){
                let res
                if (this.id)
                {
                     console.log(this.model.parent)
                    console.log(this.parent)
                    res=await this.$http.put(`rest/articles/${this.id}`,this.model)

                }
                else {
                    res=await this.$http.post('rest/articles',this.model)
                }
               this.model=res
               this.$router.push('/articles/list')
               this.$message({
                   type:"success",
                   message:"保存成功"
               })
          },
           async  handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                const  formData = new FormData();
                formData.append("file", file);
                 const res=await this.$http.post('upload',formData)
               Editor.insertEmbed(cursorLocation, "image", res.data.url)
               resetUploader()

            },

            async fecthedit()
            {
               let modele= await this.$http.get(`rest/articles/${this.id}`)
                this.model=modele.data
            },
            async ParementOptions()
            {
                let modele= await this.$http.get("rest/categories")
                this.categroies=modele.data
            },
        },
        created()
        {
                this.ParementOptions()
               this.id&&this.fecthedit()

        }
    }
</script>

<style scoped>

</style>