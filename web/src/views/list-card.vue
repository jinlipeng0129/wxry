<template>
        <m-card :title="title" :icon="icon" >
        <div class="nav jc-between">
            <div class="nav-item " :class="{active:active===i}" v-for="(categore,i) in categores" :key="i"
                 @click="$refs.listswiper.$swiper.slideTo(i)">
                <div class="nav-link">{{categore.name}}</div>
            </div>
        </div>
        <div class="pt-3">
            <swiper  ref="listswiper" @slide-change="()=>active=$refs.listswiper.$swiper.realIndex" :options="{autoHeight:true}">
                <swiper-slide  v-for="(category,i) in categores" :key="i"  >
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>


</template>
<script>
    export default {
        props:{
            title:{type:String,required:true},
            icon:{type:String,required:true},
            categores:{type:Array,required:true},

        },
        data(){
            return{
               active:0
            }
        }

    }
</script>