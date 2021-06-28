import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { homethree as bannerpost } from '../../../data/banner.json'
import { Rating } from '../../../helper/helper'

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 1,
            updateCount: 1
        };
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
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            centerMode: true,
            centerPadding: '80px',
            focusOnSelect: true,
            afterChange: () =>
                this.setState(state => ({ updateCount: state.updateCount + 1 })),
            beforeChange: (current, next) => this.setState({ slideIndex: next }),
            responsive: [{
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 991,
                settings: {
                    variableWidth: false,
                    centerPadding: '0px',
                    centerMode: false,
                    arrows: false,
                    autoplay: true,
                    slidesToShow: 1
                }
            }
            ]
        }
        return (
            <div className="banner banner-3">
                <Slider className="banner-slider-3" {...settings} ref={c => (this.slider = c)}>
                    {bannerpost.map((item, i) => (
                        <div key={i} className="banner-item">
                            <div className="banner-inner" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }}>
                                <h1 className="title">{item.title}</h1>
                                <div className="ct-rating-wrapper">
                                    <div className="ct-rating">
                                        {Rating(item.rating)}
                                    </div>
                                </div>
                                <div className="banner-text">
                                    <p className="subtitle">{item.shortdesc}</p>
                                    <div className="banner-icons-wrapper">
                                        <div className="banner-icon">
                                            <i className="flaticon-calories" />
                                            <div className="banner-icon-body">
                                                <h5>{item.calories}</h5>
                                                <span>Calories</span>
                                            </div>
                                        </div>
                                        <div className="banner-icon">
                                            <i className="flaticon-cheese" />
                                            <div className="banner-icon-body">
                                                <h5>{item.mozarella}g</h5>
                                                <span>Mozarella</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner-controls">
                                        <Link to="/menu-v1" className="btn-custom primary">Order <i className="flaticon-shopping-bag" /> </Link>
                                        <h4>${new Intl.NumberFormat().format((item.price).toFixed(2))}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="ct-arrows-wrapper">
                    <div className="slide-number">
                        <span className="current-slide"><span>{this.state.updateCount}</span></span> <span>/{bannerpost.length}</span>
                    </div>
                    <div className="ct-arrows">
                        <div className="slider-prev slick-arrow" onClick={this.previous}>
                            Previous
                        </div>
                        <div className="slider-next slick-arrow" onClick={this.next}>
                            Next
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;