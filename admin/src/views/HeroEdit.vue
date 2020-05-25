<template>
    <div>
        <h2>{{id?"编辑":"新建"}}英雄</h2>
        <el-form    @submit.native.prevent='save' >
<!--            <el-form-item label="上级分类">-->
<!--            <el-select v-model="model.parent"  >-->
<!--                <el-option v-for="item in parent" :label="item.name" :value="item._id" :key="item._id"  ></el-option>-->
<!--            </el-select>-->
<!--            </el-form-item>-->
            <el-tabs value="base" type="booder-card">
                <el-tab-pane label="基本信息" name="base">
                    <el-form-item label="名称"  label-width="70px">
                        <el-input v-model="model.name" style="width: 40%" ref="checkheros" @change="checkheros"></el-input>
                    </el-form-item>
                    <el-form-item label="称号"  label-width="70px">
                        <el-input v-model="model.title" style="width: 40%"></el-input>

                    </el-form-item>
                    <el-form-item label="类型"  label-width="70px">
                        <el-select v-model="model.categroies" style="width: 40%"  multiple>
                            <el-option v-for="item of categroies" :label="item.name" :value="item._id" :key="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="头像"  label-width="70px">
                    <el-upload
                            class="avatar-uploader"
                            :headers="getAuthorization()"
                            :action="$http.defaults.baseURL+'/herosicon'"
                            :show-file-list="false"
                            :on-success="afteruploader"
                    >
                        <img v-if="model.icon" :src="model.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                    <el-form-item label="背景图"  label-width="70px">
                        <el-upload
                                class="avatar-uploader"
                                :headers="getAuthorization()"
                                :action="$http.defaults.baseURL+'/herosicon'"
                                :show-file-list="false"
                                :on-success="res=>this.$set(this.model,'banner',res.url)"
                        >
                            <img v-if="model.banner" :src="model.banner" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="顺风出装"  label-width="70px">
                        <el-select v-model="model.items1" style="width: 40%"  multiple>
                            <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装"  label-width="70px">
                        <el-select v-model="model.items2" style="width: 40%"  multiple>
                            <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate v-model="model.scores.difficult" :max="9" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate v-model="model.scores.skills" :max="9" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate v-model="model.scores.attack" :max="9" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate v-model="model.scores.survive" :max="9" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能">
                    <el-button @click="model.skills.push({})"><i class="el-icon-plus"> 添加技能</i></el-button>
<!--                        <el-row type="flex" style="flex-wrap: wrap;width: 50rem" >-->
<!--                        <el-col :md="12" v-for= "(item ,i) of model.skills" :key="i">-->
<!--                        <el-form-item label="名称">-->
<!--                            <el-input v-model="item.name"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="图标"  label-width="70px">-->
<!--                            <el-upload-->
<!--                                    class="avatar-uploader"-->
<!--                                    :headers="getAuthorization()"-->
<!--                                    :action="$http.defaults.baseURL+'/skillupload'"-->
<!--                                    :show-file-list="false"-->
<!--                                    :on-success="res=>$set(item,'icon',res.url)"-->
<!--                            >-->
<!--                                <img v-if="item.icon" :src="item.icon" class="avatar">-->
<!--                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                            </el-upload>-->
<!--                        </el-form-item>-->
<!--                            <el-form-item label="冷却值">-->
<!--                                <el-input v-model="item.dely"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="消耗">-->
<!--                                <el-input v-model="item.cost"></el-input>-->
<!--                            </el-form-item>-->
<!--                        <el-form-item label="描述">-->
<!--                            <el-input v-model="item.description"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="提示">-->
<!--                            <el-input v-model="item.tips"></el-input>-->
<!--                        </el-form-item>-->
<!--                            <el-form-item>-->
                                <el-button size="small" type="danger" @click="model.skills.splice(model.skills.length-1,1)">删除</el-button>
