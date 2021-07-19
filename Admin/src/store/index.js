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
    
    if (localStorage.getItem('token') && localStorage.getItem('extime')) {
        const str = localStorage.getItem('extime');
        const data = JSON.parse(str);
        const old = data['t'];
        const time = new Date();
        const now = time.getTime();
        if ( now - old > 72000000) {
            localStorage.removeItem('extime');
            localStorage.removeItem('token');
            store.dispatch({type: 'LOGIN_USER_FAILURE'});
        }
        else {
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
