import React, { Component, Fragment } from 'react';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import axios from 'axios';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            list: [],
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
            const { data } = res;
            if (data.length) {
                this.setState({
                    list: data
                })
            }
            else {
                NotificationManager.info('No order exist');
            }
        })
    }

    render() {
        const  { phone, id, list } = this.state;
        return (
            <Fragment>
                <NotificationContainer/>
                {/* Menu Wrapper Start */}
                {
                    !list.length  &&
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
                }
                {
                    list.length  &&
                    <table className="ct-responsive-table mt-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price(NOK)</th>
                                <th>Qty</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, i) => (
                                <tr key={i}>
                                    <td>{ i + 1 }</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={process.env.REACT_APP_BACKEND_HOST + 'images/'+ item.img_url } alt={item.img_url}/>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>
                                        <span
                                            className={`p-1 badge-${
                                                item.status == '0' ? 'info' : item.status == '1' ? 'primary' : item.status == '2' ? 'success' : 'danger'
                                            }`}
                                        >
                                            {
                                                item.status == '0' ? 'Requested' : item.status == '1' ? 'Accepted' : item.status == '2' ? 'Completed' : 'Blocked'
                                            }
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {/* Menu Wrapper End */}
            </Fragment>
        );
    }
}

export default Content;