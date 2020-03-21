import React from "react";
import {Form,Button,Alert} from "react-bootstrap";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationForm.css'

class Registration extends React.Component {
    state={
        User:{
            UserId:null,
            FullName:null,
            Password:null,
        },
        ConfPassword:null,
        passwordError:null
    }
    handleChange=(event)=>
    {
        this.setState({
            [event.target.id]:event.target.value
        });
    }

    handleUserChange=(e)=>{
        const {User}={...this.state}
        const CurrentState=User;
        const {id,value}=e.target;
        CurrentState[id]=value;

        this.setState({User:CurrentState});
    }

    passwordVaalidation=()=>{
        if(this.state.User.Password!==this.state.ConfPassword)
        return false;

        return true;
    };
    handleSubmit=(event)=>
    {
        event.preventDefault();
        const isvalid=this.passwordVaalidation();
        if(!isvalid)
        {
            this.setState({
                passwordError:"Password didnot match!"
            });
        }
        console.log(this.state);
        Axios.post('https://localhost:44315/api/User/Registration',this.state.User)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render(){
        return ( 
        <div className="Registration">
            <Form>
               
                <Form.Label>UserId</Form.Label>
                <Form.Control type="text" placeholder="Enter UserId" id="UserId" onChange={this.handleUserChange}/>
            
                <Form.Label>FullName</Form.Label>
                <Form.Control type="text" placeholder="Enter FullName" id="FullName" onChange={this.handleUserChange}/>
            
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="Password" onChange={this.handleUserChange}/>
            
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control type="password" placeholder="ConfirmPassword" id="ConfPassword" onChange={this.handleChange}/>
                {this.state.passwordError?(
                <Alert variant='danger'>{this.state.passwordError}</Alert>):null}
                
                <Button variant="outline-primary" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
        );    
    }
}

export default Registration;