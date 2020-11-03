<template>
  <div class="p-3 mb-2 bg-info text-white">
    <h2>
        Add a new Team
    </h2>
    <hr /> 
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" id="name" name="name">
      </div>
      <div class="form-group">
        <label for="short-name">Short Name</label>
        <input class="form-control" type="text" id="short-name" name="short-name">
      </div>
      <div class="form-group">
        <label for="desc">Description</label>
          <textarea class="form-control" type="text" id="desc" name="desc"/>
      </div>
      <div class="form-group">
        <label>Members</label>
        <input class="form-control" type="text" id="members" name="members">
      </div>
      <input type="submit" value="Add Team" @click="addTeam">
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import {addNewTeam} from '../services/teams'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast);

export default {
  name:'AddTeams',
  methods:{
    addTeam(e){
      e.preventDefault()
      let emailString=document.querySelectorAll('#members')[0].value.split(',') 
      const team={
        description:document.querySelectorAll('#desc')[0].value,
        name:document.querySelectorAll('#name')[0].value,
        shortName:document.querySelectorAll('#short-name')[0].value,
        members:emailString
      }
      addNewTeam(team).then(()=>{
        Vue.$toast.success('Team added successfully !');
      })
    }
  }
}
</script>

<style>

</style>