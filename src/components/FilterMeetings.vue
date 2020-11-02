<template>
    <div>
        <div class="p-3 mb-2 bg-info text-white">
            <h3>
                Search for meetings
            </h3>
            <hr /> 
            <form>
                <div class="form-group">
                    <label>Date:</label>
                    <select class="custom-select mr-sm-2" id="period">
                        <option selected value="present">Today</option>
                        <option value="past">Past</option>
                        <option value="future">Future</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Search for:</label>
                    <div>
                        <textarea 
                        class="form-control" 
                        name="description" 
                        rows="3" 
                        id="description"/>
                    </div>
                </div>
                <input type="submit" value="search" @click="searchMeeting($event)">
            </form>
        </div>
        <div class="row" v-if="status === 'LOADING'">
            <div class="col-12">
                <!-- b4-alert-dismissible -->
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>Loading Meetings...</strong>
                </div>
            </div>
        </div>
        <div class="row" v-if="status === 'ERROR_LOADING'">
            <div class="col-12">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>{{this.error.message}}</strong>
                </div>
            </div>
        </div>
      <div v-if="status === 'LOADED'">
            <div v-for="(meeting,index) in meetings" :key="meeting._id">
                <div class="card mb-2">
                    <div class="card-body">
                        <h4 class="card-title" >
                            <span v-html="modifyDateFormat(meeting.date)"></span>
                        </h4>
                        <div class="card-text">
                            <div>
                                {{meeting.startTime.hours}}:{{meeting.startTime.minutes}}-
                                {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}
                            </div>
                            <div>{{meeting.name}}</div>
                            <div>
                                <button class="btn btn-danger" @click="remove(meeting._id,index)">Excuse Urselves</button>
                            </div>
                            <hr/>
                            <div>
                             Attendees:
                            <span v-for="attendee in meeting.attendees" :key="attendee.userId">
                                {{attendee.email}}
                            </span>
                            </div>
                            <div>
                                <select id="user">
                                    <option v-for="user in users" :key="user._id" :value="user.email">{{user.email}}</option>
                                </select>
                                <button class="btn btn-primary" @click="add(meeting._id,$event,index)">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
  </div>
</template>

<script>

import {getMeetingsBySearch,removeUser,getAllUsers,findEmail,addAttendee} from '../services/meetings'
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';
export default {
    name:'FilterMeetings',
    data(){
        return{
            meetings:[],
            status,
            users:[]
        };
    },
    methods:{
        modifyDateFormat(isoDate){
            const date = new Date( isoDate );
            return date.toDateString();
        },
        searchMeeting(e){
            if(e){
                e.preventDefault()
            }
            const period=e.target.parentElement.children[0].children[1].value
            const searchItem=e.target.parentElement.children[1].children[1].children[0].value
            this.status=LOADING
            getMeetingsBySearch(period,searchItem).then((res)=>{
                this.status=LOADED
                this.meetings=res.data
            }).catch(err=>{
                console.error(err)
                this.status=ERROR_LOADING
            })
            
        },
        remove(meetId,index){
            console.log(index)
            removeUser(meetId).then(()=>{
                this.meetings=[
                    ...this.meetings.slice(0,index),
                    ...this.meetings.slice(index+1)
                ]
            })  
        },
        add(meetId,event,index){
            const email=event.target.parentElement.children[0].value
            findEmail(email).then(res=>{
                addAttendee(meetId,res._id,email).then((res)=>{
                    this.meetings=[
                        ...this.meetings.slice(0,index),
                        res.data,
                        ...this.meetings.slice(index+1)
                    ] 
                })
            })
        }
    },
    mounted(){
        getAllUsers().then((res)=>{
            this.users=res
        })
    }
}
</script>

<style>

</style>