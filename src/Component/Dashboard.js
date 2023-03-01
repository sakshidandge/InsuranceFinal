import  Button  from "react-bootstrap/Button";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Dashboard = ()=>{
     
    const [emp, setemp]=useState({

        "empid": 0,
        "password": " ",
        "designation": " ",
        "name": " ",
        "email": " ",
        "mobno": 0,
        "alternateMobile": 0,
        "age": 0,
        "address": " ",
        "claim": [],
        "vehicle": []

    });

    const{username}=useParams();
    const{id}=useParams();
    const{email}=useParams();

    useEffect(() => {

    
            fetch(`http://localhost:52101/api/Employees/email/${email}`)
            .then(res => res.json())
            .then(res => {
                setemp(res);
                
            });
        },[])
        
        const empid= emp.empid;

        
    const navigate=useNavigate();
    const Viewdetails=()=>{
        navigate(`/viewdetails/${email}`);
    }

    const ManVeh=()=>{
        navigate(`/vehicle/${empid}`);
    }

    return(
        <div align="center">
        <h3 style={{marginTop:"1cm"}}><b>Hello,{emp.name}</b></h3>
       
        <img src={require('../Image/3.jpg')} style={{width:"30%"}}/>
        <div style={{marginTop:"1%"}}>
         <Button onClick={Viewdetails} variant="dark" style={{marginRight:"0.5cm"}}> View your Details</Button>
        <Button onClick={ManVeh} variant="dark">Manage Vehicles</Button>
        {/* <Button onClick={Viewdetails} variant="dark" style={{marginLeft:"1cm"}}> View your Policies</Button>*/}</div> 

        <a href="/login">Logout</a>
        </div>

    );

}

   


export default Dashboard;