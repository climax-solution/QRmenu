/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    ACTIVE_DASHBOARD_DATA 
} from 'Actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    user: false,
    loading: false,
    permission: '',
    dashboarddata: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: true,permission: action.permission, activedpkg: action.activedpkg };

        case LOGIN_USER_FAILURE:
            return { ...state, loading: false, user: false };

        case LOGOUT_USER:
            return { ...state, user: null };

        case SIGNUP_USER:
            return { ...state, loading: true };

        case SIGNUP_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };

        case SIGNUP_USER_FAILURE:
            return { ...state, loading: false };
        case ACTIVE_DASHBOARD_DATA:
            return { ...state, dashboarddata: action.payload}
        default: return { ...state };
    }
}
