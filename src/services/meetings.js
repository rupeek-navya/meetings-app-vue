import axios from 'axios'

export const getMeetingsByDate=(date)=>{
    return axios.get(`http://localhost:3000/api/meetings?date=${date}`,
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
export const getMeetingsBySearch=(date,searchItem)=>{
    return axios.get(`http://localhost:3000/api/meetings/search?period=${date}&search=${searchItem}`,
    {
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
    .then(response=>{
        return response
    })
    .catch(error => {
        console.log( error.message );
        return error
    });
}
export const removeUser=(meetId)=>{
    return axios.patch(`http://localhost:3000/api/meetings/${meetId}/remove`,{},{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
}
export const getAllUsers=()=>{
    return axios.get(`http://localhost:3000/api/users`)
    .then(res=>{
        return res.data
    })
    .catch(error=>{
        console.error(error)
        return error
    })
}
export const findEmail=(email)=>{
    return axios.get(`http://localhost:3000/api/users/${email}`)
    .then(res=>{
        return res.data
    })
    .catch(error=>{
        console.error(error)
        return error
    })
}
export const addAttendee=(meetId,userId,emailId)=>{
    console.log(emailId)
    return axios.patch(`http://localhost:3000/api/meetings/${meetId}/add`,[{
        userId:userId,
        email:emailId
    }],{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
}
export const getAttendees=(email)=>{
    return axios.get(`http://localhost:3000/api/users/${email}`).then(res=>{
        return res.data
    })
    .catch(error=>{
        console.error(error)
        return error
    })
}
export const addNewMeeting=(meeting)=>{
    return axios.post(`http://localhost:3000/api/meetings/add`,meeting,{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    })
}
export const getSheetData=(path)=>{
    console.log(path)
    return axios.post(`http://localhost:3000/api/meetings/addXls`,
    {pathValue:path},
    {
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    }).then(res=>{
        return res.data
    }).catch(error=>{
        return error
    })
}
