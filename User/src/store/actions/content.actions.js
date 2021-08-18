import axios from "axios";
import { GET_CATEGORIES, GET_ITEMS, GET_SPECIALITIES, SET_USERINFO } from "./types";

const datas = {
    subdomain: window.location.host
}

export const getItems = () => dispatch => {    
    axios.post(process.env.REACT_APP_BACKEND_API+'user/getitemlist', datas).then(res=>{
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    })    
}

export const getCategories = () => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND_API+'user/getcategorylist',datas).then(res=>{
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    })
}

export const getSpecialities = () => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND_API+'user/getspeciallist',datas).then(res=>{
        dispatch({
            type: GET_SPECIALITIES,
            payload: res.data
        })
    })
}

export const getUserInfo = () => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND_API+'user/getuserinfo',datas).then(res=>{
        dispatch({
            type: SET_USERINFO,
            payload: res.data
        })
    })
}