import React from 'react'
import {Alert} from 'react-bootstrap'

class LogoutPage extends React.Component {
    render() { 
        return ( 
            <Alert variant= "secondary"> 
            <h4>Successfully loggedout</h4>
            </Alert>
         );
    }
}
 
export default LogoutPage;