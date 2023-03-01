import React from "react";
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import  Button from "react-bootstrap/button";


const Loginclaim = () =>{
 
    const[email,setEmail]=useState("admin@gmail.com"|| "admin1@gmail.com");
  const [password, setPassword]=useState("admin@123" || "admin1@123");

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

useEffect(() => {

    
  fetch(`http://localhost:52101/api/Employees/email/${email}`)
  .then(res => res.json())
  .then(res => {
      setemp(res);
  });
})

  
 
  const navigate=useNavigate();
  
  const Claimdash=()=>
  {
      if(email == "admin@gmail.com" && password == "admin@123" )
    {
        navigate(`/admindash/${email}`);
    }

    else{
      alert('You are not authorized');
    }

    
}
 

  const handleChange=(event )=>{
    setEmail(event.target.value);       
  }

  const handleChangee=(event )=>{
    setPassword(event.target.value);      
  }

  const Home = () =>{
    navigate('/');
}

  return (

    <div align="center">
      <img src = {require('../Image/4.jpg')}/>
  
      <div >
        <div className="input-text">
                <label>Email Id</label>
                    <input type="text"style={{marginLeft:"0.9cm"}} onChange={handleChange}  name="Id"  />
                    </div>
                    <div className="input-text">
                <label>Password</label>
                    <input type="password" style={{marginLeft:"0.7cm"}} onChange={handleChangee} name="password" /><br></br><br></br>

                    
                   
                    
                </div>
                    <div className="button">
                    
                    <Button type="submit" onClick={Claimdash} variant="dark">Login</Button>
                    <Button type="submit" onClick={Home} variant="dark" style={{marginLeft:"0.5cm"}}>Back</Button>
                    
                </div>    
                  </div>
                  </div>
  );
  
}


export default Loginclaim;
