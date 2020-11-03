<template>
<div>
    <AdminNavbar/>
    <v-app>
    <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
    >
    </v-data-table>
    </v-app>
</div>
</template>

<script>
import {fetchUserData} from '../../services/admin'
import AdminNavbar from './AdminNavbar'
export default {
    name:'AdminUsers',
    components:{
        AdminNavbar
    },
    data(){
        return{
            users:[],
            headers:[
                {text:'User Id',value:'_id',align:'start',sortable:false},
                {text: 'User Name',value: 'name'},
                {text:'Email',value:'email'},
            ]
        }
    },
    mounted(){
        fetchUserData().then(res=>{
            this.users=res
        })
    }
}
</script>