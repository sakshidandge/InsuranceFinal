import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import  Button from "react-bootstrap/button";

  
function Login1() {

  
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  /*const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");*/
 
  const navigate=useNavigate();
  
  const Dash=()=>
  {
    if(emp.email==email && emp.password == password)
    {
      navigate(`/dash/${email}`);
    }

    else{
      alert('Invalid Username or Password');
     
    }
    // navigate(`/dash/${email}`);
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



  return (
    <div align="center">
      <img src = {require('../Image/4.jpg')}/>
  
      <div  >

      <div className="input-number">
                <label>Email Id</label>
                    <input type="text" style={{marginLeft:"0.9cm"}} onChange={handleChange} name="Email" required/><br></br>
                    </div>
                    <div className="input-text">
                <label>Password</label>
                    <input type="password" style={{marginLeft:"0.7cm"}} onChange={handleChangee} name="password" required /><br></br><br></br>
                </div>
                    <div className="button">
                    
                    <Button type="submit" onClick={Dash} variant="dark">Login</Button>
                    <Button type="submit" onClick={Home} variant="dark" style={{marginLeft:"0.5cm"}}>Back</Button>
                    
                </div>    

      </div>
       
                    </div>
  );
  
}

export default Login1;