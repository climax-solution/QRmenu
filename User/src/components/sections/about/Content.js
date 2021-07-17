import React, { Component, Fragment } from 'react';
import Aboutus from "../home/Aboutus";
import Teammembers from './Teammembers';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Aboutus />
            </Fragment>
        );
    }
}

export default Content;