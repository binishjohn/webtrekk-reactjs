import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerCard({ customer, deleteCustomer }) {
  return (
    <div className="ui card">
      <div className="image">
        <img src={customer.cover} alt="Customer Cover" />
      </div>
      <div className="content">
        <div className="header"> {customer.firstname} {customer.lastname}</div>
        <div className="meta">
          <i className={`icon  ${customer.gender}`} />
          <span className="info ProperCase">{customer.gender}</span>
          <span className="info right floated">{customer.birthday}</span>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/customer/${customer._id}`} className="ui basic button green">Edit</Link>
          <div className="ui basic button red" onClick={() => deleteCustomer(customer._id)}>Delete</div>
        </div>
      </div>
    </div>
  );
}

CustomerCard.propTypes = {
  customer: React.PropTypes.object.isRequired,
  deleteCustomer: React.PropTypes.func.isRequired
}