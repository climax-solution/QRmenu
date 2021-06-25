/**
 * Rct Collapsible Card
 */
import React, { Component, Fragment } from 'react';
import { Collapse, Badge } from 'reactstrap';
import classnames from 'classnames';

// rct section loader
import RctSectionLoader from '../RctSectionLoader/RctSectionLoader';
import Switch from 'react-toggle-switch';
class RctCollapsibleCard extends Component {

    state = {
        reload: false,
        collapse: true,
        close: false,
        status: true,
    }

    onCollapse() {
        this.setState({ collapse: !this.state.collapse });
    }

    onReload() {
        this.setState({ reload: true });
        let self = this;
        setTimeout(() => {
            self.setState({ reload: false });
        }, 1500);
    }

    onCloseSection() {
        this.setState({ close: true });
    }

    onSetting() {
        this.setState({
            status: !this.state.status
        });
    }
    render() {
        const { close, reload, collapse } = this.state;
        const { children, collapsible, closeable, reloadable, heading, fullBlock, colClasses, customClasses, headingCustomClasses, contentCustomClasses, badge, setable, customStyle } = this.props;
        return (
            <div className={classnames(colClasses ? colClasses : '', { 'd-block': !collapse })}>
                <div className={classnames(`rct-block ${customClasses ? customClasses : ''}`, { 'd-none': close })} style={customStyle}>
                    {heading &&
                        <div className={`rct-block-title ${headingCustomClasses ? headingCustomClasses : ''}`}>
                            <h4>{heading} {badge && <Badge className="p-1 ml-10" color={badge.class}>{badge.name}</Badge>}</h4>
                            {(collapsible || reloadable || closeable || setable) &&
                                <div className="contextual-link">
                                    {collapsible && <a href="javascript:void(0)" onClick={() => this.onCollapse()}><i className="ti-minus"></i></a>}
                                    {reloadable && <a href="javascript:void(0)" onClick={() => this.onReload()}><i className="ti-reload"></i></a>}
                                    {closeable && <a href="javascript:void(0)" onClick={() => this.onCloseSection()}><i className="ti-close"></i></a>}
                                    {setable && <Switch onClick={()=>this.onSetting()} on={this.state.status}/>}
                                </div>
                            }
                        </div>
                    }
                    <Collapse isOpen={collapse}>
                        <div className={classnames(contentCustomClasses ? contentCustomClasses : '', { "rct-block-content": !fullBlock, 'rct-full-block': fullBlock })}>
                            {children}
                        </div>
                    </Collapse>
                    {reload && <RctSectionLoader />}
                </div>
            </div>
        );
    }
}

export default RctCollapsibleCard;
