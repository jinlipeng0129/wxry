  <template>
      <div>
          <div class="swiperhome">
              <swiper :options="swiperOptions">
                  <swiper-slide v-for="item in adCats" :key="item._id"><img :src="item.img" class="w-100 h-100" ></swiper-slide>
                  <div class="swiper-pagination pagination-home  text-right" slot="pagination" ></div>
              </swiper>
          </div>
          <div class="nav-icon bg-white mt-1 pt-3   text-center" >
              <div class="d-flex flex-wrap">
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-new"></i>
                      <div class="py-2">爆料站</div>
                  </div>
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-gs"></i>
                      <div class="py-2">故事站</div>
                  </div>
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-sc"></i>
                      <div class="py-2">周边商城</div>
                  </div>
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-tyf"></i>
                      <div class="py-2">体验服</div>
                  </div>
                  </div>
              <div class="d-flex flex-wrap" :style="{display:ishidden}">
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-xrzq"></i>
                      <div class="py-2">新人专区</div>
                  </div>
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-cc"></i>
                      <div class="py-2">荣耀·传承</div>
                  </div>
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-zlc"></i>
                      <div class="py-2">模拟战资料库</div>
                  </div>
                  <div class="nav-item mb-3">
                      <i class="sprite sprite-wzyd"></i>
                      <div class="py-2">王者营地</div>
                  </div>
              </div>
              <div class="bg-light" @click="isdispaly">
                  <i class="sprite sprite-sq"></i>
                  <span>{{isdisplaybutton}}</span>
              </div>
          </div>
<!--          <div>-->
<!--              <list-card  :categores="newsCats">-->
<!--                  <template #items="{category}">-->
<!--                      <div class="py-2 d-flex" v-for="(news,i) in category.newslist " :key="i">-->
<!--                          <span>[{{news.catename}}]</span>-->
<!--                          <span class="flex-1 text-dark text-ellipse pr-2">{{news.title}}</span>-->
<!--                          <span>{{news.date|data }}</span>-->
<!--                      </div>-->
<!--                  </template>-->
<!--              </list-card>-->
<!--          </div>-->
          <div class="bg-light fs-lg">
              <list-card  :categores="newsCats" title="新闻资讯" icon="news" >
                  <template #items="{category}">
                      <router-link
                           tag="div" class="py-2 d-flex " v-for="(news,i) in category.newslist " :key="i"
                           :to="`/articles/${news._id}`">
                          <span>[{{news.catename}}]</span>
                          <span class="flex-1 text-ellipse">{{news.title}}</span>
                          <span>{{news.date|data }}</span>
                      </router-link>
                  </template>
              </list-card>
          </div>
          <div>
              <list-card  :categores="heroCats" title="英雄列表" icon="yingxiong
" isexist="true">
                  <template #items="{category}">
                      <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
                          <router-link tag="div" :to="`/heroes/${heros._id}`" class="text-center p-2" style="width: 20%" v-for="(heros,i) in category.heroeslist " :key="i">
                              <img :src="heros.avatar"  class="w-100">
                              <div>{{heros.name}}</div>
                          </router-link>
                      </div>
                  </template>
              </list-card>
          </div>
      </div>

      </template>

<script>

  import dayjs from 'dayjs'
    export default {
        filters:{
          data(val)
          {
              return dayjs(val).format('MM/DD')
          }
        },
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.pagination-home'
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },

                },
                newsCats:[],
                heroCats:[],
                adCats:[],
                isdisplaybutton:"展开",
                ishidden:"none"

            }
        },
        methods:{
            async fetchnews(){
                 const res=await this.$http.get('news/list')
                this.newsCats=res.data
        },
            async fetchhero(){
                const res=await this.$http.get('heroes/list')
                this.heroCats=res.data
            },
            async fetchAd(){
                const res=await this.$http.get('ads/list')
                this.adCats=res.data
                console.log(res)
            },
             isdispaly()
             {
                  if ( this.isdisplaybutton=='展开')
                  {
                      this.isdisplaybutton='收起'
                      this.ishidden='flex'
                  }
                  else {
                      this.ishidden='none'
                      this.isdisplaybutton='展开'
                  }

             }

    },
     created() {
             this.fetchnews()
            this.fetchhero()
             this.fetchAd()
     }
    }
</script>

<style lang="scss">
    @import "../scss/varib.scss";
    .nav-display{
        display: none;
    }
    .pagination-home{

        .swiper-pagination-bullet{
            opacity: 1;
            border-radius:0.1538rem ;
            background:map-get($colors,'white');

        &.swiper-pagination-bullet-active
        {
            background:map-get($colors,'info');
        }
    }

    }
    .nav-icon{
        border-top:1px solid $boder-color;
        border-bottom:1px solid $boder-color;
        .nav-item{
            width: 25%;
            border-right:1px solid $boder-color ;
            &:nth-child(4n)
            {
                border-right:none ;
            }
        }
    }

</style>