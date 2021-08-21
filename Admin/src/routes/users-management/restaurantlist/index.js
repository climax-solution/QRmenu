/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import MUIDataTable from "mui-datatables";
import {Button as MatButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { InputLabel, Select, MenuItem, FormControl, Checkbox, FormControlLabel, FormGroup,FormHelperText,Input} from '@material-ui/core';
import { Button } from 'reactstrap';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';

 export default class RestaurantList extends Component {

    state = {
        source:[],
        tmp: [],
        open: false,
        package_list: [],
        activeTmp: {},
        activeItem: {
            id: '',
            username: '',
            subdomain: '',
            package: '',
            whatsapp: '',
            youtube: '',
            facebook: '',
            website: '',
            twitter: '',
            instagram: ''
        }
    }
    componentDidMount() {
        Axios.get(REACT_APP_BACKEND_API + 'restaurantlist').then(res=>{
            const { data } = res;
            let { source } = this.state;
            data.map((item, index)=>{
                let row = [];
                row.push(item.username);
                row.push(item.email);
                row.push(item.package_name);
                row.push(moment(item.created_at).format('Y-MM-DD'));
                row.push(item.status);
                source.push(row);
            })
            this.setState({
                source: source,
                tmp: res.data
            })
        })
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
        Axios.get(REACT_APP_BACKEND_API + 'pkglist',{},{headers: headers}).then(res=>{
            this.setState({
                package_list: res.data.data
            })
        })
    }

    updatestatus(index, status) {
        const sendData = {
            id: this.state.tmp[index].id,
            status: status
        }
        Axios.post(REACT_APP_BACKEND_API + 'updateuser', sendData).then(res=>{
            const { data } = res;
            let source = [];
            data.map((item, index)=>{
                let row = [];
                row.push(item.username);
                row.push(item.email);
                row.push(item.package);
                row.push(moment(item.created_at).format('Y-MM-DD'));
                row.push(item.status);
                source.push(row);
            })
            this.setState({
                source: source,
                tmp: res.data
            })
            NotificationManager.success('Success');
        })
    }

    resetPassword(index) {
        const senddata = {
            id: this.state.tmp[index].id
        }
        
        Axios.post(REACT_APP_BACKEND_API + 'resetpassword', senddata).then(res=>{
            const { data } = res;
            if (data.status) NotificationManager.success('Password is 1234');
        })
        .catch(err=>{
            NotificationManager.success('Failure');
        })
    }

    modalOpen(index) {
        const { tmp, activeItem } = this.state;
        const item = tmp[index];
        for (const key in activeItem) {
            activeItem[key] = !item[key] ? '' : item[key];
        }
        this.setState({
            open: true,
            activeItem: activeItem,
            activeTmp: tmp[index]
        })
    }

    updateItem() {
        const { activeItem } = this.state;
        Axios.post(REACT_APP_BACKEND_API + 'updateuser', activeItem).then(res=>{
            console.log(res);
        })
    }
     render() {
        const { tmp, open, package_list, activeItem, activeTmp } = this.state;
        const columns = [
            {
                name: "Username",
                options: {
                    customBodyRender: (value, meta) => {
                        return (<a
                            href={
                                tmp[meta.rowIndex].subdomain
                                ? 'https://'+tmp[meta.rowIndex].subdomain
                                : '#'
                            }
                        >
                            {value}
                        </a>)
                    }
                }
            },
            {
                name: "Email Address",                
            },
            {
                name: "Package",                
            },
            {
                name: "Created Date",                
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon btn-info" style={{minWidth:'inherit'}} onClick={()=>this.modalOpen(tableMeta.rowIndex)}><i className="zmdi zmdi-edit"></i></MatButton>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.resetPassword(tableMeta.rowIndex)}><i className="zmdi zmdi-lock-outline"></i></MatButton>
                            {value == 0 ? <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.updatestatus(tableMeta.rowIndex, 1)}><i className="zmdi zmdi-flash"></i></MatButton>
                            : <MatButton variant="contained" className="mr-10 mb-10 text-white btn-danger btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.updatestatus(tableMeta.rowIndex, 0)}> <i className="zmdi zmdi-flash-off"></i></MatButton>}
                        </div>
                        
                    )
                }
            }
        ];
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Restaurant List</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.restaurantlist" />} match={this.props.match} />
                 <RctCollapsibleCard heading="Restaurant List" fullBlock>
					<MUIDataTable
						title={"Restaurant List"}
						data={this.state.source}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
                <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">User Management</DialogTitle>
                    <DialogContent>
                        <DialogContentText>User</DialogContentText>
                        <div className="row">                        
                            <div className="col-md-12" >
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Username"
                                    type="text"
                                    value={activeItem.username}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, username: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="url"
                                    label="Site domain"
                                    type="text"
                                    value={activeItem.subdomain}
                                    disabled={!activeTmp.subdomain ? false : true }
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, subdomain: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <Select
                                    value={activeItem.package}
                                    className="mt-30"
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, package: e.target.value}
                                        })
                                    }
                                >
                                    {
                                        package_list.map((item,index) => {
                                            return <MenuItem value={item.id} key={index}>{item.package_name}</MenuItem>

                                        })
                                    }
                                </Select>
                                <TextField
                                    margin="dense"
                                    id="whatsapp"
                                    label="Whatsapp Number"
                                    type="text"
                                    value={activeItem.whatsapp}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, whatsapp: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="youtube"
                                    label="Youtube"
                                    type="text"
                                    value={activeItem.youtube}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, youtube: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="facebook"
                                    label="Facebook"
                                    type="text"
                                    value={activeItem.facebook}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, facebook: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="website"
                                    label="Website"
                                    type="text"
                                    value={activeItem.website}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, website: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="twitter"
                                    label="Twitter"
                                    type="text"
                                    value={activeItem.twitter}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, twitter: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="instagram"
                                    label="Instagram"
                                    type="text"
                                    value={activeItem.instagram}
                                    onChange={
                                        (e)=>this.setState({
                                            activeItem: {...activeItem, instagram: e.target.value}
                                        })
                                    }
                                    fullWidth
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>this.setState({open: false})} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={() => this.updateItem()} className="btn-info text-white">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
             </div>
         );
     }
 }
 