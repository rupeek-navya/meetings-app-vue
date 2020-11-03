<template>
  <div>
      <AdminNavbar/>
      <v-data-table
      :headers="headers"
      :items="teams"
      :items-per-page="5"
      class="elevation-1">
      </v-data-table>
  </div>
</template>

<script>
import { fetchTeamData } from '../../services/admin'
import AdminNavbar from './AdminNavbar'
export default {
    name:'AdminTeams',
    components:{
        AdminNavbar
    },
    data(){
        return{
            teams:[],
            headers:[
                {text:'Team Id',value:'_id',align:'start',sortable:false},
                {text: 'Team Name',value: 'name'},
                {text:'Team Short Name',value:'email'},
                {text:'Description',value:'description'},
                {text:'Members',value:'members'},
                
            ]
        }
    },
    mounted(){
        fetchTeamData().then(res=>{
            this.teams=res
        })
    }
}
</script>

<style>

</style>