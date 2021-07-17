import axios from "axios"
import { GET_TIMELIST } from "./types"
const sendData = {
    subdomain: window.location.host
}
export const getTimeList = () => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND_API + 'user/gettimelist', sendData).then(res=>{
        console.log('TimeList:=>', res.data);
        dispatch({
            type: GET_TIMELIST,
            payload: res.data
        })
    })
}