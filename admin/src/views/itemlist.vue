<template>
                   <div>
                       <el-table :data="items">
                           <el-table-column prop="_id" label="ID" width="200">
                           </el-table-column>
                           <!--                           <el-table-column prop="parent.name" label="上级" width="120">-->
<!--                           </el-table-column>-->
                           <el-table-column prop="name" label="物品名称" width="150">
                           </el-table-column>
                           <el-table-column prop="icon" label="图标" width="150">
                               <template slot-scope="scope" >
                                   <img :src="scope.row.icon" style="width: 40px;height: 40px">
                               </template>
                           </el-table-column>
                           <el-table-column
                                   fixed="right"
                                   label="操作"
                                   width="100">
                               <template slot-scope="scope">
                                   <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
               let model= await this.$http.get('rest/items')
               console.log(model)
               this.items=model.data
             },
            async  remove(row){
                this.$confirm(`此操作将"${row.name}"删除`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () =>  {
                    await this.$http.delete(`rest/items/${row._id}`)
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
        },


    }
</script>

<style scoped>

</style>