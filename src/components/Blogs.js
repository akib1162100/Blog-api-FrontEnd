import React from "react";
import {Card,Button,Alert} from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css';
import Pagination from './Pagination';
import Axios from "axios";

class Blogs extends React.Component {
  state={
    posts:[],
    count:null,
    currentPageNumber:1,
    top:5,
    skip:5,
    isVerifyed:false
  }
  computePage=(pageNumber)=>
  {
    var top=this.state.top;
    var skip=(pageNumber-1)*top
    this.setState({
      currentPageNumber:pageNumber,
      skip:skip,
    })
    console.log(this.state)
    Axios.get('https://localhost:44315/api/blog/'+top+'/'+skip)
    .then(res=>{
      this.setState({
        posts:res.data
      })
    })

  }
  componentDidMount()
  {
    Axios.all([
      Axios.get('https://localhost:44315/api/blog/count'),
      Axios.get('https://localhost:44315/api/blog/'+this.state.top+'/'+0)
    ])
    .then(Axios.spread((countRes,blogRes)=>
    {
      this.setState({
        count:countRes.data,
        posts:blogRes.data
      })
    }))
        var time=(Date.now())/1000;
        var validLogged=!((!localStorage.getItem('UserId')) || (time>localStorage.getItem('expire')));
        console.log(time)
        console.log(localStorage.getItem('expire'))
        console.log(validLogged)
        localStorage.setItem('LoggedIn',validLogged)
        if(validLogged){
          this.setState({
            isVerifyed:true
          })
        }
  }
  handleDelete=(e)=>
  {
    var token=localStorage.getItem('jwtToken');
    var id=e.target.id
    console.log(id)
    e.preventDefault();
    Axios.delete('https://localhost:44315/api/blog/'+id ,{headers:{'Authorization': 'Bearer '+token}})
    .then(res=>{
      console.log(res)
    })
  }
  render(){
    const {posts}=this.state;
    const userId=localStorage.UserId;
    console.log(localStorage.getItem('LoggedIn'))
    const postList=posts.length ? (
      posts.map(post =>{
        this.id=post.id
        return(
          <div className="post-card" key ={post.id}>
            <Card>
            <Card.Body>
                <Link to={'/'+post.id}>
                <Card.Title>{post.title}</Card.Title>
                </Link>
                <p>post by {post.author.fullName} </p>
                <Card.Text>
                  {this.state.isVerifyed}
                </Card.Text>
                {((userId===post.author.authorId)&& this.state.isVerifyed)?(
                <Link to={'/'+post.id}>
                <Button variant="outline-warning">Edit</Button>
                </Link>
                ):null}
                {((userId===post.author.authorId)&& this.state.isVerifyed)?(
                <Button variant="outline-danger" id={post.id} onClick={this.handleDelete} >Delete</Button>)
                :null}
            </Card.Body>
            </Card>
          </div>
        )
      })
    ):(
      <div className="center"> No Posts yet</div>
    )
    return ( 
    <div className="Card">
      {postList}
      <Pagination postPerPage={this.state.top} totalPosts={this.state.count} paginate={this.computePage}/>
    </div>
    );
  }
}

export default Blogs;