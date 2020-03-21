import React from "react";
import {Form,Button,Alert} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import Axios from "axios";
import './BlogDetail.css'

class BlogDetail extends React.Component {
    state={
        id:"",
        title:"",
        body:"",
        publishedDate:new Date()   
    }
    author={
        authorId:"",
        fullname:""
    }
    onChange = publishedDate => this.setState({ publishedDate })
    componentDidMount(){
        let blogId=this.props.match.params.Post_id
        console.log(blogId)
        Axios.get('https://localhost:44315/api/blog/'+blogId)
            .then(res=>{
                this.author=res.data.author;
                this.setState({
                    id:res.data.id,
                    title:res.data.title,
                    body:res.data.body,
                    publishedDate:new Date(res.data.publishedDate)
                })
                console.log(res.data)
            })
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    handleSubmit=(e)=>{
        var token =localStorage.getItem('jwtToken')
        e.preventDefault();
        Axios.put('https://localhost:44315/api/blog',this.state,{headers:{'Authorization': 'Bearer '+token,
                                                                        'Content-Type':'application/json'}})
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log (error);
        })
        console.log(this.state);
    }
    render() { 
        const localUserId=localStorage.UserId;
        return (
            <div className="BlogDetail">
                <Form>
                    <Form.Label>Title</Form.Label>
                    {(localUserId===this.author.authorId)?(<Form.Control type="text" value={this.state.title}  id="title" onChange={this.handleChange}/>):
                    (<Form.Control readOnly type="text" value={this.state.title}  id="title" onChange={this.handleChange}/>)}
                    
                    <Form.Label>Body</Form.Label>
                    {(localUserId===this.author.authorId)?(<Form.Control as="textarea" rows="5" value={this.state.body} id= "body" onChange={this.handleChange}/>):
                    (<Form.Control readOnly as="textarea" rows="5" value={this.state.body} id= "body" onChange={this.handleChange}/>)}
                    <div>
                    {(localUserId===this.author.authorId)?(<DateTimePicker onChange={this.onChange} value={(this.state.publishedDate)}/> ):
                    (<DateTimePicker readOnly value={(this.state.publishedDate)}/> )}
                    </div>
                    <div>
                    {(localUserId===this.author.authorId)?(<Button variant="outline-primary"  onClick={this.handleSubmit}>
                        Submit
                    </Button>):null}
                    </div>               
                </Form>
            </div>
          );
    }
}
 
export default BlogDetail;