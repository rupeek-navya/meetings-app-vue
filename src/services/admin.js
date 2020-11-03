import axios from 'axios'

export function fetchUserData(){
    axios.get('http://localhost:3000/api/admin/users',{
        // headers:{
        //     'Authorization':localStorage.getItem('token')
        // } 
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        throw err
    })
}

export function fetchMeetingData(){
    axios.get('http://localhost:3000/api/admin/meetings',{
        // headers:{
        //     'Authorization':localStorage.getItem('token')
        // } 
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        throw err
    })
}

export function fetchTeamData(){
    axios.get('http://localhost:3000/api/admin/teams',{
        // headers:{
        //     'Authorization':localStorage.getItem('token')
        // } 
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        throw err
    })
}