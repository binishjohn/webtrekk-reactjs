import React from "react";
import CustomersList from "./CustomersList";
import { connect } from "react-redux";
import { fetchCustomers, deleteCustomer } from "../actions";

class CustomersPage extends React.Component {
  componentDidMount() {
    this.props.fetchCustomers();
  }

  render() {
    return (
      <div>
        <br/>
        <h3 className="ui header">
          <i className="user  icon" />
          <div className="content">
            Customers
            <div className="sub header">List of customers</div>
          </div>
        </h3>

        <CustomersList
          customers={this.props.customers}
          deleteCustomer={this.props.deleteCustomer}
        />
      </div>
    );
  }
}

CustomersPage.propTypes = {
  customers: React.PropTypes.array.isRequired,
  fetchCustomers: React.PropTypes.func.isRequired,
  deleteCustomer: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    customers: state.customers
  };
}

export default connect(
  mapStateToProps,
  { fetchCustomers, deleteCustomer }
)(CustomersPage);
