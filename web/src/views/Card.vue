<template>
    <div>
        <div class=" crad bg-white mt-3 p-3">
            <div class="crad-header d-flex ai-center  pb-3">
                <i class="iconfont" :class="`icon-${icon}`" ></i>
                <div class="fs-xl flex-1 px-2">{{title}}</div>
                <i class="iconfont icon-caidan" v-if="!isexist"></i>
            </div>
            <div class="crad-body mt-3">
                <slot>
                </slot>
                </div>
            </div>
        </div>
</template>


<script>
    export default {
        props:{
            title:{
                type:String,required:true
            },
            icon:{
               type:String,required: true
            },
            isexist:{
                type:Boolean,
            }
        }

    }
</script>


<style lang="scss">
    @import "../scss/varib.scss";
    .crad{
            .crad-header{
                border-bottom: 1px solid map-get($colors,'white-2');
            }

        border-bottom: 1px solid  map-get($colors,'white-2') ;
    }

</style>


