import React ,{Component} from "react";
import {Form,Button,Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './LoginForm.css'
import Axios from "axios";
import jwt_decode from "jwt-decode"

class Login extends Component{
    state={
        UserId:'',
        Password:null,
        hasError:false,
        isLoded:false
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
        const data=
        {
            UserId:this.state.UserId,
            Password:this.state.Password
        }
        Axios.post('https://localhost:44315/api/User/Login',data)
        .then(response=>{
            // console.log(response)
            const token=response.data;
            localStorage.setItem('jwtToken',token);
            var decoder=jwt_decode(token);
            localStorage.setItem('UserId',decoder.UserId)
            localStorage.setItem('expire',decoder.exp)
            console.log(decoder)
            this.setState({
                isLoded:true
            })
        })
        .catch(error=>{
            console.log(error);
            this.setState({
                hasError:true
            })
        })
    }
    render(){
        if(this.state.isLoded)
        {
            return(
            <Link to={"/"}>
            <Alert variant='success'> Loggedin Successfully</Alert>
            </Link>
            );
        }
        if(this.state.hasError)
        {
            return(
                <Link to={"/"}>
                    <Alert variant='danger'> Invalid Name or Password</Alert>
                </Link>
            );
        }
        return ( 
        <div className="Login">
            <Form>
                
                    <Form.Label>UserId:</Form.Label>
                    <Form.Control type="text" placeholder="Enter UserId" id="UserId" onChange ={this.handleChange}/>
                
                
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="Password" onChange ={this.handleChange}/>
                
                
                <Button variant="outline-primary"  onClick={this.handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
        );    
    }
}

export default Login;