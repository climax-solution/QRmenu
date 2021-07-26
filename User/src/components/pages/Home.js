import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/home/Content';
const pagelocation = 'Homepage';

class Home extends Component {
    componentDidMount() {
        //console.log('Did Mount => ');
    }
    render() {
        //console.log(process.env);
        return (
            <Fragment>
                <MetaTags>
                    <title>{pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags> 
                <Header/>
                <Content/>
                <Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/qrcode.png" }} />
            </Fragment>
        );
    }
}

export default Home;