<!--                            </el-form-item>-->
<!--                        </el-col >-->
<!--                    </el-row>-->
                    <el-container>
                        <el-main>
                            <el-table :data="model.skills" style="text-align: center">
                                <el-table-column  label="名称" >
                                    <template slot-scope="scope">
                                      <el-input v-model="model.skills[scope.$index].name"> </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column label="图标"  width="70">
                                        <template slot-scope="scope">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    :headers="getAuthorization()"
                                                    :action="$http.defaults.baseURL+'/skillupload'"
                                                    :show-file-list="false"
                                                    :on-success="res=>$set(model.skills[scope.$index],'icon',res.url)"
                                            >
                                                <img v-if="model.skills[scope.$index].icon" :src="model.skills[scope.$index].icon" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                            </template>
                                    </el-table-column>
                                <el-table-column  label="冷却值">
                                    <template slot-scope="scope">
                                        <el-input v-model="model.skills[scope.$index].dely"> </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="消耗">
                                    <template slot-scope="scope">
                                        <el-input v-model="model.skills[scope.$index].cost"> </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="描述">
                                    <template slot-scope="scope">
                                        <el-input v-model="model.skills[scope.$index].description"> </el-input>
                                    </template>
                                </el-table-column>
<!--                                <el-table-column prop="dely" label="冷却值" width="80">-->
<!--                                </el-table-column>-->
<!--                                <el-table-column prop="cost" label="消耗" width="50">-->
<!--                                </el-table-column>-->
<!--                                <el-table-column prop="description" label="描述" >-->
<!--                                </el-table-column>-->
                            </el-table>
                        </el-main>
                    </el-container>
                </el-tab-pane>
                <el-tab-pane label="最佳搭档">
                    <el-button @click="model.partens.push({})"><i class="el-icon-plus"> 添加英雄</i></el-button>
                    <el-row type="flex" style="flex-wrap: wrap;width: 50rem" >
                        <el-col :md="12" v-for= "(item ,i) of model.partens" :key="i">
                            <el-form-item label="英雄">
                                <el-select v-model="item.hero" filterable>
                                    <el-option v-for="hero in heros " :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.partens.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col >
                    </el-row>

                </el-tab-pane>
            </el-tabs>

            <el-form-item>
               <el-button type="primary" native-type="submit" :disabled="id?false:(ischeckheros?false:true)">保存</el-button>
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
                   name:'',
                   icon:'',
                   banner:'',
                   scores:{
                       difficult:0,
                       skills:0 ,
                       attack:0 ,
                       survive:0 ,
                   },
                   skills:[],
                   partens:[],
               },
               categroies:[],
               items:[],
               heros:[],
               ischeckheros:false
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

                    res=await this.$http.put(`rest/heros/${this.id}`,this.model)

                }
                else {
                    res=await this.$http.post('rest/heros',this.model)
                }
               this.model=res
               this.$router.push('/heros/list')
               this.$message({
                   type:"success",
                   message:"保存成功"
               })
          },
            async fecthedit()
            {
               let modele= await this.$http.get(`rest/heros/${this.id}`)
                console.log(modele)
                this.model=Object.assign({},this.model,modele.data)
            },
            async fecthCategroies()
            {
                let modele= await this.$http.get('rest/categories')
                this.categroies=modele.data
            },
            async fecthItems()
            {
                let modele= await this.$http.get('rest/items')
                this.items=modele.data

            },
            async fecthheroes()
            {
                let modele= await this.$http.get('rest/heros')
                this.heros=modele.data
                console.log(this.model)

            },
            async checkheros()
            {
                if (this.$refs.checkheros.value=='')
                {
                    this.ischeckheros=false
                    this.$message({
                        showClose:true,
                        type:'error',
                        message:'用户名不能为空'
                    })
                    return
                }
                const  res= await this.$http.post('/checkheros',this.model)
                console.log(this.model)
                if (res.data.length==0)
                {
                    this.ischeckheros=true
                }
                else{
                    this.$message({
                        showClose:true,
                        type:'error',
                        message:'用户名已存在'
                    })
                    this.ischeckheros=false
                    return
                }

            },

        },
        created()
        {      this.fecthItems()
               this.fecthCategroies()
                this.fecthheroes()
               this.id&&this.fecthedit()
               this.id&&this.fecthheroes()

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
        width: 50px;
        height: 50px;
        display: block;
    }
</style>