import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { home as bannerpost } from '../../../data/banner.json'

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider2.slickNext();
    }
    previous() {
        this.slider2.slickPrev();
    }
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
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
                    arrows: false,
                }
            }]
        }
        const settingsthumb = {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    autoplay: true
                }
            }
            ]
        }
        return (
            <div className="banner banner-1 bg-cover">
                <div className="imgs-wrapper">
                    <img src={process.env.PUBLIC_URL + "/assets/img/veg/11.png"} alt="veg" className="d-none d-lg-block" />
                </div>
                <Slider className="banner-slider" {...settings} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
                    {bannerpost.map((item, i) => (
                        <div key={i} className="banner-item">
                            <div className="banner-inner">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6">
                                            <h1 className="title">{item.title}</h1>
                                            <h4>{item.subtitle}</h4>
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
                                        <div className="col-xl-6 col-lg-6">
                                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="banner-slider-nav">
                    <div className="container">
                        {/* Arrow */}
                        <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                        <Slider className="banner-slider-nav-inner" {...settingsthumb} asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)}>
                            {bannerpost.map((item, i) => (
                                <div key={i} className="banner-nav-item">
                                    <div className="banner-nav-item-inner">
                                        {item.offer === true ? <div className="sale"> <div className="sale-inner"> Offer </div> </div> : ""}
                                        <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                        <div className="banner-nav-item-body">
                                            <h5>{item.category}</h5>
                                            {
                                                item.discount > 0 || item.discount !== '' ? <span>{new Intl.NumberFormat().format((item.price * (100 - item.discount) / 100).toFixed(2))}$</span> : ''
                                            }
                                            <span>{new Intl.NumberFormat().format((item.price).toFixed(2))}$</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        {/* Arrow */}
                        <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;