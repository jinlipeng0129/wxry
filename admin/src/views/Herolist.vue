<template>
                   <div>
                       <div>
                           <el-input
                                   placeholder="请输入英雄名"
                                   prefix-icon="el-icon-search"
                                   v-model="searchvalue"
                                   @change="searchfunction"
                                   >
                           </el-input>
                       </div>
                       <el-table :data="item2">
                           <el-table-column prop="_id" label="ID" width="140">
                           </el-table-column>
                           <!--                           <el-table-column prop="parent.name" label="上级" width="120">-->
<!--                           </el-table-column>-->
                           <el-table-column prop="name" label="英雄名称" width="120">
                           </el-table-column>
                           <el-table-column prop="avatar" label="头像" width="120">
                               <template slot-scope="scope">
                                   <img class="imgstyle" :src="scope.row.avatar">
                               </template>
                           </el-table-column>
                           <el-table-column
                                   fixed="right"
                                   label="操作"
                                   width="100">
                               <template slot-scope="scope">
                                   <el-button type="text" size="small" @click="$router.push(`/heros/edit/${scope.row._id}`)">编辑</el-button>
                                   <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
                               </template>
                           </el-table-column>
                       </el-table>
                       <div class="block">
                           <el-pagination
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page.sync="currentPage3"
                                   :page-size="10"
                                   layout="prev, pager, next, jumper"
                                   :total="items.length">
                           </el-pagination>
                       </div>
                   </div>
</template>

<script>
    export default {
        data(){
           return({
               items:[],
               item2:[],
               currentPage3:1,
               searchvalue:''
           })
        },
        computed:{
        },
        methods:{
           async  fetchCate(){
               let model= await this.$http.get('rest/heros')
               this.items=model.data
               this.dataShow(this.currentPage3)
               console.log(this.items.length);
             },
            async  remove(row){
                this.$confirm(`此操作将"${row.name}"删除`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () =>  {
                    await this.$http.delete(`rest/heros/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetchCate()
                })


            },
               async  dataShow(val){
                    let start=(val-1)*10
                    let  end=  Math.min(val*10,this.items.length)
                    this.item2 = await this.items.slice(start,end)
                    console.log(this.items)
                    console.log(this.item2)
            },
            handleSizeChange(val) {
                console.log(this.items.length,val);
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dataShow(val)
            },

            searchfunction()
            {
                 let fale=false
                console.log(this.searchvalue)
                 if(this.searchvalue=='')
                 {
                     return
                 }
                    this.items.map((val)=>{
                    console.log(val.name===this.searchvalue)
                      if (val.name===this.searchvalue)
                       {
                           console.log(fale)
                           fale=true
                           this.item2=[val]
                           return
                       }

                })
                if (fale==false)
                {
                    this.$message({
                        type:'error',
                        message:'未找到'

                    })
                }


            }
        },

        created()
        {
            this.fetchCate()
        }
    }
</script>

<style scoped>
.imgstyle{
    width: 50px;
    height: 50px;
}
</style>