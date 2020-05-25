<template>
  <div class="page-article" v-if="art">
    <div class="d-flex px-2 py-3 border-bottom">
      <i class="iconfont icon-news"></i>
    <strong class=" flex-1 pl-2">
      {{art.title}}
    </strong>
    </div>
    <div v-html="art.body" class="px-3 body" >
    </div>
    <div class="py-1 px-1 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-news"></i>
        <strong class=" fs-lg">相关资讯</strong>
      </div>
    </div>
    <div class="pt-2">
      <router-link class="py-2 " tag="div" v-for="item in art.related"  :key="item._id" :to="`/articles/${item._id}`">
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>
<script>
  export  default {
    props:{
      id:{required:true},
      art:null
  },
    watch:{
      id() {
        this.fetch()
      }
    },
   methods:{
      async fetch(){
          const  res=await this.$http.get(`/articles/${this.id}`)
          console.log(res.data)
          this.art=res.data
      }
   },
    created() {
      this.fetch()
    }
  }
</script>
<style lang="scss">
  .page-article{
    .body{
      img{
        max-width: 100%;
        height: auto;
      }
      iframe{
        width: 100%;
        height: auto;
      }
    }
  }
</style>