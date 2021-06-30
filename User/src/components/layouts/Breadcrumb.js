import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nums: 1
        }
    }
    componentDidMount() {
        this.onChangeNums();
    }
    onChangeNums() {
        let nums = Math.floor(Math.random() * 3) + 1;
        if (nums > 2) nums = 1;
        this.setState({
            nums: nums
        })
    }
    render() {
        return (
            <div className="subheader dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-"+this.state.nums+".jpg)" }}>
                <div className="container">
                    <div className="subheader-inner">
                        <h1>{this.props.breadcrumb.pagename}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;