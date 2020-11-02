<template>
  <div class="p-3 mb-2 bg-info text-white">
    <h2>
        Add a new meeting
    </h2>
    <hr /> 
    <form>
      <div class="form-group">
        <label for="date">Date</label>
        <input 
        class="form-control" 
        type="date" 
        id="date" 
        name="date">
      </div>
      <div class="form-group">
        <label for="startTime">Start time (hh:mm)</label>
        <div id="startTime">
          <select id="startHour">
            <option v-for="hr in 24" :key="hr" :value="hr-1">{{hr-1}}</option>
          </select>:
          <select id="startMin">
            <option v-for="min in 24" :key="min" :value="min-1">{{min-1}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="endTime">End time (hh:mm)</label>
        <div id="endTime">
          <select id="endHour">
            <option v-for="hr in 24" :key="hr" :value="hr-1">{{hr-1}}</option>
          </select>:
          <select id="endMin">
            <option v-for="min in 24" :key="min" :value="min-1">{{min-1}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="desc">Description</label>
        <textarea 
        class="form-control" 
        type="text" 
        id="desc" 
        name="desc"/>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input 
        class="form-control" 
        type="text" 
        id="name" 
        name="name">
      </div>
      <div class="form-group">
        <label for="attendees">Attendees</label>
        <input 
        class="form-control" 
        type="text" 
        id="attendees" 
        name="attendees">
      </div>
      <input type="submit" value="Add Meeting" @click="addMeeting">
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import {addNewMeeting,getSheetData} from '../services/meetings'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast);

export default {
  name:'AddMeeting',
  methods:{
    onFileUpload(e){
      var filePath= URL.createObjectURL(e.target.files[0])
      console.log(filePath)
      getSheetData(filePath).then(res=>{
        addNewMeeting(res).then(res=>{
          console.log(res.data)
        })
      })
    },
    addMeeting(e){
      e.preventDefault()
      let emailString=document.querySelectorAll('#attendees')[0].value.split(',') 
      const meeting={
        description:document.querySelectorAll('#desc')[0].value,
        name:document.querySelectorAll('#name')[0].value,
        date:document.querySelectorAll('#date')[0].value,
        startTime:{
          hours:document.querySelectorAll('#startHour')[0].value,
          minutes:document.querySelectorAll('#startMin')[0].value
        },
        endTime:{
          hours:document.querySelectorAll('#endHour')[0].value,
          minutes:document.querySelectorAll('#endMin')[0].value
        },
        attendees:emailString
      }
      addNewMeeting(meeting).then(()=>{
        Vue.$toast.success('Meeting added successfully !');
      })
      
    }
  }
}
</script>

<style>

</style>