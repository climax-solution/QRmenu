/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
// components
import SupportPage from '../Support/Support';

// redux action
import { logoutUserFromFirebase } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false
	}

	/**
	 * Logout User
	 */
	logoutUser() {
		this.props.logoutUserFromFirebase();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	onLogout () {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		 }
		 Axios.get(REACT_APP_BACKEND_API + 'logout', {}, {headers: headers}).then(res=>{
			console.log(res);
			localStorage.clear();
			window.location.href = '/';

		 });
	}
	render() {
		const {match} = this.props;
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							className="d-flex align-items-center"
						>
							<div className="user-profile">
								<img
									src={require('Assets/avatars/profile.jpg')}
									alt="user profile"
									className="img-fluid rounded-circle"
									width="50"
									height="100"
								/>
							</div>
							<div className="user-info">
								<span className="user-name ml-4">{
									match.url == '/admin' ? 'Admin' : 'Assistant'
								}</span>
								<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="border-top">
									<a onClick={() => this.onLogout()}>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<IntlMessages id="widgets.logOut" />
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
}

export default connect(mapStateToProps, {
	logoutUserFromFirebase
})(UserBlock);
