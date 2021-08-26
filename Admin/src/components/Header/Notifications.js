/**
 * Notification Component
 */
import React, { Component, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// api
import api from 'Api';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Axios from 'axios';
import dashboard from '../../routes/dashboard';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';

class Notifications extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
			all_item: 0,
			dashboard: []
		}
		this.setAllItem = this.setAllItem.bind(this);
		this.getNotifications = this.getNotifications.bind(this);
	}
	componentDidMount() {
		const headers = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}
		Axios.post(REACT_APP_BACKEND_API + 'getnotificationdata',{},headers).then(res=>{
		})
	}
	componentDidUpdate(preprops) {
		if (preprops != this.props) {
			Pusher.logToConsole = true;
			let pusher = new Pusher('a9d62f7653608deaa690', {
				cluster: 'mt1',
				forceTLS: true
			});
			const id = this.props.dashboard.id;
			let channel = pusher.subscribe('messages');
			const setAllItem = this.setAllItem;
			const getNotify = this.getNotifications;
			if (id > 1) {
				channel.bind('chat.'+id, function(data) {
					let all_item = 0;
					for (const key in data.list) {
						all_item += data.list[key];
					}
					setAllItem(all_item);
					getNotify(data.list);
				});
			}
		}
	}
	setAllItem(all_items) {
		console.log(this);
		let { all_item } = this.state;
		this.setState({
			all_item: all_items
		});
	}
	getNotifications(data) {
		let note_vendor;
		note_vendor = [
		{
			text:'New Orders Today',
			item_number: data['order'],
			url: 'liveorder'
		},
		{
			text:'New Reservation Today',
			item_number: data['reservation'],
			url: 'reservation'
		}
		];
		this.setState({ notifications: note_vendor });
	}

  render() {
    const { notifications, all_item } = this.state;
    return (
      all_item ? <UncontrolledDropdown nav className="list-inline-item notification-dropdown">
        <DropdownToggle nav className="p-0">
          <Tooltip title="Notifications" placement="bottom">
            <IconButton className="shake" aria-label="bell">
              <i className="zmdi zmdi-notifications-active"></i>
              <Badge color="danger" className="badge-xs badge-top-right rct-notify">{this.state.all_item}</Badge>
            </IconButton>
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu right>
			<div className="dropdown-content">
				<div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
					<span className="text-white font-weight-bold">
						<IntlMessages id="widgets.recentNotifications" />
					</span>
					{/* <Badge color="warning">1 NEW</Badge> */}
				</div>
				<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
					<ul className="list-unstyled dropdown-list">
					{notifications && notifications.map((notification, key) => (
						<li key={key}>
							<div className="media">
								<div className="media-body pt-5">
									<div className="d-flex justify-content-between">
										<h5 className="mb-5 text-primary">{notification.text}</h5>
										<span className="text-muted fs-12">{notification.item_number}</span>
									</div>
									<Button className="btn-xs mr-10" component={Link} to={`${notification.url}`}>
										<i className="zmdi zmdi-arrow-right mr-2"></i> <IntlMessages id="button.gopage" />
									</Button>
								</div>
							</div>
						</li>
					))}
					</ul>
				</Scrollbars>
			</div>
        </DropdownMenu>
      </UncontrolledDropdown>
	  : <span></span>
    );
  }
}
const mapToState = ({ authUser }) => ({
	dashboard: authUser.dashboarddata
});
export default connect(mapToState,null)(Notifications);
