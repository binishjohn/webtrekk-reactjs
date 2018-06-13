import React from 'react';
import CustomerCard from './CustomerCard';

export default function CustomersList({ customers, deleteCustomer }) {
  const emptyMessage = (
    
    <div className="ui ignored info message">There are no customers yet in your collection.</div>
  );

  const customersList = (
    <div className="ui four cards">
      { customers.map(customer => <CustomerCard customer={customer} key={customer._id} deleteCustomer={deleteCustomer} />) }
    </div>
  );

  return (
    <div>
      {customers.length === 0 ? emptyMessage : customersList}
    </div>
  );
}

CustomersList.propTypes = {
  customers: React.PropTypes.array.isRequired,
  deleteCustomer: React.PropTypes.func.isRequired
}
