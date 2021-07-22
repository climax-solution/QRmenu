import axios from "axios";
import { GET_CATEGORIES, GET_ITEMS, GET_SPECIALITIES, SET_EMAIL } from "./types";

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

export const getEmail = () => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND_API+'user/getuseremail',datas).then(res=>{
        dispatch({
            type: SET_EMAIL,
            payload: res.data.email
        })
    })
}