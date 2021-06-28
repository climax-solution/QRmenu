import React, { Component, Fragment } from 'react';
import Process from '../home-v2/Process';
import Newsletter from '../home-v2/Newsletter';
import Banner from './Banner';
import Infographics from './Infographics';
import Ordercta from './Ordercta';
import Instagram from './Instagram';
import Menucategories from './Menucategories';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <Menucategories/>
                <Infographics/>
                <Ordercta/>
                <div className="section pt-0">
                    <Process/>
                </div>
                <Instagram/>
                <Newsletter/>
            </Fragment>
        );
    }
}

export default Content;