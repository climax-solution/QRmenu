import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers';
import axios from 'axios';
import { StepIcon } from '@material-ui/core';
import { ACTIVE_DASHBOARD_DATA } from '../actions/types';

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(Thunk))
    );
    
    if (localStorage.getItem('token') && localStorage.getItem('extime')) {
        const str = localStorage.getItem('extime');
        const data = JSON.parse(str);
        const old = data['t'];
        const time = new Date();
        const now = time.getTime();
        if ( now - old > 36000000) {
            localStorage.removeItem('extime');
            localStorage.removeItem('token');
            store.dispatch({type: 'LOGIN_USER_FAILURE'});
            console.log('STR',str);
        }
        else {
            if ( data['p'] == 'admin' ) {
                axios.post(REACT_APP_BACKEND_API + 'admindashboard').then(res=>{
                    store.dispatch({
                        type: ACTIVE_DASHBOARD_DATA,
                        payload: res.data
                    })
                })
            }
            else {
                const headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                axios.post(REACT_APP_BACKEND_API + 'vendordashboard', {}, headers).then(res=>{
                    store.dispatch({
                        type: ACTIVE_DASHBOARD_DATA,
                        payload: res.data
                    })
                })
            }
            store.dispatch({type: 'LOGIN_USER_SUCCESS',permission: data['p'], activedpkg: data['g'] });
        }

    }
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
