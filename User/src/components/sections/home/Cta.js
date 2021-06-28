import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cta extends Component {
    render() {
        return (
            <div className="container">
                <div className="section text-center cta bg-cover bg-center dark-overlay dark-overlay-2 bg-parallax" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/bg/cta.jpg)" }}>
                    <div className="section-title-wrap section-header text-center">
                        <h5 className="custom-primary">Order Online</h5>
                        <h2 className="title text-white">Get 10% Off Your First Order</h2>
                        <p className="subtitle text-white">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <Link to="/menu-v1" className="btn-custom shadow-none">Order Online</Link>
                </div>
            </div>
        );
    }
}

export default Cta;