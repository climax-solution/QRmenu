/**
 * Notification Component
 */
import React, { Component } from 'react';
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

class Notifications extends Component {

  state = {
    notifications: []
  }

  componentDidMount() {
	  Axios.post(REACT_APP_BACKEND_API + 'getnotificationdata').then(res=>{
		  
	  })
    this.getNotifications();
  }

  // get notifications
  getNotifications() {
    // api.get('notifications.js')
    //   .then((response) => {
    //     this.setState({ notifications: response.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
	  let note_admin;
	  let note_vendor;
	  if (this.props.match.url == '/admin') {
		note_admin = [
			{
				userAvatar:'user-1',
				userName:'Ksenia',
				date:'2021-06-25',
				description:'Transaction 100USD using offline payment',
				type:'transaction',
				url: 'payment/transaction-history'
			},
			{
				userAvatar:'user-4',
				userName:'Yuris',
				date:'2021-06-25',
				description:'Yuris send request to update membership using offline payment',
				type:'offlinepayment',
				url: 'payment/offline-payment'

			},
			{
				userAvatar:'user-7',
				userName:'Ramos',
				date:'2021-06-25',
				description:'New Package added Successfully',
				type:'package',
				url:'userspackage'
			}
			
		];
        this.setState({ notifications: note_admin });
	  }
	  else {
		  note_vendor = [
			{
				userAvatar:'user-2',
				userName:'Ksenia',
				date:'2021-06-27',
				description:'New Order',
				type:'order',
				url: 'liveorder'
			},
			{
				userAvatar:'user-6',
				userName:'Yanka',
				date:'2021-06-25',
				description:'Transaction 100USD using PayPal payment',
				type:'transaction',
				url: 'paymenthistory'
			}
		  ];
		  this.setState({ notifications: note_vendor });
	  }
  }

  render() {
    const { notifications } = this.state;
    return (
      <UncontrolledDropdown nav className="list-inline-item notification-dropdown">
        <DropdownToggle nav className="p-0">
          <Tooltip title="Notifications" placement="bottom">
            <IconButton className="shake" aria-label="bell">
              <i className="zmdi zmdi-notifications-active"></i>
              <Badge color="danger" className="badge-xs badge-top-right rct-notify">{this.state.notifications.length}</Badge>
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
								<div className="mr-10">
									<img src={require(`Assets/avatars/${notification.userAvatar}.jpg`)} alt="user profile" className="media-object rounded-circle" width="50" height="50" />
								</div>
								<div className="media-body pt-5">
									<div className="d-flex justify-content-between">
										<h5 className="mb-5 text-primary">{notification.userName}</h5>
										<span className="text-muted fs-12">{notification.date}</span>
									</div>
									<span className="text-muted fs-12 d-block">{notification.description}</span>
									<Button className="btn-xs mr-10" component={Link} to={`${this.props.match.url}/${notification.url}`}>
										<i className="zmdi zmdi-eye mr-2"></i> <IntlMessages id="button.view" />
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
    );
  }
}

export default Notifications;
