import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import products from "../../../data/product.json";
import productcategory from "../../../data/productcategory.json";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false,
                    autoplay: true
                }
            }]
        }
        return (
            <div className="section pt-0 category-section">
                <div className="container">
                    {/* Arrow */}
                    <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                    <Slider className="category-slider" {...settings} ref={c => (this.slider = c)}>
                        {products.map((item, i) => (
                            <div key={i} className="ct-category category-2">
                                <div className="ct-category-desc">
                                    {item.category.slice(0, 1).map((category) => (
                                        productcategory.filter(item => {
                                            return item.id === category
                                        }).map((cat, i) => (
                                            <h5 className="custom-primary" key={i}>{cat.title}</h5>
                                        ))
                                    ))}
                                    <h3>{item.name}</h3>
                                    <p>{item.shortdesc}</p>
                                    <Link to={"/menu-item-v1/" + item.id} className="btn-custom">Order Now</Link>
                                </div>
                                <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.name} />
                            </div>
                        ))}
                    </Slider>
                    {/* Arrow */}
                    <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                </div>
            </div>
        );
    }
}

export default Categories;