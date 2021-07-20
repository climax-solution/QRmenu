import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cartitem from '../../../data/cartlist.json';
import { Accordion, NavLink } from 'react-bootstrap';
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import validator from 'validator';
import { connect } from 'react-redux';
import { getTimeList } from '../../../store/actions/timelist.actions';
import moment from 'moment';

const priceTotal = cartitem.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        guest_number: '',
        table_reservation: '',
        reservation_date: '',
        comments: ''
    }
    placeReservation() {
        const state = this.state;
        const data = {
            order_name: state.name,
            email: state.email,
            phone: state.phone,
            guest_number: state.guest_number,
            table_reservation: state.table_reservation,
            reservation_date: state.reservation_date,
            comments: state.comments,
            subdomain: window.location.host
        }
        let flag = 0;
        for (let key in data) {
            if ( data[key] === '') {
                flag = 1;
            }
        }

        if (flag || !validator.isEmail(data['email'])) {
            console.log(data, flag);
            NotificationManager.error('Input is invalid!');
            return;
        }
        axios.post(process.env.REACT_APP_BACKEND_API + 'user/placereservation',data).then(res=>{
            const { data } = res;
            if (data.status) {
                NotificationManager.success('Success');
            }
            else {
            }
        })
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <form method="post" action="javascript:myFunction();">
                        <div className="row">
                            <div className="col-xl-7">
                                {/* Buyer Info */}
                                <h4>Billing Details</h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>Name</label>
                                        <input type="text" placeholder="Name" name="name" className="form-control" required value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Reservation Date <span className="text-danger">*</span></label>
                                        <input type="date" name="reservation-date" className="form-control" value={this.state.reservation_date} onChange={(e)=>this.setState({reservation_date: e.target.value})} required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Email <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})} required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Phone <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Phone" name="phone" className="form-control" value={this.state.phone} onChange={(e)=>this.setState({phone: e.target.value})} required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Number of Guest <span className="text-danger">*</span></label>
                                        <input type="number" name="number-guest" className="form-control" value={this.state.guest_number} onChange={(e)=>this.setState({guest_number: e.target.value})} required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Table Reservation</label>
                                        <select className="form-control" value={this.state.table_reservation} onChange={(e)=>this.setState({table_reservation: e.target.value})}>
                                            <option value="">select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group col-xl-12 mb-0">
                                        <label>Any Special Request?</label>
                                        <textarea name="name" rows={5} className="form-control"  value={this.state.comments} onChange={(e)=>this.setState({comments: e.target.value})} required/>
                                    </div>
                                    <div className="form-group col-xl-12 mb-0 mt-2">
                                        <button type="button" className="btn btn-primary pull-right ml-auto" style={{float: 'right'}} onClick={()=>this.placeReservation()}>Submit</button>
                                    </div>
                                </div>
                                {/* /Buyer Info */}
                            </div>
                            <div className="col-xs-5">
                                <h2>Time List</h2>
                                <ul>
                                    <li>
                                        <a href="#">Sunday
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.sun_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.sun_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Monday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.mon_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.mon_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Tuesday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.tue_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.tue_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Wednesday&nbsp;&nbsp;
                                            <i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.wed_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.wed_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Thursday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.thu_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.thu_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Friday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.fri_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.fri_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Saturday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-clock"></i>&nbsp;&nbsp;
                                            {
                                                moment(new Date(this.props.time_list.sat_mor)).format('LT')
                                            }
                                            ~
                                            {
                                                moment(new Date(this.props.time_list.sat_aft)).format('LT')
                                            }
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <NotificationContainer/>
                </div>
            </section>
        );
    }
}

const maptoStateProps = state => ({
    time_list: state.content.time_list
})
const maptoStateDispatch = dispatch => ({
    getTimeList: () => dispatch(getTimeList())
})
export default connect(maptoStateProps, maptoStateDispatch)(Content);