/**
 * Pricing Component
 */
 import React from 'react';
 import { Button } from 'reactstrap';
 
 // component
 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages'
 const Items = [
   'Velkommen side',
   'Meny',
   'Pakker',
   'Spesialiteter',
   'QR kode',
   'Whatsapp bestilling',
   'Online bestilling',
   'Reservasjon',
   'Kontakter',
   'Digital betaling'
];
const green = {fontWeight: 'bold', color: 'green'};
const red = {fontWeight: 'bold', color: 'red'};
 const PricingBlockV1 = ({ planType, type, price, users, editPackage, deletePackage, features, color, ability,id }) => (
    <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4" id={id}>
       <div className="pricing-icon mb-40">
          <img src={require('Assets/img/pricing-icon.png')} alt="pricing icon" className="img-fluid" width="" height="" />
       </div>
       <h2 className={`text-${color} pricing-title`}><IntlMessages id={type} /></h2>
       <div className="mb-25">
          {planType === 'free' ?
             <h2 className="amount-title"><IntlMessages id={price} /></h2>
             : <h6 className="amount-title">Kr{price}/Mo</h6>
          }
          <span className="text-muted small">For {users} user</span>
       </div>
       <ul className="price-detail list-unstyled">
          {features.map((feature, key) => (
             <li key={key} className="text-left"><i className={`${!ability[key] ? 'ti-close' : 'ti-check'}`} style={ability[key] ? green : red}></i> {feature}</li>
          ))}
       </ul>
       <Button className='btn-info' onClick={editPackage}>
          <IntlMessages id="Edit" />
       </Button>
       <Button className='btn-danger ml-10' onClick={deletePackage}>
          <IntlMessages id="Remove" />
       </Button>
    </RctCollapsibleCard>
 );
 
 export default PricingBlockV1;
 