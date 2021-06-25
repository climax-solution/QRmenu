/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

class DefaultLayout extends Component {
	render() {
		const { match, location } = this.props;
		if (location.pathname === '/app') {
			return (<Redirect to={'/app/dashboard'} />);
		}
		console.log(match);
		return (
			<RctAppLayout>
				{routerService && routerService.map((route,key)=>
					(route.divide.indexOf(match.url) > -1) && 
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					
				)}
			</RctAppLayout>
		);
	}
}

export default withRouter(connect(null)(DefaultLayout));
