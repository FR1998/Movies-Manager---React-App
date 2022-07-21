import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import NotFound from './components/notFound';
import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import Rental from './components/rental';
import React, { Component } from 'react';
import Movieform from './components/movieform';
import Customers from './components/customers';
import Logout from './components/logout';
import Navbar from './components/navBar';
import LoginForm from './components/loginForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RegisterForm from './components/registerForm';
 
class App extends Component {
  state = {};
  componentDidMount(){
    try{
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({user});
    }
    catch (ex)
    {

    }
    
  }
  
render(){
  return (
    <div>
    <ToastContainer />
    <Navbar user={this.state.user} />
  <main className='container'>
    <Switch>
    <Route path="/register" component={RegisterForm} >  </Route>
    <Route path="/login" component={LoginForm} >  </Route>
    <Route path="/logout" component={Logout} >  </Route>
    <Route path="/movies/:id" component={Movieform} >  </Route>  
    <Route path="/movies" component={Movies} >  </Route>
    <Route path="/customers" component={Customers} >  </Route>
    <Route path="/rental" component={Rental} >  </Route>
    <Route path="/not-found" component={NotFound} >  </Route>
    <Redirect from="/" exact to="/movies" ></Redirect>
    <Redirect to="/notFound" ></Redirect>
    </Switch>
  </main>
  </div>
  );
 }
}


export default App;
