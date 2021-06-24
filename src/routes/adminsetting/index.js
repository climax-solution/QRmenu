/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import Switch from '@material-ui/core/Switch';
import { FormGroup, FormControlLabel, FormControl, TextField, Button,Radio,RadioGroup,FormLabel } from '@material-ui/core';
 
 export default class AdminSetting extends Component {
    state = {
        selectedValue: 'english'
    }
    handleChange = (event) => {
        this.setState({
            selectedValue: event.target.value
        })
    };
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Admin Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.adminsetting" />} match={this.props.match} />
                 <div className="row">
                    <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
						heading={<IntlMessages id="Site Settings"/>}
						collapsible
						closeable
						fullBlock
					>
                        <FormControl style={{display: 'block',padding:'20px'}}>
                            <FormLabel>Languages</FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue="english">
                                <FormControlLabel value="english" control={<Radio color="primary"/>} label="English"/>
                                <FormControlLabel value="norway" control={<Radio color="primary" />} label="Norway" />
                            </RadioGroup>
                            <FormGroup className="mt-30" aria-label="position" style={{display: 'block',padding:'20px'}} row>

                                <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-10" style={{float:'right'}}>
                                    <i class="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Currency</FormLabel>
                            
                        </FormControl>
                    </RctCollapsibleCard>
                 </div>
             </div>
         );
     }
 }
 