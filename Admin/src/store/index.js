import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers';
import Axios from 'axios';
import { StepIcon } from '@material-ui/core';

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(Thunk))
    );

    if (localStorage.getItem('token')) {
        const headers = {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post('http://localhost:8000/api/check-token', {}, {headers: headers}).then(res=>{
            console.log(res);
            store.dispatch({type: 'LOGIN_USER_SUCCESS',permission: res.data.data.permission});
        }).catch((err)=>{
            console.log(err);
            // localStorage.clear();
            store.dispatch({type: 'LOGIN_USER_FAILURE'});
        });
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
