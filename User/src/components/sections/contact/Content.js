import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTimeList } from '../../../store/actions/timelist.actions';
import moment from 'moment';
import { getUserInfo } from '../../../store/actions/content.actions';
// import L from 'leaflet';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// const customMarker = L.icon({
//     iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
//     iconSize: [32, 32],
// });

const latlng = [51.5, -0.09]

class Content extends Component {
    render() {
        return (
            <div className="contact-wrapper">
                <div className="ct-contact-map-wrapper">
                    <img src="assets/img/contactus.jpg" style={{width:'100%',height:'100%'}}/>
                </div>
                <div>
                    <div className="section section-padding">
                        <div className="container">
                            <div className="contact-info">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="ct-info-box">
                                            <i className="flaticon-location" />
                                            <h5>Find Us</h5>
                                            <span>Email: {this.props.userinfo.email}</span>
                                            <span>Whatsapp: +{this.props.userinfo.whatsapp} </span>
                                            <span>Instagram: {this.props.userinfo.instagram} </span>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="ct-info-box">
                                            <i className="fa fa-clock" />
                                            <h5>Opening Hours</h5>
                                            <ul className="text-black">
                                                <li>
                                                    <a href="#">Sunday
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="section pt-0">
                        <div className="container">
                            <div className="section-title-wrap">
                                <h2 className="title">Send us a Message </h2>
                                <p className="subtitle">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. There are many variations of passages
          </p>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="form-group col-lg-6">
                                        <input type="text" placeholder="First Name" className="form-control" name="fname" />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <input type="text" placeholder="Last Name" className="form-control" name="lname" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <input type="email" placeholder="Email Address" className="form-control" name="email" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <input type="text" placeholder="Subject" className="form-control" name="subject" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <textarea name="message" className="form-control" placeholder="Type your message" rows={8} />
                                    </div>
                                </div>
                                <button type="button" className="btn-custom primary" name="button">Send Message</button>
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}
const maptoStateProps = state => ({
    time_list: state.content.time_list,
    userinfo: state.content.userinfo
})
const maptoStateDispatch = dispatch => ({
    getTimeList: () => dispatch(getTimeList()),
    getUserInfo: () => dispatch(getUserInfo())
})
export default connect(maptoStateProps, maptoStateDispatch)(Content);