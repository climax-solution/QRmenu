import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import insta from '../../../data/insta.json';

class Instagram extends Component {
    render() {
        return (
            <div className="section pt-0">
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h5 className="custom-primary">Instagram</h5>
                        <h2 className="title">We Love Sharing What We Do</h2>
                        <p className="subtitle">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <div className="row">
                        {insta.slice(0, 6).map((item, i) => (
                            <div key={i} className="col-lg-4 col-md-4 col-sm-4 col-6">
                                <Link to="#" className="ct-ig-item ig-2">
                                    <img src={process.env.PUBLIC_URL + "/" + item.img} alt="insta" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Instagram;