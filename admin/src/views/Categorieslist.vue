<template>
                   <div>
                       <div style="display: flex;justify-content:space-around; width: 30%">
                            <div>
                               <el-button type="text" @click="centerDialogVisible = true">分类名搜索</el-button>
                               <el-dialog
                                       title="请输入分类名"
                                       :visible.sync="centerDialogVisible"
                                       width="30%"
                                       center>
                                   <el-input
                                           placeholder="请输入分类名"
                                           prefix-icon="el-icon-search"
                                           v-model="searchvalue"
                                   >
                                   </el-input>
                                   <span slot="footer" class="dialog-footer">
                       <el-button @click="centerDialogVisible = false">取 消</el-button>
                         <el-button type="primary" @click="searchfunction">确 定</el-button></span>
                               </el-dialog>
                           </div>
                            <div> <el-button type="text" @click="centerDialogVisible1= true">上级分类名搜索</el-button>
                                <el-dialog
                                        title="请输入上级分类名"
                                        :visible.sync="centerDialogVisible1"
                                        width="30%"
                                        center>
                                    <el-input
                                            placeholder="请输入上级名称名"
                                            prefix-icon="el-icon-search"
                                            v-model="prvsearchvalue"
                                    >
                                    </el-input>
                                    <span slot="footer" class="dialog-footer">
                       <el-button @click="centerDialogVisible1 = false">取 消</el-button>
                         <el-button type="primary" @click="prvsearchfunction">确 定</el-button></span>
                                </el-dialog></div>
                           <el-button type="text" icon="el-icon-search" size="sma" @click="fetchCate">显示全部</el-button>
                       </div>
                       <el-table :data="item2" style="text-align: center">
                           <el-table-column prop="_id" label="ID" width="250">
                           </el-table-column>
                           <el-table-column prop="parent.name" label="上级" width="200">
                           </el-table-column>
                           <el-table-column prop="name" label="分类名" width="120">
                           </el-table-column>
                           <el-table-column
                                   fixed="right"
                                   width="150">
                               <template slot-scope="scope">
                                   <div style="display: flex; ">
                                       <el-button type="primary"  icon="el-icon-edit" circle size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)"></el-button>
                                       <el-button type="danger" icon="el-icon-delete" circle size="small" @click="remove(scope.row)"></el-button>
                                   </div>

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
                                   :total="currentlength">
                           </el-pagination>

                       </div>
                   </div>
</template>

<script>
    export default {
        data(){
           return({
               centerDialogVisible:false,
               centerDialogVisible1:false,
               currentlength:0,
               items:[],
               item2:[],
               currentPage3:1,
               searchvalue:'',
               prvsearchvalue:''
           })
        },
        methods:{
           async  fetchCate(){
               let model= await this.$http.get('rest/categories')
               this.items=model.data
               this.dataShow(this.currentPage3)

             },
            async dataShow(val){
                let start=(val-1)*10
                let  end=  Math.min(val*10,this.items.length)
                this.item2 = await this.items.slice(start,end)
                this.currentlength=this.items.length
                console.log(this.items)
                console.log(this.item2)
            },
            async  remove(row){
                this.$confirm(`此操作将"${row.name}"删除`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () =>  {
                    await this.$http.delete(`rest/categories/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetchCate()
                })

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
                {this.$message({type:'error',
                        message:'不能为空'
                    })
                    return
                }
                this.items.map((val)=>{
                    if (val.name===this.searchvalue)
                    {   fale=true
                        this.item2=[val]
                        this.centerDialogVisible=false
                        return
                    }

                })
                this.currentlength=this.item2.length
                if (fale==false)
                {this.$message({
                        type:'error',
                        message:'未找到'

                    })
                }
            },
            prvsearchfunction(){
                let fale=false
                let arr=[]
                if(this.prvsearchvalue=='')
                {
                    this.$message({
                        type:'error',
                        message:'不能为空'

                    })
                    return
                }
               this.items.map((val)=>{

                  if (val.parent)
                  {
                      if(val.parent.name===this.prvsearchvalue)
                      {
                          arr.push(val)
                          this.item2=arr
                          this.centerDialogVisible1=false
                          fale=true
                          return
                      }
                  }

               })
                this.currentlength=this.item2.length
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

</style>