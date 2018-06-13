export const SET_CUSTOMERS = 'SET_CUSTOMERS';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const CUSTOMER_FETCHED = 'CUSTOMER_FETCHED';
export const CUSTOMER_UPDATED = 'CUSTOMER_UPDATED';
export const CUSTOMER_DELETED = 'CUSTOMER_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setCustomers(customers) {
  return {
    type: SET_CUSTOMERS,
    customers
  }
}

export function addCustomer(customer) {
  return {
    type: ADD_CUSTOMER,
    customer
  }
}

export function customerFetched(customer) {
  return {
    type: CUSTOMER_FETCHED,
    customer
  }
}

export function customerUpdated(customer) {
  return {
    type: CUSTOMER_UPDATED,
    customer
  }
}

export function customerDeleted(customerId) {
  return {
    type: CUSTOMER_DELETED,
    customerId
  }
}

export function saveCustomer(data) {
  return dispatch => {
    return fetch('/api/customers', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addCustomer(data.customer)));
  }
}

export function updateCustomer(data) {
  return dispatch => {
    return fetch(`/api/customers/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(customerUpdated(data.customer)));
  }
}

export function deleteCustomer(id) {
  return dispatch => {
    return fetch(`/api/customers/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(customerDeleted(id)));
  }
}

export function fetchCustomers() {
  return dispatch => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => dispatch(setCustomers(data.customers)));
  }
}

export function fetchCustomer(id) {
  return dispatch => {
    fetch(`/api/customers/${id}`)
      .then(res => res.json())
      .then(data => dispatch(customerFetched(data.customer)));
  }
}
