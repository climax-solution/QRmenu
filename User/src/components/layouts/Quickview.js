import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { getProduct } from '../../helper/Producthelper'

class Quickview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 1
        };
    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    };

    DecreaseItem = () => {
        if (this.state.clicks < 1) {
            this.setState({
                clicks: 0,
            });
        } else {
            this.setState({
                clicks: this.state.clicks - 1,
            });
        }
    };
    handleChange(event) {
        this.setState({ clicks: event.target.value });
    }
    render() {
        const productId = this.props.productId;
        const item = getProduct(productId);
        return (
            <Fragment> 
                <Modal.Header className="modal-bg" closeButton style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} />
                <Modal.Body>
                    <div className="customize-meta">
                        <h4 className="customize-title">{item.name} <span className="custom-primary">{new Intl.NumberFormat().format((item.price).toFixed(2))}$</span> </h4>
                        <p>{item.shortdesc}</p>
                    </div>
                    <div className="customize-variations">
                        <div className="customize-size-wrapper">
                            <h5>Size: </h5>
                            {item.sizes.map((item, i) => (
                                <div key={i} className={item.state ? 'customize-size active' : 'customize-size'}>
                                    {item.size}"
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {/* Variation Start */}
                            {item.attributes.slice(0,3).map((item, i) => (
                                <div key={i} className="col-lg-4 col-12">
                                    <div className="customize-variation-wrapper">
                                        <i className={item.icon} />
                                        <h5>{item.name}</h5>
                                        {item.items.map((add, i) => (
                                            <div key={i} className="customize-variation-item">
                                                <div className={"custom-control custom-" + item.type}>
                                                    <input type={item.type} id={add.title + i} name={item.name} className="custom-control-input" />
                                                    <label className="custom-control-label" htmlFor={add.title + i}>{add.title}</label>
                                                </div>
                                                <span>+{new Intl.NumberFormat().format((add.addprice).toFixed(2))}$</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {/* Variation End */}
                        </div>
                    </div>
                    <div className="customize-controls">
                        <div className="qty">
                            <span className="qty-subtract" onClick={this.DecreaseItem}><i className="fa fa-minus" /></span>
                            <input type="text" name="clicks" value={this.state.clicks} onChange={this.handleChange.bind(this)} />
                            <span className="qty-add" onClick={this.IncrementItem}><i className="fa fa-plus" /></span>
                        </div>
                        <div className="customize-total" data-price={new Intl.NumberFormat().format((item.price).toFixed(2))}>
                            <h5>Total Price: <span className="final-price custom-primary">{new Intl.NumberFormat().format((item.price).toFixed(2))} <span>$</span> </span> </h5>
                        </div>
                    </div>
                    <button type="button" className="btn-custom btn-block">Order Now</button>
                </Modal.Body>
            </Fragment>
        );
    }
}

export default Quickview;