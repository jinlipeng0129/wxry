<template>
                   <div>
                       <el-table :data="items">
                           <el-table-column prop="_id" label="ID" width="140">
                           </el-table-column>
                           <el-table-column prop="username" label="姓名" width="120">
                           </el-table-column>
                           <el-table-column
                                   fixed="right"
                                   label="操作"
                                   width="100">
                               <template slot-scope="scope">
                                   <el-button type="text" size="small" @click="$router.push(`/admin_user/edit/${scope.row._id}`)">编辑</el-button>
                                   <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
                               </template>
                           </el-table-column>
                       </el-table>
                   </div>
</template>

<script>
    export default {
        data(){
           return({
               items:[]
           })
        },
        methods:{
           async  fetchCate(){
               let model= await this.$http.get('rest/admin_users')
               console.log(model)
               this.items=model.data
             },
            async  remove(row){
                this.$confirm(`此操作将"${row.username}"删除`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () =>  {
                    await this.$http.delete(`rest/admin_users/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetchCate()
                })

            },

        },
        created()
        {
             this.fetchCate()
        }
    }
</script>

<style scoped>

</style>