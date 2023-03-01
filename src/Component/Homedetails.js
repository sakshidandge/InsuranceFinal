import React from "react";
import Home from "./Home";
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate,useParams} from 'react-router-dom';

const Homedetails = () =>{

    const navigate=useNavigate();

    const Backhome = () =>{
        navigate('/');
    }

    return(
        <div style={{marginTop:"7vw"}}>
        <Container>
    <Row>
        <Col sm={4}>
    <Card style={{background:"rgb(179 201 221)", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
        <Card.Text>
            <h2>3-Wheeler Insurance</h2>
            <ul>
                <li><h5>Accident Protection</h5></li>
                <li><h5>Glass Coverage</h5></li>
                <li><h5>Damage/Theft Cover</h5></li>
                
            </ul>
            
        </Card.Text>
        
      </Card.Body>
    </Card>
    </Col>
    <Col sm={4}>
    <Card style={{background:"rgb(179 201 221)", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
      <Card.Text>
      <h2>Bike Insurance</h2>
            <ul>
                <li><h5>Protection against natural disasters</h5></li>
                <li><h5>Third Party Liability</h5></li>
                <li><h5>Cash-less Claim</h5></li>
            </ul>
        </Card.Text>
       
      </Card.Body>
    </Card>
    </Col>
    <Col sm={4}>
    <Card style={{background:"rgb(179 201 221)", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
      <Card.Text>
            <h2>Car Insurance</h2>
            <ul>
                <li><h5>Large Network of garages</h5></li>
                <li><h5>No-claim bonus</h5></li>
                <li><h5>Damage or Loss Control</h5></li>
            </ul>
        </Card.Text>
       
      </Card.Body>
      
    </Card>
    </Col>
    </Row>
    <Button onClick={Backhome}  variant="dark" style={{marginLeft: "13cm",
    marginTop: "0.5cm"}}>Back To Home</Button>
    </Container>
    </div>   
    );
}

export default Homedetails;