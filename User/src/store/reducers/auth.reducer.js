import { AUTH } from "../actions/types";

const initialState = {
    test: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                ...state
            }
        default:
            return {
                ...state
            };
            break;
    }
}