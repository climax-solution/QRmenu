import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerthree';
import Footer from '../layouts/Footer';
import Content from '../sections/error/Content';

const pagelocation = 'Error 404'

class Error extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Slices - React Template | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/bg/pattern.jpg)" }}>
                    <Header />
                    <Content />
                    <Footer footer={{ style: "ct-footer footer-dark", logo: "assets/img/logo-light.png" }} />
                </div>
            </Fragment>
        );
    }
}

export default Error;