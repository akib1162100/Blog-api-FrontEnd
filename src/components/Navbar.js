import React from "react";
import {withRouter} from "react-router-dom"
import {Navbar,Nav,Button,Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class NavBar extends React.Component {
    setTimeout=()=>
    {
        localStorage.removeItem('UserId')
        localStorage.removeItem('expire')
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('LoggedIn')
        
    }
    render(){
    return ( 
    <div className="NavBar">
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Blogs</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                <Nav.Link href="/Registration">Registration</Nav.Link>
                
                <Nav.Link href="/Login">Login</Nav.Link>

                <Nav.Link href="/Post" >Post</Nav.Link>
                
                </Nav>
                <Form inline>
                <Nav>
                <Nav.Link  href="/Logout">
                    <Button onClick={this.setTimeout} variant="outline-dark" >Logout</Button>
                </Nav.Link>
                </Nav>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    </div>
    );
    }
}

export default withRouter(NavBar);