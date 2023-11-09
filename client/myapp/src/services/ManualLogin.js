import axios from 'axios'
export const manualLogin=(password,email)=>{
    return axios.post(`${process.env.REACT_APP_PORT}/user/login`,{email,password})
}
export const manualRegister=(password,email)=>{
    return axios.post(`${process.env.REACT_APP_PORT}/user`,{email,password})
}