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
import LoginLayout from './LoginLayout';
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
      const { location, match, user } = this.props;
      if (location.pathname === '/') {
         return <Redirect to={'/login'} />;
      }
      else if (location.pathname === '/app') {
         return <Redirect to={'/app/dashboard'} />;
      }
      else if (location.pathname === '/vendor') {
         return <Redirect to={'/vendor/dashboard'} />;
      }
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <Route
               path={`${match.url}app`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route
               path={`${match.url}vendor`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route path="/login" component={LoginLayout}/>
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user } = authUser;
   return { user };
};

export default connect(mapStateToProps)(App);
