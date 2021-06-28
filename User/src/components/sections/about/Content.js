import React, { Component, Fragment } from 'react';
import Aboutus from "../home/Aboutus";
import Infographics from "../home-v3/Infographics";
import Newsletter from "../home-v2/Newsletter";
import Teammembers from './Teammembers';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Aboutus />
                <Infographics/>
                <Teammembers/>
                <Newsletter/>
            </Fragment>
        );
    }
}

export default Content;