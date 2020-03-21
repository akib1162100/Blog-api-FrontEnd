import React from "react";
import {Form,Button,Alert}  from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import './CreateStory.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateStory extends React.Component {
    state={
        Title:null,
        Body:null,
        publishedDate:new Date(),
        isCreated:false
    }
    onChange = publishedDate => this.setState({ publishedDate })

    handleChange=(event)=>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }
    handleSubmit=(e)=>{
        var token =localStorage.getItem('jwtToken')
        e.preventDefault();
        console.log(this.state);
        const post={
            Title:this.state.Title,
            Body:this.state.Body,
            publishedDate:this.state.publishedDate
        }
        Axios.post('https://localhost:44315/api/blog',post,{headers:{'Authorization': 'Bearer '+token,
                                                                        'Content-Type':'application/json'}})
        .then(response=>{
            console.log(response);
            this.setState({
                isCreated:true
            })
        })
        .catch(error=>{
            console.log (error);
            return(<Alert variant='danger'>Error</Alert>)
        })

    }
    setToLogin=()=>
    {
        this.props.history.push('/Login')
    }
    setToBlogs=()=>
    {
        this.props.history.push('/')

    }
    render(){   
        if(this.state.isCreated)
        {
            return (
                <Alert onClick={this.setToBlogs} variant='success'> Post Created</Alert>
                );
        }
        var time=(Date.now())/1000;
        var validLogged=!((!localStorage.getItem('UserId')) || (time+10000>localStorage.getItem('expire')));
        console.log(time)
        console.log(localStorage.getItem('expire'))
        console.log(validLogged)
        localStorage.setItem('LoggedIn',validLogged)
        if(!localStorage.getItem('LoggedIn'))
        {  
            return (
                <Alert onClick={this.setToLogin} variant='danger'> Please Log in</Alert>
                );
        }

        return ( 
        <div className="CreateStory">
            <Form>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" id="Title" onChange={this.handleChange}/>
    
                <Form.Label>Body</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Body" id= "Body" onChange={this.handleChange}/>
                <Form.Label>Published Date</Form.Label>
                <div>
                <DateTimePicker
                onChange={this.onChange}
                value={(this.state.publishedDate)}
                />
                </div>
                <Button variant="outline-primary"  onClick={this.handleSubmit}>
                    Save
                </Button>
            </Form>
        </div>
        );
    }    
}

export default CreateStory;