<template>
<div>
    <Navbar/>
    <div class="container my-4">
        <router-view></router-view>
        <div class="p-3 mb-2 bg-info text-black">
            <div class="row">
                <div class="col-12 clearfix">
                    <h1>
                        Calendar
                    </h1>
                    <hr />
                    <span style="font-size:2em">{{selectedDate}}</span>
                    <input 
                    type="date" 
                    class="float-right" 
                    @change="dateChangeHandler($event)" 
                    :value="selectedDate">
                </div>
            </div>
            <div class="row" v-if="status === 'LOADING'">
                <div class="col-12">
                    <!-- b4-alert-dismissible -->
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button 
                        type="button" 
                        class="close" 
                        data-dismiss="alert" 
                        aria-label="Close">
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
                        <button type="button" 
                        class="close" 
                        data-dismiss="alert" 
                        aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>{{this.error.message}}</strong>
                    </div>
                </div>
            </div>
            <div v-if="status === 'LOADED'">
                <div v-for="meeting in meetings" :key="meeting._id">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h4 class="card-title">{{meeting.name}}</h4>
                            <div class="card-text">
                                <span>
                                    {{meeting.startTime.hours}}:{{meeting.startTime.minutes}}
                                </span>-
                                <span>
                                    {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}
                                </span>
                                <div>{{meeting.description}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</div>
</template>

<script>
import Navbar from './Navbar'
import {getMeetingsByDate} from '../services/meetings'
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';
export default {
    name:"Calendar",
    components:{
        Navbar,
    },
    data() {
        return {
            selectedDate: (new Date()).toISOString().substr( 0, 10 ),
            status: LOADING,
            meeting:[]
        };
    },
    methods:{
        dateChangeHandler(e){
            this.selectedDate=e.target.value
            this.fetch(this.selectedDate)
        },
        fetch(date){
            this.status=LOADING
            getMeetingsByDate(date)
            .then(meetings=>{
                this.status = LOADED;
                this.meetings=meetings
        })
        .catch(err=>{
            this.status = ERROR_LOADING
            this.error=err
        })
        }
        
    },
    mounted(){
        this.fetch(this.selectedDate)
    }
}
</script>

<style>

</style>