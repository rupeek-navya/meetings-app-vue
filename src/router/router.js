import Vue from 'vue'
import Router from 'vue-router'
import {isAuthenticated} from '../services/validate'
Vue.use(Router)

const router= new Router({
    mode:'history',
    routes:[
        {
            name:'login',
            path:'/',
            component:()=>import('@/components/LoginPage')
        },
        {
            name:'adminUsers',
            path:'/admin/users',
            component:()=>import('@/components/admin/AdminUsers')
        },
        {
            name:'adminMeetings',
            path:'/admin/meetings',
            component:()=>import('@/components/admin/AdminMeetings')
        },
        {
            name:'adminTeams',
            path:'admin/teams',
            component:()=>import('@/components/admin/AdminTeams')
        },
        {
            name:'admin',
            path:'/admin',
            component:()=>import('@/components/admin/AdminNavbar'),
        },
        {
            name:'calendar',
            path:'/calendar',
            component:()=>import('@/components/Calendar')
        },
        {
            name:'validate',
            path:'/validate',
            component:()=>import('@/services/validate')
        },
        {
            name: 'meetings',
            path: '/meetings',
            component: () => import( '@/components/Meetings' ),
            children: [
                {
                    name: "search-meeting",
                    path: "",
                    component: () => import("@/components/FilterMeetings")
                },
                {
                    name: "add-meeting",
                    path: "add",
                    component: () => import("@/components/AddMeeting")
                }
            ]
        },
        {
            name: 'teams',
            path: '/teams',
            component: () => import( '@/components/Team' ),
            children: [
                {
                    name: "search-team",
                    path: "",
                    component: () => import("@/components/TeamsList")
                },
                {
                    name: "add-team",
                    path: "add",
                    component: () => import("@/components/AddTeams")
                }
            ]
        }
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.name!=='login' && !isAuthenticated()){
        next({name:'login'})
    }
    else{
        next()
    }
})

export default router