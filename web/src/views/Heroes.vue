<template>
  <div class="page-heros" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex  ai-center  text-white">
      <div class="sprite sprite-icon"></div>
      <div class="px-2 flex-1 ">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
        <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>
     <div class="header-hero" :style="{'background-image':`url(${model
     .banner})`}">
       <div class="hero-attribute text-white p-3 d-flex flex-column jc-end h-100  ">
          <span class="hero-title">{{model.title}}</span>
          <h2 class="hero-name my-2">{{model.name}}</h2>
          <span>{{model.categroies.map(v=>v.name).join('/')}}</span>
          <div class="d-flex jc-between pt-1">
            <div class="scores d-flex ai-center"  v-if="model.scores">
              <span>难度</span>
              <span class="badge bg-primary">{{model.scores.difficult}}</span>
              <span>技能</span>
              <span class="badge bg-primary">{{model.scores.skills}}</span>
              <span>攻击</span>
              <span class="badge bg-primary">{{model.scores.attack}}</span>
              <span>生存</span>
              <span class="badge bg-primary">{{model.scores.survive}}</span>
            </div>
            <router-link tag="span" to="/">皮肤</router-link>
          </div>
       </div>
     </div>
       <div class="px-3 ">
         <div>
         <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
           <div class="nav-item active">
             <div class="nav-link">英雄初识</div>
           </div>
           <div class="nav-item">
             <div class="nav-link">进阶攻略</div>
           </div>
         </div>
       </div>
       </div>
      <div>
        <swiper>
          <swiper-slide>
            <div>
              <div class="p-3 border-bottom  bg-white">
                <div class="d-flex">
                  <router-link tag="button" to="/" class="btn btn-lg flex-1">
                    <i class="iconfont icon-caidan"></i>
                    <p>英雄介绍视频</p>
                  </router-link>
                  <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                    <i class="iconfont icon-caidan"></i>
                    <p>英雄介绍视频</p>
                  </router-link>
                </div>
                <div class="skills mt-3 bg-white">
                  <div class="d-flex jc-around ">
                    <img :src="item.icon" v-for="(item ,i) in model.skills" :key="i"
                         @click="currentindex=i"
                         width="60"
                         height="60"
                         class="icon"
                         :class="{active:currentindex===i}"
                    >
                  </div>
                  <div v-if="currentIndex" >
                    <div class="d-flex pt-4">
                      <h3 class="m-0" >{{currentIndex.name}}</h3>
                      <span class="ml-4 P-2">冷却值:{{currentIndex.dely}}消耗值: {{currentIndex.cost}}</span>
                    </div>
                    <p >{{currentIndex.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    <m-card icon="yingxiong" title="出装推荐" isexist >
      <div class="fs-xl">顺风出装</div>
      <div class="d-flex  jc-between text-center">
        <div v-for="items1  in model.items1" :key="items1._id">
          <img :src="items1.icon" style="width: 48px;height: 48px;border-radius:50%">
          <div>
            {{items1.name}}
          </div>
        </div>
      </div>
      <div class="fs-xl mt-1">逆风出装</div>
      <div class="d-flex  jc-between text-center">
        <div v-for="items2  in model.items2" :key="items2._id">
          <img :src="items2.icon" style="width: 48px;height: 48px;border-radius:50%">
          <div>
            {{items2.name}}
          </div>
        </div>
      </div>

    </m-card>
    <m-card icon="yingxiong" title="使用技巧" isexist>
      <p class="m-0">{{model.usageTips}}</p>
    </m-card>
    <m-card icon="yingxiong" title="对坑技巧" isexist>
      <p class="m-0">{{model.battleTips}}</p>
    </m-card>
    <m-card icon="yingxiong" title="团战思路" isexist>
      <p class="m-0">{{model.teamTips}}</p>
    </m-card>
     <m-card icon="yingxiong" title="英雄关系">
       <p>最佳搭档</p>
       <div  class="partenhero d-flex p-2" v-for="(item,i) in model.partens" :key="i">
          <img  :src="item.hero.avatar">
         <div class="flex-1 ml-2">{{item.description}}</div>
       </div>
    </m-card>
  </div>
</template>
<script>
  export  default {
    props:{
      id:{required:true},
  },
  data(){
      return{
        model:null,
        currentindex:0
      }

  },
    methods:{
      async  fetch()
            {
              const res= await this.$http.get(`heroses/${this.id}`)
              console.log(res.data)
              this.model=res.data
            }
    },
    computed:{
      currentIndex(){
        return this.model.skills[this.currentindex]
      }
    },
    created() {
      this.fetch()
    },

  }


</script>
<style lang="scss">
  @import "../scss/varib";
  .page-heros{
  .header-hero {
     height: 50vw;
    background:#fff no-repeat top center;
    background-size: auto 100%;
    .info
    {
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    }
  }
    .scores{
      .badge{
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size:0.6rem;
        border: 1px solid rgba(225,225,225,0.2);
      }
    }
    .skills{
      img.icon{
        border: 3px solid map-get($colors,'white') ;
        &.active{
          border-color:  map-get($colors,'primary') ;
        }
        border-radius: 45%;
      }

    }
    .partenhero{
      img{
        width:  49.6px;
        height: 49.6px;
      }
    }

  }
</style>