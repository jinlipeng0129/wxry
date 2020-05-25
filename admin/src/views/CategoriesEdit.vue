<template>
    <div>
        <h2>{{id?"编辑":"新建"}}分类</h2>
        <el-form    @submit.native.prevent='save' >
            <el-form-item label="上级分类">
            <el-select v-model="model.parent"  >
                <el-option v-for="item in parent" :label="item.name" :value="item._id" :key="item._id"  ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="名称"  label-width="70px">
                <el-input  ref="checkname"  v-model="model.name" style="width: 40%" @change="checkcategories"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" native-type="submit" :disabled="id?false:(ischeckcategories?false:true)">保存</el-button>
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
               parent:{},
               ischeckcategories:false
           })
        },
        methods:{
           async save(){
                let res
                if (this.id)
                {
                    res=await this.$http.put(`rest/categories/${this.id}`,this.model)
                }
                else
                {
                    if (this.ischeckcategories==false)
                    {
                        this.$message({
                            showClose:true,
                            type:'error',
                            message:'用户名不正确'
                        })
                    }

                    res=await this.$http.post('rest/categories',this.model)
                }
               this.model=res
               this.$router.push('/categories/list')
               this.$message({
                   type:"success",
                   message:"保存成功"
               })
          },

          async checkcategories()
            {
                if (this.$refs.checkname.value=='')
                {
                    this.ischeckcategories=false
                    this.$message({
                        showClose:true,
                        type:'error',
                        message:'用户名不能为空'
                    })
                    return
                }
               const  res= await this.$http.post('/checkcategories',this.model)
                console.log(this.model)
                 if (res.data.length==0)
                 {
                     this.ischeckcategories=true
                 }
                 else{
                     this.$message({
                         showClose:true,
                         type:'error',
                         message:'用户名已存在'
                     })
                     this.ischeckcategories=false
                     return
                 }

            },
            async fecthedit()
            {
               let modele= await this.$http.get(`rest/categories/${this.id}`)
                this.model=modele.data
            },
            async ParementOptions()
            {
                let modele= await this.$http.get("rest/categories")
                this.parent=modele.data
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