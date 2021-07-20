import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getTimeList } from '../../store/actions/timelist.actions';
import moment from 'moment';
class Footer extends Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    componentDidMount() {
        this.props.getTimeList();
    }
    render() {
        return (
            <footer className={this.props.footer.style}>
                {/* Middle Footer */}
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
                                <img src={process.env.PUBLIC_URL + "/" + this.props.footer.logo} alt="logo" style={{width: '200px'}}/>
                                <ul>
                                    <li><a href="#">Test Restaurant AS</a></li>
                                    <li><a href="#"><i className="fa fa-envelope text-white"></i>post@testinfo.no</a></li>
                                </ul>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Avaible Days</h5>
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
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Quick Links</h5>
                                <ul>
                                    <li> <Link to="/">Home</Link> </li>
                                    <li> <Link to="/reservation">Reservation</Link> </li>
                                    <li> <Link to="/about">About us</Link> </li>
                                    {/* <li> <Link to="/track-order">Track Order</Link> </li> */}
                                    <li> <Link to="/contact">Contact us</Link> </li>
                                    <li> <a href="http://localhost:4000">Login</a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-copyright text-center" style={{justifyContent:'center'}}>
                            <p>&copy; 2021 Test Restaurant AS </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const maptoStateProps = state => ({
    time_list: state.content.time_list
})
const maptoStateDispatch = dispatch => ({
    getTimeList: () => dispatch(getTimeList())
})
export default connect(maptoStateProps, maptoStateDispatch)(Footer);