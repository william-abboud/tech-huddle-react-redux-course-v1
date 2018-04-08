import React, { Component } from 'react';
import withMediaQuery from '../hocs/media-query-hoc';

class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.prepareDataForSubmission = this.prepareDataForSubmission.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      country: "",
      error: false,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  prepareDataForSubmission() {
    const data = Object.assign({}, this.state);

    delete data.error;

    return data;
  }

  onFormSubmit(event) {
    event.preventDefault();

    const sanitizedData = this.prepareDataForSubmission();
  }

  render() {
    const { firstName, lastName, country } = this.state;

    return (
      <form className="register-view" onSubmit={this.onFormSubmit} style={{
        "border": this.props.viewport === "mobile" ? "1px solid green" : "1px solid orange"
      }}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={this.handleChange}
            minLength="4"
            required
          />
        </div>

        <br/>

        <div>
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={this.handleChange}
            minLength="4"
            required
          />
        </div>

        <div>
          <label htmlFor="country">Select Country:</label>
            <select id="country" value={country} onChange={this.handleChange}>
              <option selected>Select Country</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Greece">Greece</option>
              <option value="USA">USA</option>
          </select>
        </div>

        <button>Submit</button>
      </form>
    );
  }
}

export default withMediaQuery(RegisterView);

/*
class RegisterViewUncontrolled extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.prepareDataForSubmission = this.prepareDataForSubmission.bind(this);
    this.saveFirstNameRef = this.saveFirstNameRef.bind(this);
    this.saveLastNameRef = this.saveLastNameRef.bind(this);
    this.saveCountryRef = this.saveCountryRef.bind(this);
  }

  componentDidMount() {
    if (this.firstNameInput) {
      console.log(this.firstNameInput.value);
    }
  }

  prepareDataForSubmission() {
    const data = {
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      country: this.countrySelect.value,
    };

    return data;
  }

  onFormSubmit(event) {
    event.preventDefault();

    const sanitizedData = this.prepareDataForSubmission();
  }

  saveFirstNameRef(inputRef) {
    this.firstNameInput = inputRef;
  }

  saveLastNameRef(inputRef) {
    this.lastNameInput = inputRef;
  }

  saveCountryRef(countryRef) {
    this.countrySelect = countryRef;
  }

  render() {
    return (
      <form className="register-view" onSubmit={this.onFormSubmit}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input
            ref={this.saveFirstNameRef}
            type="text"
            id="firstName"
            minLength="4"
            required
          />
        </div>

        <br/>

        <div>
          <label htmlFor="lastName">Last name:</label>
          <input
            ref={this.saveLastNameRef}
            type="text"
            id="lastName"
            minLength="4"
            required
          />
        </div>

        <div>
          <label htmlFor="country">Select Country:</label>
            <select id="country" ref={this.saveCountryRef}>
              <option selected>Select Country</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Greece">Greece</option>
              <option value="USA">USA</option>
          </select>
        </div>

        <button>Submit</button>
      </form>
    );
  }
}

export default RegisterViewUncontrolled;
*/
