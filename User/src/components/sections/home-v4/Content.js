import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Aboutus from '../home/Aboutus';
import Menu from './Menu';
import Gallery from './Gallery';
import Blog from './Blog';
import Contactmap from './Contactmap';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <Aboutus/>
                <Menu/>
                <Gallery/> 
                <Blog/>
                <Contactmap/>
            </Fragment>
        );
    }
}

export default Content;