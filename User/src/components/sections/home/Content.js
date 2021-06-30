import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Products from './Products';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <div className="section products-section">
                    <Products />
                </div>
            </Fragment>
        );
    }
}

export default Content;