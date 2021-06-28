import React, { Component } from 'react';

const successpost = [
    {
        icon: "flaticon-employee",
        count: 24934,
        title: "Happy Customers"
    },
    {
        icon: "flaticon-pizza-slice",
        count: 65317,
        title: "Pizzas Made"
    },
    {
        icon: "flaticon-cheese",
        count: 4658,
        title: "Cheese Rolls"
    },
    {
        icon: "flaticon-soda",
        count: 67335,
        title: "Drinks Served"
    }
]

class Infographics extends Component {
    render() {
        return (
            <div className="section section-padding bg-cover bg-center bg-parallax dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-2.jpg)" }}>
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h2 className="title text-white">Our success Story</h2>
                        <p className="subtitle text-white">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <div className="row">
                        {successpost.map((item, i) => (
                            <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                                <div className="ct-infographic-item">
                                    <i className={item.icon} />
                                    <h4>{new Intl.NumberFormat().format(item.count)}</h4>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Infographics;