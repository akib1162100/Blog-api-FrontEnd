import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import CreateStory from './components/CreateStory';
import LogoutPage from './LogoutPage';

function App() {
    return ( 
        <Router>
            <div className = "App" >
            <NavBar />
            <Switch>
                <Route exact path="/" exact component={Blogs}/>
                <Route exact path="/Registration" component={RegistrationForm}/>
                <Route exact path="/Login" component={LoginForm}/>
                <Route exact path="/Post" component={CreateStory}/>
                <Route exact path="/Logout" component={LogoutPage}/>
                <Route exact path="/:Post_id" component={BlogDetail}/>
            </Switch>
            </div>
        </Router>
    );
}

export default App