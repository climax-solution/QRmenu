import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../../../helper/Producthelper';
import { Rating } from "../../../helper/helper";
import productcategory from "../../../data/productcategory.json";
import blogtags from '../../../data/blogtags.json';
import { Tab, Nav, Accordion, Card, NavLink } from "react-bootstrap";
import Relatedproduct from '../../layouts/Relatedproduct';

class Content extends Component {
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
                <div className="section product-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                {/* Main Thumb */}
                                <div className="product-thumb">
                                    <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.name} />
                                </div>
                                {/* /Main Thumb */}
                            </div>
                            <div className="col-md-7">
                                <div className="product-content">
                                    {/* Product Title */}
                                    <h2 className="title">{item.name}</h2>
                                    {/* /Product Title */}
                                    <div className="favorite">
                                        <i className="far fa-heart" />
                                    </div>
                                    {/* Rating */}
                                    <div className="ct-rating-wrapper">
                                        <div className="ct-rating">
                                            {Rating(item.rating)}
                                        </div>
                                        <span>(24 ratings)</span>
                                    </div>
                                    {/* /Rating */}
                                    {/* Price */}
                                    <div className="price-wrapper">
                                        <p className="product-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$</p>
                                    </div>
                                    {/* /Price */}
                                    {/* Product Short Description */}
                                    <p>{item.shortdesc}</p>
                                    {/* /Product Short Description */}
                                    {/* Variations */}
                                    <div className="customize-variations">
                                        <div className="customize-size-wrapper">
                                            <h5>Size: </h5>
                                            {item.sizes.map((item, i) => (
                                                <div key={i} className={item.state ? 'customize-size active' : 'customize-size'}>
                                                    {item.size}"
                                                </div>
                                            ))}
                                        </div>
                                        <Accordion defaultActiveKey="Dough0" className="with-gap">
                                            {item.attributes.map((item, i) => (
                                                <Card key={i}>
                                                    <Accordion.Collapse eventKey={item.name + i} className="collapseparent">
                                                        <Card.Body>
                                                            <div className="customize-variation-wrapper">
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
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={NavLink} variant="link" eventKey={item.name + i}>
                                                            <i className={item.icon} /> {item.name}
                                                        </Accordion.Toggle>
                                                    </Card.Header>
                                                </Card>
                                            ))}
                                        </Accordion>
                                    </div>
                                    {/* /Variations */}
                                    {/* Add To Cart Form */}
                                    <form className="atc-form" method="post">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <div className="qty">
                                                <span className="qty-subtract" onClick={this.DecreaseItem}><i className="fa fa-minus" /></span>
                                                <input type="text" name="clicks" value={this.state.clicks} onChange={this.handleChange.bind(this)} />
                                                <span className="qty-add" onClick={this.IncrementItem}><i className="fa fa-plus" /></span>
                                            </div>
                                        </div>
                                        <button type="submit" name="button" className="btn-custom secondary"> Order <i className="fas fa-shopping-cart" /> </button>
                                    </form>
                                    {/* /Add To Cart Form */}
                                    {/* Product Meta */}
                                    <ul className="product-meta">
                                        <li>
                                            <span>Categories: </span>
                                            <div className="product-meta-item">
                                                {item.category.slice(0, 2).map((category) => (
                                                    productcategory.filter(item => {
                                                        return item.id === category
                                                    }).map((categories, i) => (
                                                        <Link key={i} to="#">{categories.title}, </Link>
                                                    ))
                                                ))}
                                            </div>
                                        </li>
                                        <li>
                                            <span>Tags: </span>
                                            <div className="product-meta-item">
                                                {item.tags.slice(0, 4).map((tag) => (
                                                    blogtags.filter(item => {
                                                        return item.id === tag
                                                    }).map((tags, i) => (
                                                        <Link key={i} to={"/blog/tag/" + tags.id}>{tags.title}, </Link>
                                                    ))
                                                ))}
                                            </div>
                                        </li>
                                        <li>
                                            <span>SKU: </span>
                                            <div className="product-meta-item">
                                                <span>{item.sku}</span>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* /Product Meta */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section pt-0">
                    <div className="container">
                        {/* Additional Information Start */}
                        <div className="product-additional-info">
                            <Tab.Container defaultActiveKey="tab1">
                                <Nav variant="tabs" className="nav">
                                    <Nav.Item>
                                        <Nav.Link eventKey="tab1">Description</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tab2">Reviews ({item.reviews.length})</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tab1">
                                        <h4>Description</h4>
                                        <div dangerouslySetInnerHTML={{ __html: item.longdescription }} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <h4>Leave a Review</h4>
                                        <div className="ct-rating-wrapper">
                                            <div className="ct-rating">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </div>
                                            <span>Your Review</span>
                                        </div>
                                        {/* Review Form start */}
                                        <div className="comment-form">
                                            <form method="post">
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <input type="text" className="form-control" placeholder="Full Name" name="fname" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <input type="email" className="form-control" placeholder="Email Address" name="email" />
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <textarea className="form-control" placeholder="Type your comment..." name="comment" rows={7} />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-custom primary" name="button">Post Review</button>
                                            </form>
                                        </div>
                                        {/* Review Form End */}
                                        {/* Reviews Start */}
                                        <div className="comments-list">
                                            <ul>
                                                {item.reviews.map((review, i) => (
                                                    <li key={i} className="comment-item">
                                                        <img src={process.env.PUBLIC_URL + "/" + review.img} alt={review.name} />
                                                        <div className="comment-body">
                                                            <h5>{review.name}</h5>
                                                            <div className="ct-rating">
                                                                {Rating(item.rating)}
                                                            </div>
                                                            <span>Posted on: {review.date}</span>
                                                            <p>{review.comment}College in Virginia</p>
                                                            <Link to="#" className="reply-link"> Reply </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Reviews End */}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                        {/* Additional Information End */}
                    </div>
                </div>
                <Relatedproduct />
            </Fragment>
        );
    }
}

export default Content;