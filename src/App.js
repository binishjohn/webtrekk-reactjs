import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import CustomersPage from './customers/CustomersPage';
import CustomerFormPage from './customers/CustomerFormPage';
import './App.css';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="ui container">



        <div className="ui three item menu inverted">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/customers" label="Customers" />
          <ActiveLink activeOnlyWhenExact to="/customers/new" label=" New Customer" />
        </div>

        <Route exact path="/customers" component={CustomersPage} />
        <Route path="/customers/new" component={CustomerFormPage} />
        <Route path="/customer/:_id" component={CustomerFormPage} />
      </div>
    );
  }
}

export default App;
