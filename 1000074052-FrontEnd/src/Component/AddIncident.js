import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { render } from "@testing-library/react";
import { Navigate, useNavigate, useParams } from "react-router-dom";



export default function AddInc () {

    const navigate = useNavigate();
    const {id} = useParams();
    const[file,setFile]=useState();
    const [image,setImage]=useState();
    const [submit, setSubmit] = useState(false);
    const [incident, setIncident] = useState([])
    const[vehicleIdError,setVehicleError]=useState('');
    const[locationError,setLocationError]=useState('');
    const[reasonError,setReasonError]=useState('');
    const[inctypeError,setInctypeError]=useState('');
    const[fileError,setFileError]=useState('');
    const [inputs, setInputs] = useState({

        "incidentid": 0,
        "vehicleid": 0,
        "location": " ",
        "reason": " ",
        "inctype": " ",
        // "fircopy": " ",
        "vehicle": null,
        "file": null

    })

    const Back = () => {
        navigate(`/showpolicy/${id}`)
    }

    const formData = new FormData()
    formData.append('vehicleid',inputs.vehicleid)
    formData.append('location',inputs.location)
    formData.append('reason',inputs.reason)
    formData.append('inctype',inputs.inctype)
   // formData.append('fircopy',inputs.fircopy)
    formData.append('file',inputs.file)

    const validate = () =>{
        let res=0

        if(inputs.location == null)
        {
            setLocationError("Location is mandatory feild");
            res=res+1;
        }
        else if (inputs.location.length>10000000000000)
        {
            setLocationError("Enter a short location");
            res=res+1;
        }
        if(inputs.reason == null)
        {
            setReasonError("Reason is mandatory");
            res=res+1;
        }
        else if(inputs.reason.length>1000000)
        {
            setReasonError("Enter reason in short");
            res=res+1;
        }
        if(inputs.inctype == null)
        {
            setInctypeError("Incident type cannot be null");
            res=res+1;
        }
        else if(inputs.inctype.length>1000000000)
        {
            setInctypeError("Incident type cannot be long");
            res=res+1;
        }
        if(res==0){
         return true;
         }
     else{
         return false;
         }
     
    }
     

    const handleChange = (n) => (event) => {
        setInputs({ ...inputs, [n]: event.target.value });
    }

   
     const handleImage = (e) =>{

        setInputs({...inputs,file:e.target.files[0]});
        }

        const handleSubmit = (event) => {
            console.log('sucess')
            if(validate()) {
                //alert(validate());
            event.preventDefault();
            //alert(JSON.stringify(inputs));
         
         setInputs({...inputs,"vehicleid":sessionStorage.getItem("particularvehid"),
                                })
            const requestOptions = {
                method: 'POST',
                
                body:formData
            
            };
           
            fetch("http://localhost:52101/api/Incident/add-incident/", requestOptions)
                .then(response => response.json())
                .then(response => {
                    alert("Incident Added Successfully!!")
                    navigate(`/addclaim/${id}`)
                    console.log(response);
                   
                })
                
                    .catch(err => console.log(err));
            }
        }

          

    return (

        <div style={{
            display: 'block',
            width: 600,
            padding: 30, margin: 'auto'
        }} >
            <form style={{ border: "1px solid #9C9C9C", padding: "20px", borderRadius: "5px" }}>
                <h4>Enter Incident Details</h4>
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Vehicle Id:{sessionStorage.getItem("particularvehid")}</Form.Label>
                   
                </Form.Group>
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Location:</Form.Label>
                    <Form.Control type="text-number"
                        id="location" onChange={handleChange("location")} />
                        <p>{locationError}</p>
                </Form.Group>
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Incident Type:</Form.Label>
                    <select id="inctype" onChange={handleChange("inctype")}>
                        <option value="none"></option>
                        <option value="driver mistake">Driver Mistake</option>
                        <option value="car failure">Car Failure</option>
                        <option value="drink and drive">Drink and Drive</option>
                        <option value="other party fault">Other Party Fault</option>
                    </select>
                    <p>{inctypeError}</p>
                </Form.Group>
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Reason:</Form.Label>
                    <Form.Control type="text"
                        id="reason" onChange={handleChange("reason")} />
                        <p>{reasonError}</p>
                </Form.Group>
                {/* <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>Empid:</Form.Label>
                    <Form.Control type="number"
                        id="empid" onChange={handleChange("empid")} />`
                </Form.Group> */}
                <Form.Group style={{ paddingBottom: 15 }}>
                    <Form.Label>FIRCopy:</Form.Label>
                    <Form.Control type="file" accept=".pdf"
                        id="file" onChange={handleImage} />
                </Form.Group> 
                

                <Button onClick={handleSubmit} variant="dark">Add Incident</Button>
                {/* <Button style={{marginLeft:"0.5cm"}}onClick={Back} variant="dark">Back</Button> */}

               
            </form>
        </div>

    )
    
}
// export default AddIncident;
