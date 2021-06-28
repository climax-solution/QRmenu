/**
 * Pricing Component
 */
 import React from 'react';
 import { Button } from 'reactstrap';
 
 // component
 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages'
 
 const PricingBlockV1 = ({ planType, type, price, users, handleClickOpen, features, color }) => (
    <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4">
       <div className="pricing-icon mb-40">
          <img src={require('Assets/img/pricing-icon.png')} alt="pricing icon" className="img-fluid" width="" height="" />
       </div>
       <h2 className={`text-${color} pricing-title`}><IntlMessages id={type} /></h2>
       <div className="mb-25">
          {planType === 'free' ?
             <h2 className="amount-title"><IntlMessages id={price} /></h2>
             : <h6 className="amount-title">Kr{price}/Monthly</h6>
          }
          <span className="text-muted small">For {users} user</span>
       </div>
       <ul className="price-detail list-unstyled">
          {features.map((feature, key) => (
             <li key={key} className="text-left"><i className="ti-check" style={{fontWeight: 'bold', color: 'green'}}></i>{feature}</li>
          ))}
       </ul>
       <Button color={color} className='btn-block btn-lg' onClick={handleClickOpen}>
          <IntlMessages id="Edit Feature" />
       </Button>
    </RctCollapsibleCard>
 );
 
 export default PricingBlockV1;
 