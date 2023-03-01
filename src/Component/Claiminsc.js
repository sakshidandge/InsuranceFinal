import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Navigate, useNavigate,useParams} from 'react-router-dom';
import { useState,useEffect } from "react";

const Claiminsc = ()=>{
    
    const [filea, setFile] = useState(null);
    const {id}= useParams();
    const cors = require('cors');
    const [submit, setSubmit]=useState(false);
    const [form ,setForm]=useState({});
    const [errors,setErrors]= useState({});
    const[emp,setEmp]=useState({});
    const [inputs, setInputs] = useState({

       
      
    })

    const [validation, setValidation] = useState({

        "insuranceid":0,
        "empid":0,
        "name":"",
        "age":0,
        "email":"",
        "gender":"",
        "insurancefor":"",
        "instatus":"",
        "history":"",
        "documents": null
       
      });

    const navigate=useNavigate();
    const Back = () =>{
        navigate(`/dash/${id}`)
    }

    useEffect(() => {
        fetch(`http://localhost:60457/api/Insurances/details/${id}`)
        .then(res => res.json())
        .then(res => {
            setEmp(res);
        })
        .catch(err => console.log(err));})

        const handleChange = (n)=>(event) => {
            setInputs({...inputs,[n]:event.target.value});
            console.log({inputs});
            
        }
            
            const handleSubmit = (event) => {
                console.log('sucess')
                event.preventDefault();
               setInputs({...inputs,"empid":id,"name":emp.name,"gender":emp.gender,"email":emp.email,"instatus":emp.instatus});

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(inputs)
                };
            
                fetch('http://localhost:60457/api/Insurances/', requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        alert("Submitted for approval.Please Upload the Documents!!")
                         navigate(`/uploaddoc/${id}`)
                        console.log(response);
                    })
                    
                        .catch(err => console.log(err));
         
            

              
            }
        
    return(
        <div style={{
            display: 'block',
            width: 700,
            padding: 30, margin: 'auto'
        }} >
            <form  style={{border:"1px solid #9C9C9C",padding:"20px",borderRadius:"5px"}}>
                


                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Employee Id:</Form.Label>
                    <b>{emp.empid}</b>
                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Name:</Form.Label>
                    <b>{emp.name}</b>
                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Gender:</Form.Label>
                    <b>{emp.gender}</b>
                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Email:</Form.Label>
                    <b>{emp.email}</b>
                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Age:</Form.Label>
                    <Form.Control type="number"
                        id="age" onChange={handleChange("age")} />
                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>History:</Form.Label>
                    <Form.Control type="text"
                         id="history" onChange={handleChange("history")} />
                </Form.Group>
                    
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Insurance For:</Form.Label>
                    <select id="insurancefor" onChange={handleChange("insurancefor")}>
                        <option value="none"></option>
                        <option value="Medicine">Medicine</option>
                        <option value="Car Insurance">Car Insurance</option>
                        <option value="Bike Insurance">Bike Insurance</option>
                        <option value="Three-wheeler">Three-wheeler</option>
                        <option value="Transport Vehicles">Transport Vehicles</option>
                    </select>
                </Form.Group>
              
                   
               

                <Button  onClick={handleSubmit} variant="dark">Submit your Form</Button>
                <Button  variant="dark" onClick={Back} style={{marginLeft:"4%"}}>Back</Button>
                {submit &&
                    <label>Response Submitted</label>
                }
            </form>
        </div>
    );
            
            }       
        
                
        
export default Claiminsc;
