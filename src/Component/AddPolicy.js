// 
import React, { useState } from "react";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { render } from "@testing-library/react";

import { Navigate, useNavigate, useParams } from "react-router-dom";



const AddPolicy = () => {



    const[vehileError,setVehicleError]=useState('');
    const[policyType,setPolicyTypeError] = useState('');
    const[historyError,setHistoryError]=useState('');
    const[idvError,setIdvError]=useState('');
    const[premiumError,setPremiumError]=useState('');
    
    const[policy,setPolicy]=useState({})

    const {id} = useParams();

    const[inputs,setInputs]=useState({

        "policyid": 0,
        "vehicleId": 0,
        "policytype": " ",  
        "startdate": " ",
        "enddate": " ",
        "policydate": " ",
        "history": " ",
        "documentssrc": " ",
        "idv": 0,
        "premium": 0,
        "vehicle": null,
        "file": null,
        "claim": []

    })



    const formData = new FormData()

    formData.append('vehicleId',inputs.vehicleId)
    formData.append('policytype',inputs.policytype)
    formData.append('startdate',inputs.startdate)
    formData.append('enddate',inputs.enddate)
    formData.append('policydate',inputs.policydate)
    formData.append('history',inputs.history)

    // formData.append('idv',inputs.idv)

    // formData.append('premium',inputs.premium)
    formData.append('file',inputs.file)

   

    const handleChange = (n) => (event) => {

        setInputs({ ...inputs, [n]: event.target.value });

    }



   

    const handleImage = (e) =>{
        setInputs({...inputs,file:e.target.files[0]});

    }



    const handleSubmit = (event) => {

        console.log('sucess')

        event.preventDefault();

      // alert(JSON.stringify(inputs));

       // return;

    //    setInputs({...inputs,"id":veh.id,"empid":veh.empid,"vehicleno":veh.vehicleno,"vehiclecost":veh.vehiclecost,"modelname":veh.modelname,"serialno":veh.serialno

    //                         ,"regno":veh.regno,"vehicletype":veh.vehicletype,"regdate":veh.regdate})

        const requestOptions = {

            method: 'POST',

        
            body:formData
        };

        fetch("/api/Policy/add-policy/", requestOptions)

            .then(response => response.json())

            .then(response => {

                alert("Policy Added Successfully!!")

                console.log(response);

            })
                .catch(err => console.log(err));

    }

    const Back = () => {

        Navigate(`/vehiclelist/${id}`)

    }



    return(

        <div style={{

            display: 'block',

            width: 600,

            padding: 30, margin: 'auto'

        }} >

               <form style={{ border: "1px solid #9C9C9C", padding: "20px", borderRadius: "5px" }}>

                <h4>Enter Following Details:</h4>

                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>Vehicle Id:</Form.Label>

                    <Form.Control type="number"

                        id="vehicleId" onChange={handleChange("vehicleId")} />

                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>Policy Type:</Form.Label>

                    <select id="policytype" onChange={handleChange("policytype")}>

                        <option value="none"></option>

                        <option value="carcover">Car Cover</option>

                        <option value="cardashcover">Car Dash Cover</option>

                        <option value="bike insurance">Bike Insurance</option>

                       

                    </select>

                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>Start Date:</Form.Label>

                    <Form.Control type="date"

                        id="startdate" onChange={handleChange("startdate")} />

                </Form.Group>

                {/* <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>Empid:</Form.Label>

                    <Form.Control type="number"

                        id="empid" onChange={handleChange("empid")} />

                </Form.Group> */}

                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>End Date:</Form.Label>

                    <Form.Control type="date"

                        id="enddate" onChange={handleChange("enddate")} />

                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>Policy Date:</Form.Label>

                    <Form.Control type="date"

                        id="policydate" onChange={handleChange("policydate")} />

                </Form.Group>

                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>History:</Form.Label>

                    <Form.Control type="text"

                        id="history" onChange={handleChange("history")} />

                </Form.Group>



                <Form.Group style={{ paddingBottom: 15 }}>

                    <Form.Label>Document:</Form.Label>

                    <Form.Control type="file" accept=".pdf,.docs"

                        id="file" onChange={handleImage} />

                </Form.Group>

               



                <Button onClick={handleSubmit} variant="dark">Add Policy

                </Button>

                <Button style={{marginLeft:"0.5cm"}}variant="dark" onClick={Back}>Back</Button>



               

            </form>

        </div>

    );



}



export default AddPolicy;