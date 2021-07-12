import { GET_CATEGORIES, GET_ITEMS, GET_SPECIALITIES } from "../actions/types";

const initialState = {
    categories: [],
    items: [],
    specialities: []   
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_SPECIALITIES:
            return {
                ...state,
                specialities: action.payload
            }
        default:
            return state;
    }
}