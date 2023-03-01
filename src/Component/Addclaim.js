import React from "react";
import { useState,useEffect} from "react";
import  Form  from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { isDisabled } from "@testing-library/user-event/dist/utils";
import emailjs from '@emailjs/browser';
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export default function Addclaim () {

    
   const[policyError,setPolicyError]=useState('');
   const[empidError,setempidError]=useState('');
   const[claimamtError,setClaimamtError]=useState('');
   const{email}=useParams();
   const navigate = useNavigate()
;
    const[policy,setPolicy]=useState({
        
            "policyid": 0,
            "vehicleId": 0,
            "policytype": "",
            "startdate": "",
            "enddate": "",
            "policydate": "",
            "history": "",
            "documentssrc": "",
            "idv": 0,
            "premium": 0,
            "vehicle": null,
            "file": null,
            "claim": []
          
    });
    const[vehicle,setVehicle]=useState({})
    const[claim,setClaim]=useState({})
    const[inputs,setInputs]=useState({
    "claimid": 0,
    "policyid": 0,
    "empid":0,
    "claimamt": 0,
    "approvedamt": 0,
    "claimstatus": "pending",
    "remarks": "",
    "emp": null,
    "policy": null
    })

    const handleChange = (n)=>(event) => {
        setInputs({...inputs,[n]:event.target.value});        
    }
        
        const handleSubmit = (event) => {

            if(validate()) {
            var templateparams={
                "from_name":"Admin",
               "message":`Your Claim for ${inputs.claimamt} has been submitted to admin for the approval`  
             };
        
            emailjs.send('service_y88ly9n', 'template_7okgb5l', templateparams, 'JreUGL5HjOXKo-Q-U')
            console.log('sucess')
            event.preventDefault();
             const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(inputs)
            };
            setInputs({...inputs,"empid":id
        })
           
            fetch('http://localhost:52101/api/Claim/', requestOptions)
                .then(response => response.json())
                .then(response => {
                    alert("Claim Added Successfully!!")
                    navigate(`/dash/${email}`)
                    console.log(response);
                })
                
                    .catch(err => console.log(err));
  
            }
        }
    
        let partvehid= sessionStorage.getItem("particularvehid");
        useEffect(() => {
          
            
                    fetch(`http://localhost:52101/api/Policy/vehicleid/${partvehid}`)
                .then(res => res.json())
                .then(res => {
                    setPolicy(res);
                    console.log(res);
                        
                })
                .catch(err => console.log(err));

            },[])
    

        const {id} = useParams();
        const pid = policy.policyid;

        const validate = () => {
            let res=0

            if(inputs.policyid == 0)
            {
                //alert("inside");
                setPolicyError("PolicyId cannot be Empty");
                res=res+1;
            }
            else if(inputs.policyid.length>10)
            {
                setPolicyError("Policy cannot be more than 10");
                res=res+1;
            }
            if(inputs.claimamt == 0)
            {
                setClaimamtError("Claim Amount Cannot be null");
                res=res+1;
            }
            else if(inputs.claimamt > 10000000000)
            {
                setClaimamtError("Amount can't be greater than 10000000");
                res=res+1;
            }
            if(res==0){
                return true;
            }
            else{
                return false;
            }
        }

        return(
            <div style={{
                display: 'block',
                width: 600,
                padding: 30, margin: 'auto'
            }} >
                <form  style={{border:"1px solid #9C9C9C",padding:"20px",borderRadius:"5px"}}>
                <h4>Enter Your Claim:</h4>
                <Form.Group style={{ paddingBottom: 15 }}>
                <Form.Label>Emp Id:</Form.Label>
                <b>{id}</b>
                {/* <Form.Control type="text-number"
                    id="empid" onChange={handleChange("empid")} />*/}
            </Form.Group> 
                <Form.Group style={{ paddingBottom: 15 }}>
                <Form.Label>Policy Id:</Form.Label>
                <Form.Control type="number"
                    id="policyid" onChange={handleChange("policyid")}/>
                    <p>{policyError}</p>
            </Form.Group>   
           
            <Form.Group style={{ paddingBottom: 15 }}>
                <Form.Label>Claimed Amount:</Form.Label>
                <Form.Control type="text-number"
                    id="claimamt" onChange={handleChange("claimamt")} />
                   <p>{claimamtError}</p>
            </Form.Group>
            <Form.Group style={{ paddingBottom: 15 }}>
                <Form.Label>Approved Amount:</Form.Label>
                <Form.Control type="text-number" disabled={true}
                    id="approvedamt" onChange={handleChange("approvedamt")} />
                   
            </Form.Group>
            <Form.Group style={{ paddingBottom: 15 }}>
                <Form.Label>Remarks:</Form.Label>
                <Form.Control type="text-number" disabled={true}
                    id="remarks" onChange={handleChange("remarks")} />
            </Form.Group>
           
            <Button  onClick={handleSubmit} variant="dark">Submit your Form</Button>
            </form>
            </div>
        );
            
    

}