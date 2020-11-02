<template>
  <div>
    <div class="row" v-if="status === 'LOADING'">
        <div class="col-12">
            <!-- b4-alert-dismissible -->
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>Loading Teams...</strong>
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
        <div class="row">
            <div class="col-4 d-flex" v-for="(team,index) in teams" :key="team._id">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{{team.name}}</h4>
                        <div class="card-text">
                            <div>
                                @{{team.shortName}}
                            </div>
                            <div>
                                {{team.description}}
                            </div>
                            <div>
                                <button class="btn btn-danger" @click="removeMe(team._id,index)">Excuse Urselves</button>
                            </div>
                            <hr/>
                            <div>
                                Attendees:
                                <span v-for="team in team.members" :key="team.userId">
                                    {{team.email}}
                                </span>
                            </div>
                            <div>
                                <select id="teamUser">
                                    <option v-for="user in users" :key="user._id" :value="user.email">{{user.email}}</option>
                                </select>
                                <button class="btn btn-primary" @click="add(team._id,$event,index)">Add</button>
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
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';
import {getTeams,removeUser,addMember} from '../services/teams'
import {getAllUsers,findEmail} from '../services/meetings'
export default {
    name:'TeamsList',
    data(){
        return{
            status,
            teams:[],
            users:[]
        }
    },
    methods:{
        removeMe(teamId,index){
            removeUser(teamId).then(()=>{
                this.teams=[
                    ...this.teams.slice(0,index),
                    ...this.teams.slice(index+1)
                ]
            })  
        },
        add(teamId,event,index){
            const email=event.target.parentElement.children[0].value
            console.log(email)
            findEmail(email).then(res=>{
                addMember(teamId,res._id,email).then((res)=>{
                    console.log(res)
                     this.teams=[
                        ...this.teams.slice(0,index),
                        res,
                        ...this.teams.slice(index+1)
                    ]  
                    console.log(this.teams)
                })
            })
           
        }
    },
    mounted(){
        this.status=LOADING
        getTeams().then((res)=>{
            console.log(res)
            this.status=LOADED
            this.teams=res
            console.log(this.teams)
        }).catch(err=>{
            this.error=err
            this.status=ERROR_LOADING
        }),
        getAllUsers().then((res)=>{
            this.users=res
        })
    }
}
</script>

<style>

</style>