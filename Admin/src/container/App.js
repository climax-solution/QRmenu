/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Agency Layout
import AgencyLayout from './AgencyLayout';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import RctBoxedLayout from './RctBoxedLayout';
// CRM layout
import SignLayout from './SignLayout';
import Axios from 'axios';
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest }) =>
   <Route
      {...rest}
      render={props => <Component {...props} />}
   />;

class App extends Component {
   render() {
      const { location, match, user,permission } = this.props;
      console.log(user);
      if (location.pathname === '/' || !user && location.pathname.indexOf('sign') < 0 ) {
         return <Redirect to='/signin/signin' />;
      }
      else if (user == true && location.pathname.indexOf(permission) < 0) {
         return <Redirect to={`/${permission}`} />;
      }
      else if (location.pathname === '/admin') {
         return <Redirect to={'/admin/dashboard'} />;
      }
      else if (location.pathname === '/vendor' ) {
         console.log('VENDOR')

         return <Redirect to={'/vendor/dashboard'} />;
      }
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <Route
               path={`${match.url}admin`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route
               path={`${match.url}vendor`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route
               path={`${match.url}signin`}
               component={SignLayout}
            />
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user, permission } = authUser;
   return { user, permission };
};
export default connect(
   mapStateToProps,

)(App);
