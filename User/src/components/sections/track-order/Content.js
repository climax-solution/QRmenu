import React, { Component, Fragment } from 'react';
import products from "../../../data/product.json";
import { NotificationManager, NotificationContainer } from 'react-notifications';
import axios from 'axios';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            filteredProducts: products,
            activeItem: -1,
            phone: '',
            id: ''
        };
    }

    getTrackOrder() {
        const  { phone, id } = this.state;
        if ( !phone || !id ) {
            NotificationManager.warning('Input is invalid!');
            return ; 
        }   
        const sendData = {
            phone: phone,
            id: id
        };

        axios.post(process.env.REACT_APP_BACKEND_API + 'user/gettrackorder',sendData).then(res=>{
            console.log(res);
        })
    }

    render() {
        const  { phone, id } = this.state;
        return (
            <Fragment>
                <NotificationContainer/>
                {/* Menu Wrapper Start */}
                <div className="section section-padding">
                    <div className="container">
                    <form style={{overflow:'hidden'}}>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                                <input type="text" placeholder="Phone Number" className="form-control" name="phone-number" value={phone} onChange={(e) => this.setState({ phone: e.target.value })}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                                <input type="text" placeholder="Order ID" className="form-control" name="order-id" value={id} onChange={(e) => this.setState({ id: e.target.value })} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                            <button type="button" className="btn-custom primary" name="button" style={{float:'right'}} onClick={()=>this.getTrackOrder()}>Check</button>
                            </div>
                        </div>
                        
                    </form>
                    </div>
                </div>
                {/* Menu Wrapper End */}
            </Fragment>
        );
    }
}

export default Content;