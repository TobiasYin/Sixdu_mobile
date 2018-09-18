import Vue from 'vue'
import Router from 'vue-router'
// import IndexLayout from '../components/IndexLayout.vue'
import IndexPage from '../pages/IndexPage'
import ArticlesPage from '../pages/ArticlesPage'
import EssaysPage from '../pages/EssaysPage'
import MinePage from '../pages/MinePage'
import ArticlePage from '../pages/ArticlePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NewArticlePage from '../pages/NewArticlePage'
import NewEssayPage from '../pages/NewEssayPage'
import NewSecretPage from '../pages/NewSecretPage'
import NewSelfIntroduce from '../pages/NewSelfIntroducePage'
import UserPage from '../pages/UserPage'
import UserAllArticles from '../pages/UserAllArticles'
import UserAllEssays from '../pages/UserAllEssays'
import SecretsPage from '../pages/SecretsPage'
import SecretPage from '../pages/SecretPage'
import AboutPage from  '../pages/AboutPage'
import PasswdPage from '../pages/PasswdPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage,
      meta: {index: 0}
    },
    {
      path: '/articles',
      name: 'ArticlesPage',
      component: ArticlesPage,
      meta: {index: 1}
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage,
      meta: {index: 0}
    },
    {
      path: '/essays',
      name: 'EssaysPage',
      component: EssaysPage,
      meta: {index: 2}
    },
    {
      path: '/mine',
      name: 'MinePage',
      component: MinePage,
      meta: {index: 4}
    },
    {
      path: '/article/:id',
      component: ArticlePage,
      meta: {index: 5}
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {index: 7}
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: {index: 8}
    },
    {
      path: '/new_article',
      component: NewArticlePage,
      meta: {index: 6}
    },
    {
      path: '/user/:id',
      component: UserPage,
      meta: {index: 9}
    },
    {
      path: '/user_articles/:id',
      component: UserAllArticles,
      meta: {index: 10}
    },
    {
      path:'/user_essays/:id',
      component:UserAllEssays,
      meta:{index:11}
    },
    {
      path:'/new_essay',
      component:NewEssayPage,
      meta:{index:6}
    },
    {
      path:'/secrets',
      component:SecretsPage,
      meta:{index:3}
    },
    {
      path:'/secret/:id',
      component:SecretPage,
      meta:{index:5}
    },
    {
      path:'/new_secret',
      component:NewSecretPage,
      meta:{index:6}
    },
    {
      path:'/new_intro',
      component:NewSelfIntroduce,
      meta:{index:6}
    },
    {
      path:'/about',
      component:AboutPage,
      meta:{index:12}
    },
    {
      path:'/passwd',
      component:PasswdPage,
      meta:{index:7}
    }

    // {
    //   path:'/index',
    //   // name:IndexLayout,
    //   component:IndexLayout,
    //   children:[
    //     {
    //       path:'',
    //       component: IndexPage
    //     },
    //     {
    //       path:'index',
    //       component:IndexPage
    //     }
    //   ]
    // }
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }

})
