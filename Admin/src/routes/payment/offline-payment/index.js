/**
 * Offline Payment
 */
import React, { Component, Fragment  } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import { Scrollbars } from 'react-custom-scrollbars';
import {Badge,Button} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import axios from 'axios';
import swal from 'sweetalert';

export default class OfflinePayment extends Component {
    state = {
        data: [],
        tmp: []
    }
    componentDidMount() {
        axios.get(REACT_APP_BACKEND_API + 'offlinepayment').then(res=>{
            let { data } = this.state;
            res.data.map((row,index)=>{
                let item = [index + 1];
                const key = ['username','email','package','price','created_at','status','status'];
                key.map(it=>{
                    if (it == 'created_at') item.push(moment(row[it]).format('Y-MM-DD'));
                    else item.push(row[it]);
                })
                data.push(item);
            })
            this.setState({
                data: data,
                tmp: res.data
            });
        })
    }

    approve(index) {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const { tmp } = this.state;
                const sendData = {
                    email: tmp[index]['username'],
                    id: tmp[index]['id']
                }
                axios.post(REACT_APP_BACKEND_API + 'approvetransaction', sendData).then(res=>{
                    const { status } = res.data;
                    if (status) {
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });   
                    }
                })
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }

    render() {
        //console.log(this.state.data);
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Username"
            },
            {
                name: "Email"
            },
            {
                name: "Package"
            },
            {
                name: "Price",
                
            },
            {
                name: "Request Date"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (value == 0 ? <span className="badge badge-info">pending</span>
                        :  <span className="badge badge-success">success</span>)
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Button variant="contained" color="primary" disabled={value == 1 ? true : false} onClick={()=>this.approve(tableMeta.rowIndex)}>
                            Approve<i className="ti-arrow-circle-right"></i>
                        </Button>
                    )
                }
            }
        ];
        const data = this.state.data;
        const options = {
            filterType: 'dropdown',
            responsive: 'stacked'
        };
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Offline Payment</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.offlinepayment" />} match={this.props.match} />
                <Fragment>
                    <Scrollbars className="rct-scroll" autoHeight  autoHeightMin={500} autoHeightMax={700} autoHide >
                        <RctCollapsibleCard heading="Offline Payment" fullBlock>
                            <MUIDataTable
                                title={"Offline Payment"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </RctCollapsibleCard>
                    </Scrollbars>
                </Fragment>
            </div>
        );
    }
 }