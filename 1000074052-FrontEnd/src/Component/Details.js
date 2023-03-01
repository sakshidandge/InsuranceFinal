import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import  Button  from "react-bootstrap/Button";

const Details = () =>{

    const [emp, setemp]=useState({

        "empid":0,
        "username":"",
        "password":"",
    
    });

    const{username} = useParams();

    useEffect(() => {

    
        fetch(`http://localhost:60457/api/logins/details/${username}`)
        .then(res => res.json())
        .then(res => {
            setemp(res);
        });
      },[])
      
      const navigate=useNavigate();
      const Newlogin=()=>{
        navigate('/loginnew');
    }

    return(
        <Card style={{marginTop:"2cm",width:"15cm",height:"5cm",marginLeft:"9cm"}}>
            <table>
                <tr>
                    <td>Id</td>
                    <td>{emp.empid}</td>

                </tr>
                <tr>
                    <td>Username</td>
                    <td>{emp.username}</td>

                </tr>
                <tr>
                    <td>Password</td>
                    <td>{emp.password}</td>

                </tr>
            </table>

           <div>
           <Button onClick={Newlogin} style={{marginLeft:"3cm"}}>Login</Button>
           </div>
           
        </Card>

       
    );
}

export default Details;