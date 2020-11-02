<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
      <ul class="nav navbar-nav mr-auto">
          <li class="nav-item ">
              <router-link class="nav-link" to="/calendar" exact>Calendar</router-link>
          </li>
          <li class="nav-item ">
              <router-link class="nav-link" to="/meetings" exact>Meetings</router-link>
          </li>
          <li class="nav-item ">
              <router-link class="nav-link" to="/teams" exact>Teams</router-link>
          </li>
      </ul>
      <ul class="nav navbar-nav">
        <li class="nav-item">
            <span class="nav-link">Hi {{this.user}}</span>
        </li>
        <li class="nav-item">
            <span class="nav-link cursor-pointer" @click="logout">Log out</span>
        </li>
      </ul>  
  </nav>
</template>

<script>
import {getUser,logout} from '../services/validate'
export default {
    name:'Navbar',
    data(){
        return{
            user:getUser()
        }
    },
    methods:{
        logout(){
            logout()
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style>

</style>