import React, { Component } from 'react';
import { pizzamenu } from '../../../data/menu.json';

class Menu extends Component {
    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h5 className="custom-primary">Pizza Menu</h5>
                        <h2 className="title">Explore Our Menu</h2>
                        <p className="subtitle">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      </p>
                    </div>
                    <div className="row">
                        {pizzamenu.map((item, i) => (
                            <div key={i} className="col-lg-6">
                                <div className="ct-mini-menu-item">
                                    <div className="ct-mini-menu-top">
                                        <h5>{item.title}</h5>
                                        <div className="ct-mini-menu-dots" />
                                        <span className="custom-primary">{new Intl.NumberFormat().format((item.price).toFixed(2))}$</span>
                                    </div>
                                    <div className="ct-mini-menu-bottom">
                                        <p>{item.shortdesc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;