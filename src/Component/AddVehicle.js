import React, { useState,useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddVehicle = () =>{

    const {id} = useParams();
    const [submit, setSubmit]=useState(false);
    const [veh,setVeh]=useState([])
    const[vehicleNoError,setVehicleNoError]=useState('');
    const[modelnameError,setmodelnameError]=useState('');
    const[serialnoError,setSerialnoError]=useState('');
    const[regNoError,setregNoError]=useState('');
    const[vehicleTypeError,setvehicleTypeError]=useState('');
    const[vehiclecostError,setVehicleCostError]=useState('');
    const[regDateError,setregDateError]=useState('');
    
    const [inputs,setInputs]=useState({
        "id": 0,
        "vehicleno": " ",
        "modelname": " ",
        "serialno": 0,
        "regno": 0,
        "vehicletype": " ",
        "empid": id,
        "vehiclecost": 0,
        "regdate": " ",
        "emp": null,
        "incident": [],
        "policy": []
    })
    const navigate=useNavigate();

    const Back = () => {

        navigate(`/vehicle/${id}`)
    }
    const validate = () => {
        let res=0

        if(inputs.vehicleno == 0)
        {
            setVehicleNoError("This feild cannot be empty");
            res=res+1;
        }
        else if (inputs.vehicleno.length>50)
        {
            setVehicleNoError("Cannot be more than 50");
            res=res+1;
        }
        if(inputs.modelname == 0)
        {
            setmodelnameError("This feild cannot be empty");
            res=res+1;
        }
        else if(inputs.regno.length>100)
        {
            setmodelnameError("model name cannot be greater than 100");
            res=res+1;
        }
        if(inputs.serialno == 0)
        {
            setSerialnoError("This feild cannot be empty");
            res=res+1;
        }
        else if(inputs.serialno.length>100)
        {
            setSerialnoError("Serial no cannot be greater than 100");
            res=res+1;
        }
        if(inputs.regno == 0)
        {
            setregNoError("This feild cannot be empty");
            res=res+1;
        }
        else if(inputs.regno.length>100)
        {
            setregNoError("Registration cannot be greater than 100");
            res=res+1;
        }
        if(inputs.vehicletype == null)
        {
            setvehicleTypeError("This feild cannot be empty");
            res=res+1;
        }
        else if(inputs.vehicletype.length>100)
        {
            setvehicleTypeError("Registration cannot be greater than 100");
            res=res+1;
        }
        if(inputs.vehiclecost == 0)
        {
            setVehicleCostError("This feild cannot be empty");
            res=res+1;
        }
    //      if(inputs.regdate == null)
    //      {
    //          setregDateError("This feild cannot be empty");
    //          res=res+1;
    //      }
    //      else if (inputs.regdate != null)
    //      {
    //          setregDateError("Enter Vehicle Reg date");
    //          res=res+1;
    //      }
         if(res==0){
            return true;
        }
        else{
            return false;
        }
    }

    useEffect(() => {
    
    })

        const handleChange = (n)=>(event) => {
            setInputs({...inputs,[n]:event.target.value});
            
            
        }
            
            const handleSubmit = (event) => {
                console.log('sucess');
                if (validate()) {
                event.preventDefault();
            //    setInputs({...inputs,"id":veh.id,"empid":veh.empid,"vehicleno":veh.vehicleno,"vehiclecost":veh.vehiclecost,"modelname":veh.modelname,"serialno":veh.serialno
            //                         ,"regno":veh.regno,"vehicletype":veh.vehicletype,"regdate":veh.regdate})
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(inputs)
                };
               
                fetch('http://localhost:52101/api/Vehicles/', requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        alert("Vehicle Added Successfully!!")
                        navigate(`/vehicle/${id}`)
                        console.log(response);
                    })
                    
                        .catch(err => console.log(err));
         
          
                }
            }

            return(
                <div style={{
                    display: 'block',
                    width: 600,
                    padding: 30, margin: 'auto'
                }} >
                    <form  style={{border:"1px solid #9C9C9C",padding:"20px",borderRadius:"5px"}}>
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Employee Id: {id}</Form.Label>
                    <b>{veh.empid}</b>
                </Form.Group>
                <Form.Group style={{ paddingBottom: 15 }}>
                 <Form.Label>Vehicle Number:</Form.Label>
                 <Form.Control type="text-number"
                    id="vehicleno" onChange={handleChange("vehicleno")} />
                    <p>{vehicleNoError}</p>
            </Form.Group>
             <Form.Group style={{ paddingBottom: 15 }}>
             <Form.Label>ModelName:</Form.Label>
             <Form.Control type="text"
                 id="modelname" onChange={handleChange("modelname")} />
                 <p>{modelnameError}</p>
         </Form.Group>
         <Form.Group style={{ paddingBottom: 15 }}>
             <Form.Label>SerialNumber:</Form.Label>
             <Form.Control type="text-number"
                 id="serialno" onChange={handleChange("serialno")} />
                 <p>{serialnoError}</p>
         </Form.Group>
         <Form.Group style={{ paddingBottom: 15 }}>
             <Form.Label>RegistrationNumber:</Form.Label>
             <Form.Control type="number"
                 id="regno" onChange={handleChange("regno")} />
                 <p>{regNoError}</p>
         </Form.Group>
         <Form.Group style={{ paddingBottom: 15 }}>
             <Form.Label>VehicleType:</Form.Label>
             <select id="vehicletype" onChange={handleChange("vehicletype")}>
                        <option value="none"></option>
                        <option value="2-Wheeler">2-Wheeler</option>
                        <option value="4-Wheeler">4-Wheeler</option>
                        <option value="3-Wheeler">3-Wheeler</option>
                    </select>
                    <p>{vehicleTypeError}</p>
                    </Form.Group>
         <Form.Group style={{ paddingBottom: 15 }}>
             <Form.Label>VehicleCost:</Form.Label>
             <Form.Control type="number"
                 id="vehiclecost" onChange={handleChange("vehiclecost")} />
                 <p>{vehiclecostError}</p>
         </Form.Group>
         <Form.Group style={{ paddingBottom: 15 }}>
             <Form.Label>RegistrationDate:</Form.Label>
             <Form.Control type="date"
                 id="regdate" onChange={handleChange("regdate")} />
                 <p>{regDateError}</p>
         </Form.Group>
         
         <Button  onClick={handleSubmit} variant="dark">Submit your Form</Button>
          <Button onClick={Back} style={{marginLeft:"2%"}} variant="dark">Back</Button>      
                {submit &&
                    <label>Response Submitted</label>
                }
         </form>
        </div>

           ); 

}

export default AddVehicle;