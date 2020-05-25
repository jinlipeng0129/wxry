import Vue from 'vue'
import  login from '../views/login'
import VueRouter from 'vue-router'
import Home from '../views/Main.vue'
import CategoriesEdit from '../views/CategoriesEdit.vue'
import Categorieslist from '../views/Categorieslist.vue'
import ItemEdit from '../views/itemEdit.vue'
import Itemlist from '../views/itemlist.vue'
import HeroEdit from '../views/HeroEdit.vue'
import Herolist from '../views/Herolist.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import Articlelist from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import Adlist from '../views/Adlist.vue'
import admin_userEdit from '../views/Admin_userEdit.vue'
import admin_userlist from '../views/Admin_Userlist.vue'
Vue.use(VueRouter)

const routes= [
    {
        path:'/login',name:'login',component:login,meta:{isPublic:true}
    },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
          path:'/categories/create',component: CategoriesEdit
    },
        {path:'/categories/list',component: Categorieslist
        },
        {path:'/categories/edit/:id',component:CategoriesEdit,props:true},
        {
            path:'/items/create',component: ItemEdit
        },
        {path:'/items/list',component: Itemlist
        },
        {path:'/items/edit/:id',component:ItemEdit,props:true},
        {path:'/heros/list',component: Herolist
        },
        {path:'/heros/edit/:id',component:HeroEdit,props:true},
        {
            path:'/heros/create',component: HeroEdit
        },
        {path:'/articles/list',component: Articlelist
        },
        {path:'/articles/edit/:id',component:ArticleEdit,props:true},
        {
            path:'/articles/create',component: ArticleEdit
        },
        {path:'/ads/list',component: Adlist
        },
        {path:'/ads/edit/:id',component:AdEdit,props:true},
        {
            path:'/ads/create',component: AdEdit
        },
        {path:'/admin_user/list',component: admin_userlist
        },
        {path:'/admin_user/edit/:id',component:admin_userEdit,props:true},
        {
            path:'/admin_user/create',component: admin_userEdit
        },
    ]
  }

]

const router = new VueRouter({
   routes
})
router.beforeEach((to,from,next)=>{
     console.log(to.meta)
    if(!to.meta.isPublic&&!localStorage.token)
    {
        return next ('/login')
    }
    next()
})
export default router
