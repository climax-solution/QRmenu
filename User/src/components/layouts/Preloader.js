import React, { Component } from 'react';

class Preloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchSuccess: false
        }
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            this.setState({
                fetchSuccess: true
            });
        });
    }
    render() {
        const preloaderhidden = this.state.fetchSuccess ? 'hidden' : '';
        return (
            <div className={`ct-preloader ${preloaderhidden}`}>
                <div className="ct-preloader-inner">
                    <div className="lds-ripple"><div /><div /></div>
                </div>
            </div>
        );
    }
}

export default Preloader;