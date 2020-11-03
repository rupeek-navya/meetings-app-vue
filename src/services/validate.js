import axios from 'axios'

export const generateToken=(email,password)=>{
    return axios.post('http://localhost:3000/api/auth/login',{
        email,
        password
    }).then(response=>{
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user',response.data.name)
        return response
    })
    .catch((error)=>{
        throw error.response.data.message
    })
}

export const onRegister=(email,password,name)=>{
    return axios.post(`http://localhost:3000/api/auth/register`,{
        name:name,
        email:email,
        password:password
    }).then(response=>{
        return response.data
    })
    .catch(error=>{
        throw error
    })
}

export const isAuthenticated=()=>{
    return !!localStorage.getItem('token')
}
export const getUser=()=>{
    return localStorage.getItem('user')
}
export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

