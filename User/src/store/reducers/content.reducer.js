import { ADD_CART, EMPTY_CART, GET_CATEGORIES, GET_ITEMS, GET_SPECIALITIES, REMOVE_CART } from "../actions/types";

const initialState = {
    categories: [],
    items: [],
    specialities: [],
    cart_list: window.localStorage.getItem(window.location.host)
}

// eslint-disable-next-line import/no-anonymous-default-export
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
        case ADD_CART:
            window.localStorage.setItem(window.location.host, action.payload);
            return {
                ...state,
                cart_list: action.payload
            };
        case REMOVE_CART:
            console.log('ACTION_PAYLOAD',action.payload);
            window.localStorage.setItem(window.location.host, action.payload);
            return {
                ...state,
                cart_list: action.payload
            };
        case EMPTY_CART:
            window.localStorage.clear();
            return {
                ...state,
                cart_list: null
            }
        default:
            return state;
    }
}