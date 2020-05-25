<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" style="background-color: #545c64"  text-color="#fff">
            <el-menu
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router    :default-active="$route.path">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>系统设置</template>
                    <el-menu-item-group>
                        <template slot="title">分类</template>
                        <el-menu-item index="/categories/create">分类管理</el-menu-item>
                        <el-menu-item index="/categories/list">分类列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group v-if="userName==='123'?true:false">
                        <template slot="title">用户分类</template>
                        <el-menu-item index="/admin_user/create">管理员管理</el-menu-item>
                        <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-message"></i>管理</template>
                    <el-menu-item-group>
                        <template slot="title">物品</template>
                        <el-menu-item index="/items/create">新建物品</el-menu-item>
                        <el-menu-item index="/items/list">物品列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">英雄</template>
                        <el-menu-item index="/heros/create">新建英雄</el-menu-item>
                        <el-menu-item index="/heros/list">英雄列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">文章</template>
                        <el-menu-item index="/articles/create">新建文章</el-menu-item>
                        <el-menu-item index="/articles/list">文章列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-message"></i>运营管理</template>
                    <el-menu-item-group>
                        <template slot="title">广告</template>
                        <el-menu-item index="/ads/create">新建广告</el-menu-item>
                        <el-menu-item index="/ads/list">广告列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px;background-color: #545c64;color: #fff">
                <span>后台管理系统</span>
                <span>欢迎{{userName==='123'?'超级管理员':'管理员'}}</span>
            </el-header>

            <el-main >
                    <router-view :key="$route.path"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default{
        computed:{
            userName() {
                let localData = localStorage.userName;
                if(this.$store.state.username===undefined){
                    this.$store.commit('setUserName',localData)
                }
                return this.$store.state.userName
            }
        },

    }
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>