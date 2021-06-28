import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const processpost = [
    {
        icon: "flaticon-online-booking",
        title: "Order",
        text: "There are many variations of passages of Lorem Ipsum available"
    },
    {
        icon: "flaticon-calories",
        title: "Cook",
        text: "There are many variations of passages of Lorem Ipsum available"
    },
    {
        icon: "flaticon-delivery-man",
        title: "Deliver",
        text: "There are many variations of passages of Lorem Ipsum available"
    },
    {
        icon: "flaticon-food-tray",
        title: "Enjoy",
        text: "There are many variations of passages of Lorem Ipsum available"
    }
]

class Process extends Component {
    render() {
        return (
            <div className="container">
                <div className="section-title-wrap section-header text-center">
                    <h5 className="custom-primary">How We Do It</h5>
                    <h2 className="title">We Deliver Your Food In 4 Steps</h2>
                    <p className="subtitle">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                </div>
                <div className="row infographics-2">
                    {processpost.map((item, i) => (
                        <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ct-infographic-item">
                                <i className={item.icon} />
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="section-btn">
                    <Link to="/menu-v1" className="btn-custom">Order Online</Link>
                </div>
            </div>
        );
    }
}

export default Process;