import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveCustomer, fetchCustomer, updateCustomer } from "../actions";
import CustomerForm from "./CustomerForm";

class CustomerFormPage extends React.Component {
  state = {
    redirect: false
  };

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchCustomer(match.params._id);
    }
  };

  saveCustomer = ({
    _id,
    cover,
    firstname,
    lastname,
    gender,
    birthday,
    lifetimevalue
  }) => {
    if (_id) {
      return this.props
        .updateCustomer({
          _id,
          cover,
          firstname,
          lastname,
          gender,
          birthday,
          lifetimevalue
        })
        .then(() => {
          this.setState({ redirect: true });
        });
    } else {
      return this.props
        .saveCustomer({
          cover,
          firstname,
          lastname,
          gender,
          birthday,
          lifetimevalue
        })
        .then(() => {
          this.setState({ redirect: true });
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/customers" />
        ) : (
          <CustomerForm customer={this.props.customer} saveCustomer={this.saveCustomer} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      customer: state.customers.find(item => item._id === match.params._id)
    };
  }

  return { customer: null };
}

export default connect(
  mapStateToProps,
  { saveCustomer, fetchCustomer, updateCustomer }
)(CustomerFormPage);
