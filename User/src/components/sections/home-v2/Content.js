import React, { Component, Fragment } from 'react';
import Products from '../home/Products';
import Testimonials from '../home/Testimonials';
import Banner from './Banner';
import Categories from './Categories';
import Newsletter from './Newsletter';
import Offer from './Offer';
import Process from './Process';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <div className="section">
                    <Process />
                </div>
                <Categories />
                <div className="section pt-0 products-section">
                    <Products />
                </div>
                <Offer />
                <Testimonials />
                <Newsletter />
            </Fragment>
        );
    }
}

export default Content;