import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

const Viewdetails = () =>{

    const[emp,setEmp]= useState({

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
    })

    
    const{email}=useParams();

    useEffect(() => {
        fetch(`http://localhost:52101/api/Employees/email/${email}`)
            .then(res => res.json())
            .then(res => {
                setEmp(res);
            })
            .catch(err => console.log(err));

        
     }, [])

     const id= emp.empid;

     const navigate=useNavigate();
     const Dash = () =>{
         navigate(`/dash/${email}`)
     }
     const view=() =>{
         window.location=`/vehicle/${id}`;
     }

     return(
        <div> <h3 style={{marginLeft:"11cm"}}>Your Details</h3>
            <Card style={{width:"8cm",textAlign:"center",marginLeft:"10cm",marginTop:"1.5cm",backgroundColor:"rgb(179 201 221)"}}>


            <div></div>
            <div>
                <div >
                <table style={{marginTop:"3px"}}>
                 
                 <tbody></tbody>
  
                 <tr>
                    <td>EmpId: </td>
                    <td>{emp.empid}</td>
                    </tr>
                    <tr>
                    <td >Designation: </td>
                    <td >{emp.designation}</td>
                    </tr>
                    <tr>
                    <td >Name: </td>
                    <td >{emp.name}</td>
                    </tr>
                    
                    <tr>
                    <td >Email:</td>
                    <td >{emp.email}</td>
                    </tr>

                    <tr>
                    <td >Age:</td>
                    <td >{emp.age}</td>
                    </tr>

                    <tr>
                    <td >Phone Number: </td>
                    <td>{emp.mobno}</td>
                    </tr>
                    <tr>
                    <td>Alt Number: </td>
                    <td >{emp.alternateMobile}</td>
                    </tr>
                    <tr>
                    <td>Address: </td>
                    <td>{emp.address}</td>
                    </tr>
                    <br></br>
                    <tr><Button variant="dark" onClick={Dash}>Back</Button>
                    </tr>
                </table>
                </div>
                <div style={{paddingTop:"10px"}}>
                
                               
                </div>
            </div>
            
            </Card>
           
           
            </div>

    );

}

export default Viewdetails;