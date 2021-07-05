/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

class DefaultLayout extends Component {
	render() {

		const { match, location, permission } = this.props;

		if (location.pathname === '/admin') {
			return (<Redirect to={'/admin/dashboard'} />);
		}
		else if (location.pathname === '/vendor') {
			return (<Redirect to={'/vendor/dashboard'} />);
		}
		return (
			<RctAppLayout>
				{routerService && routerService.map((route,key)=> 
					(route.divide && route.divide.indexOf(match.url) > -1) && route.path == 'overviewprofile' ? <Route key={key} path='http://localhost:3000' component={route.component} /> : <Route key={key} path={`${match.url}/${route.path}`} component={route.component} /> )
				}
			</RctAppLayout>
		);
	}
}

const mapStateToProps = ({ authUser }) => {
   const { user, permission } = authUser;
   return { user, permission };
};
export default withRouter(connect(mapStateToProps)(DefaultLayout));

