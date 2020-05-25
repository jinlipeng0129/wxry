<template>
    <div>
        <h2>{{id?"编辑":"新建"}}管理员</h2>
        <el-form    @submit.native.prevent='save'>
            <el-form-item label="账户"  label-width="70px" >
                <el-input v-model="model.username" style="width: 40%" ref="username" @change="checkuser"></el-input>
                <el-alert
                        type="info"
                        description="输入5-11数字位"
                        show-icon>
                </el-alert>
            </el-form-item>
            <el-form-item label="密码"  label-width="70px">
                <el-input type="password" v-model="model.password" style="width: 40%"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"  label-width="70px" v-show="!id">
                <el-input type="password" v-model="password2" style="width: 40%"  @change="checkpassword" ></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" native-type="submit"  :disabled="id?false:!(flagpassword&&flagusre)">保存</el-button>
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
                   username:'',
                   password:''
               },
               password2:'',
               flagpassword:false,
               flagusre:false
           })
        },
        methods:{
           async save(){
                let res
                if (this.id)
                {
                    res=await this.$http.put(`rest/admin_users/${this.id}`,this.model)

                }
                else {
                    res=await this.$http.post('rest/admin_users',this.model)
                }
               this.model=res
               this.$router.push('/admin_user/list')
               this.$message({
                   type:"success",
                   message:"保存成功"
               })
          },
            async fecthedit()
            {
               let modele= await this.$http.get(`rest/admin_users/${this.id}`)
                this.model=modele.data
            },
            async checkuser()
            {
                if (!this.id)
                 {
                     let regex = /^[1-9][0-9]{4,10}$/g;
                     console.log(regex.test(this.$refs.username.value))

                     if ( !regex.test(this.model.username))
                     {
                         let boolen=await this.$http.post('/check',this.model)

                         if (boolen.data.length!=0)
                         {
                             this.$message.error('用户名已存在');
                             return
                         }
                         else{
                             this.flagusre=true
                         }
                     }
                if(regex.test(this.model.username)==false)
                {
                    this.$message.error('输入5-11数字位');
                    return
                }






                 }

            },
         checkpassword()
            {
                if (!this.id){
                    if(this.model.username=='')
                    {
                        return;

                    }
                    if (this.model.password==''||this.password2=='')
                    {
                        return;

                    }
                    else {
                        if (this.model.password!=this.password2)
                        {
                            this.$message.error('两次密码不符');
                            return
                        }
                        else {
                            this.flagpassword=true
                        }
                    }

                }



            }


        },
        created()
        {

               this.id&&this.fecthedit()

        }
    }
</script>

<style scoped>

</style>