import  Button from 'react-bootstrap/Button';
import React from "react";
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { Card } from 'react-bootstrap';
import image from "../Image/1.jpg"

function Home()
{
    const navigate=useNavigate();
    const Logintoclaim=()=>{
        navigate('/login1');
    }

    const Loginclaim=()=>{
        navigate('/loginclaim');
    }

    const Register=()=>{
        navigate('/register');
    }

    const Details=()=>{
        navigate('/homedetails');
    }
 return(
     <div align="center">
         <Card style={{display:"block",width:"15cm",height:"9cm",marginTop:"1.5cm",backgroundImage:`url(${image})`, backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
         
         <h1 className="fs-3" marginTop="1cm"><b>Welcome</b></h1>
    <Button variant='dark' onClick={Details}  style={{marginRight:"10cm",marginTop:"1.5cm"}}>View Details</Button><br></br><br></br>
    <Button variant='dark'onClick={Loginclaim} style={{marginRight:"8cm"}}>Login to Approve/Reject </Button><br></br><br></br>
    <Button variant='dark' onClick={Logintoclaim}  style={{marginRight:"10cm"}}>Login to claim</Button><br></br><br></br>
     <Button variant='dark'onClick={Register}  style={{marginRight:"9.2cm"}}>New Registration</Button><br></br><br></br>
        
         </Card>
        
     </div>
     
     
 );   
}

export default Home;