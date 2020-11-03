<template>
<div>
    <AdminNavbar/>
    <v-app>
    <v-data-table
    :headers="headers"
    :items="meetings"
    :item-per-page="10"
    class="elevation-1"
    >
    </v-data-table>
    </v-app>
</div>
</template>

<script>
import AdminNavbar from './AdminNavbar'
import {fetchMeetingData} from '../../services/admin'
export default {
    name:'AdminMeetings',
    components:{
        AdminNavbar
    },
    data(){
        return{
            meetings:[],
            headers:[
                {text:'Meet Id',value:'_id',align:'start',sortable:false},
                {text: 'Meet Name',value: 'name'},
                {text:'Description',value:'description'},
                {text:'Attendees',value:'attendees'},
                {text: 'Start Time',value: 'startTime'},
                {text: 'End Time',value: 'endTime'},
                {text: 'Date',value: 'date'},
            ]
        }
    },
    mounted(){
        fetchMeetingData().then(res=>{
            this.meetings=res
        })
    }
}
</script>

<style>

</style>