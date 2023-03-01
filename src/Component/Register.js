import React from "react";
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import  Button  from "react-bootstrap/button";
import { Card } from "react-bootstrap";

const Register = () =>{
        const [submit, setSubmit] = useState(null);
        const navigate = useNavigate();
        const [id,setId]=useState();
        const[name,setName]= useState();
        const[designation,setDesignation]=useState();
        const [email,setEmail]=useState();
        const[mobno,setMobno]=useState();
        const[age,setAge]=useState();
        const[alternateMobile,setAlternateMobile]=useState();
        const [address,setAddress]=useState();
        const[password,setPassword]=useState();
        const [confirm,setConfirm]=useState(false);
        const cors = require('cors');
        const[emp,setEmp]=useState({});
        const [inputs, setInputs] = useState({

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

    
   
    const handleChange = (n)=>(event) => {
        setInputs({...inputs,[n]:event.target.value});
        console.log({inputs});
        
    }
    const handleSubmit = (event) => {
        console.log('sucess')
        event.preventDefault();
       setInputs({...inputs, "name":name,
       "designation":designation,
       "email":email,
       "password": password,
       "mobno":mobno,
       "alternateMobile":alternateMobile,
       "age":age,
       "address":address});

        const requestOptions = {
            method: 'POST',
            
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        };
    
        fetch('http://localhost:52101/api/Employees/', requestOptions)
            .then(response => response.json())
            .then(response => {
                alert("You have Registered Successfully")
                 navigate('/login1')
                console.log(response);
            })
            
                .catch(err => console.log(err));  
    }

    const Back = () => 
    {
        navigate('/');
    } 

    return(

        <div align="center">
      <img src = {require('../Image/4.jpg')}/>
  
      <div  >

        <div className="input-text" >
                <label>Name</label>
                    <input id="name" type="text" name="name" onChange={handleChange("name")} style={{marginLeft:"1.2cm"}}/>
                    </div>
                    <div className="input-text" >
                <label>Email</label>
                    <input id="email" type="email" name="email" onChange={handleChange("email")} style={{marginLeft:"1.3cm"}} />
                    </div>
                    <label>Password</label>
                    <input id="password" type="password" name="password" onChange={handleChange("password")} style={{marginLeft:"0.60cm"}} />
                </div>
                <div className="input-text" >
                <label>Designation</label>
                    <input id="designation" type="text" name="designation" onChange={handleChange("designation")}  />
                    </div>
                    <div className="number" >
                <label>Phno</label>
                    <input id="mobno" type="number" name="mobno" onChange={handleChange("mobno")} style={{marginLeft:"1.3cm"}} />
                    </div>
                    <div className="number" >
                    <div className="number" >
                <label>Altno</label>
                    <input id="alternateMobile" type="number" name="alternatenumber" onChange={handleChange("alternateMobile")} style={{marginLeft:"1.2cm"}} />
                    </div>
                    <div className="number" >
                <label>Age</label>
                    <input id="age" type="number" name="age" onChange={handleChange("age")} style={{marginLeft:"1.5cm"}} />
                    </div>
                    <div className="input-text" >
                <label>Address</label>
                    <input id="address" type="text" name="address" onChange={handleChange("address")} style={{marginLeft:"0.7cm"}}/><br></br><br></br>
                    </div>
              
                    <div className="button">
                    
                    <Button type="submit" variant="dark" onClick={handleSubmit} >Register</Button>
                    <Button type="submit"  variant="dark" style={{marginLeft:"0.5cm"}} onClick={Back}>Back</Button>
                    
                    </div>
                    </div>
                    </div>
                
    );
}

export default Register;