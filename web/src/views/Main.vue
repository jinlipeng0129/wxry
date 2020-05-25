<template>
  <div>
    <div class="topbar  py-2 px-3 d-flex  ai-center  ">
        <div class="sprite sprite-icon"></div>
       <div class="px-2 flex-1" >
         <div class="text-white">王者荣耀</div>
         <div class="text-grey fs-xl">团队成就更多 </div>
       </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-2 " >
      <div class="nav nav-inserse jc-around pb-1">
        <div class=" nav-item active">
          <router-link class="nav-link" to="/" tag="div">首页</router-link>
        </div>
        <div class=" nav-item">
          <router-link class="nav-link" to="/"  tag="div">攻略</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link"  to="/" tag="div" >赛事中心</router-link>
        </div>
      </div>
    </div>
       <router-view/>
  </div>

</template>

<script>
// @ is an alias to /src


export default {

}
</script>
