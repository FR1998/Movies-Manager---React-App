import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from './../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  username = React.createRef();

  // componentDidMount()
  //// {
  //this.username.current.focus();
  // }

  doSubmit = async () => {
    try{
      const {data: jwt} = await login(this.state.data.username,this.state.data.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    }
    catch (ex)
    {
      if (ex.response && ex.response.status === 400)
      {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
    
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={this.state.errors.password}
          />
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
