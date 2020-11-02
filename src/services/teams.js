import axios from 'axios'

export const getTeams=()=>{
    return axios.get(`http://localhost:3000/api/teams`,
    {
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
    .then(response=>{
        return response.data
    })
    .catch(error => {
        console.log( error.message );
        return error
    });
}

export const removeUser=(teamId)=>{
    return axios.patch(`http://localhost:3000/api/teams/${teamId}/remove`,{},{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
}

export const addMember=(teamId,userId,emailId)=>{
    console.log(emailId)
    return axios.patch(`http://localhost:3000/api/teams/${teamId}/add`,[{
        userId:userId,
        email:emailId
    }],{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    }).then(res=>{
        return res.data
    })
    .catch(err=>{
        return err
    })
}

export const addNewTeam=(team)=>{
    return axios.post(`http://localhost:3000/api/teams/add`,team,{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
}


