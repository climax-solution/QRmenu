import axios from "axios"
import { SET_PACKAGELIST } from "./types"
const datas = {
    subdomain: window.location.host
}
export const getPackageList = () => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND_API + 'user/getpackagelist',datas).then(res=>{
        const { data } = res;
        dispatch({
            type: SET_PACKAGELIST,
            payload: data
        })
    })
}
