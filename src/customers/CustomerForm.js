import React from "react";
import classnames from "classnames";

class CustomerForm extends React.Component {
  state = {
    _id: this.props.customer ? this.props.customer._id : null,
    cover: this.props.customer ? this.props.customer.cover : "",
    firstname: this.props.customer ? this.props.customer.name.firstname : "",
    lastname: this.props.customer ? this.props.customer.name.lastname : "",
    gender: this.props.customer ? this.props.customer.gender : "female",
    birthday: this.props.customer ? this.props.customer.birthday : "",
    lifetimevalue: this.props.customer ? this.props.customer.lifetimevalue : "",
    errors: {},
    loading: false
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      _id: nextProps.customer._id,
      cover: nextProps.customer.cover,
      firstname: nextProps.customer.name.firstname,
      lastname: nextProps.customer.name.lastname,
      gender: nextProps.customer.gender,
      birthday: nextProps.customer.birthday,
      lifetimevalue: nextProps.customer.lifetimevalue
    });
  };

  handleChange = e => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  setGender = e => {
    this.setState({
      gender: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.cover === "") errors.cover = "Can't be empty";
    if (this.state.firstname === "") errors.firstname = "Can't be empty";
    if (this.state.lastname === "") errors.lastname = "Can't be empty";
    if (this.state.birthday === "") errors.birthday = "Can't be empty";
    if (this.state.lifetimevalue === "")
      errors.lifetimevalue = "Can't be empty";

    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const {
        _id,
        cover,
        firstname,
        lastname,
        gender,
        birthday,
        lifetimevalue
      } = this.state;
      this.setState({ loading: true });
      this.props
        .saveCustomer({
          _id,
          cover,
          firstname,
          lastname,
          gender,
          birthday,
          lifetimevalue
        })
        .catch(err =>
          err.response
            .json()
            .then(({ errors }) => this.setState({ errors, loading: false }))
        );
    }
  };

  render() {
    const form = (
 <div>
   <br/>
   <h3 className="ui header">
  <i className="user plus icon"></i>
  <div className="content">
    New Customer
    <div className="sub header">Pleae enter following details</div>
  </div>
</h3>
      <form
        className={classnames("ui", "form","segment", { loading: this.state.loading })}
        onSubmit={this.handleSubmit}
      >
           <br/>
       

        {!!this.state.errors.global && (
          <div className="ui negative message">
            <p>{this.state.errors.global}</p>
          </div>
        )}


        <div className="field">
        <label>Name</label>
          <div className="two fields">
          <div
          className={classnames("field", {
            error: !!this.state.errors.firstname
          })}
        >
    
          <input
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
            id="firstname"
            placeholder="Firstname"
          />
          <span>{this.state.errors.firstname}</span>
        </div>
            <div
          className={classnames("field", {
            error: !!this.state.errors.lastname
          })}
        >
          <input
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
            id="lastname"
            placeholder="Lastname"
          />
          <span>{this.state.errors.lastname}</span>
        </div>
          </div>
        </div>

        <div
          className={classnames("field", { error: !!this.state.errors.cover })}
        >
          <label htmlFor="cover">Profile URL</label>
          <input
            name="cover"
            value={this.state.cover}
            onChange={this.handleChange}
            id="cover"
          />
          <span>{this.state.errors.cover}</span>
        </div>

   
       

        <div
          className={classnames("field", { error: !!this.state.errors.gender })}
        >
          <div className="grouped fields">
           
            <div className="field">
            <label>Gender</label>
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  checked={this.state.gender === "male"}
                  onClick={this.setGender}
                  value="male"
                />
                <label><i className="male icon"></i>Male</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  checked={this.state.gender === "female"}
                  onClick={this.setGender}
                  value="female"
                />
                <label><i className="female icon"></i>Female</label>
              </div>
            </div>
          </div>

          <span>{this.state.errors.gender}</span>
        </div>


        <div
          className={classnames("field", {
            error: !!this.state.errors.birthday
          })}
        >
         <div className="four wide field">
          <label htmlFor="birthday">BirthDay</label>
          <input
            type="date"
            name="birthday"
            value={this.state.birthday}
            onChange={this.handleChange}
            id="birthday"
          />
          <span>{this.state.errors.birthday}</span>
          </div>
        </div>

        <div
          className={classnames("field", {
            error: !!this.state.errors.lifetimevalue
          })}
        >
         <div className="four wide field">
          <label htmlFor="lifetimevalue">Life Time Value</label>
          <input
            name="lifetimevalue"
            value={this.state.lifetimevalue}
            onChange={this.handleChange}
            id="lifetimevalue"
          />
          <span>{this.state.errors.lifetimevalue}</span>
          </div>
        </div>

        

        <div className="field">
          {this.state.cover !== "" && (
            <img
              src={this.state.cover}
              alt="cover"
              className="ui small bordered image"
            />
          )}
        </div>

        <div className="field">
          <button className="positive fluid ui button">Save</button>
        </div>
      </form>
      </div>
    );
    return <div>{form}</div>;
  }
}

export default CustomerForm;
