import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Admin from '../components/Admin/Admin'
import Role from '../components/Admin/role'
import merchantsMange from '../components/Admin/merchants'
import storeMange from '../components/Admin/store'
import foodMange from '../components/Admin/food'
import roleMange from '../components/Sources/views/1-1'
import userMange from '../components/Sources/views/1-3'
import sourceMange from '../components/Sources/views/1-2'
import willDo from '../components/Sources/views/1-4'
import merchantsInfor from '../components/Sources/views/2-1'
import storeInfor from '../components/Sources/views/3-1'
import foodInfor from '../components/Sources/views/4-1'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/admin',
      name:'admin',
      component:Admin,
      children:[
        {
          path:'roleMange',
          name:'1-1',
          component:roleMange
        },
        {
          path:'sourceMange',
          name:'1-2',
          component:sourceMange
        },
        {
          path:'userMange',
          name:'1-3',
          component:userMange
        },
        {
          path:'willDo',
          name:'1-4',
          component:willDo
        },
        {
          path:'role',
          name:'role',
          component:Role
        },
        {
          path:'merchantsInfor',
          name:'2-1',
          component:merchantsInfor
        },
        {
          path:'storeInfor',
          name:'3-1',
          component:storeInfor
        },
        {
          path:'merchantsMange',
          name:'2-2',
          component:merchantsMange
        },
        {
          path:'storeMange',
          name:'3-2',
          component:storeMange
        },
        {
          path:'foodInfor',
          name:'4-1',
          component:foodInfor
        },
        {
          path:'foodMange',
          name:'4-2',
          component:foodMange
        },
         {
           path:'',
           redirect:'roleMange'
         }
      ]
    }
  ]
})
