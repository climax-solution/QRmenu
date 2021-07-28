import { SET_PACKAGELIST } from "../actions/types";

const initialState = {
    package_list: []
}
export default (state = initialState , action) => {
    switch (action.type) {
        case SET_PACKAGELIST:
            return {
                ...state,
                package_list: action.payload
            }
    
        default:
            return state;
    }
}