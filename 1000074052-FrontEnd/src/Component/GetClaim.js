import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

const GetClaim = () => {

    const {email}= useParams()
    let vid =  sessionStorage.getItem("email");
    const [amount,setAmount]=useState([])
    const[remarks,setRemarks]=useState([])
    const{id}= useParams();
    const [claim,setClaim] = useState([])
    const[inputs,setInputs]=useState()
    const [policy,setPolicy]=useState([]);
    const [vehicle,setVehicle]=useState([]);
    const[back,setBack]=useState({
    "claimid": "",
    "policyid": "",
    "empid": "",
    "claimamt": 0,
    "approvedamt": " ",
    "claimstatus": " ",
    "remarks": "",
    "emp": null,
    "policy": null
    })

    const dash = back.email;


    useEffect(() => {
        fetch(`http://localhost:52101/api/Claim/${id}`)
            .then(res => res.json())
            .then(res => {
                setClaim(res);
                //console.log(res);
                const pid=res.policyid;
                const eid = res.empid;
                fetch(`http://localhost:52101/api/Policy/${pid}`)
            .then(res => res.json())
            .then(res => {
                setPolicy(res);
                console.log(res.policytype);
                //alert(res.policytype);
                const vid= res.vehicleId;
                
                console.log(vid);
                fetch(`http://localhost:52101/api/Incident/vehicleid/${vid}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
              // alert(vid);
                setVehicle(res);
                
            fetch(`http://localhost:52101/api/Employees/${eid}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res);
              console.log(eid);
                setBack(res);
                let em=res.email;

         
            })
            .catch(err => console.log(err));
                
                
            })
            .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

            })
     }, [])


     const handleClaim = () =>{
        // console.log(claim)
        fetch(`http://localhost:52101/api/Claim/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...claim,"approvedamt":amount,"remarks":remarks})
            
        })
            .then(response =>{
                alert('Amount Approved');
            })
    }

    const navigate = useNavigate()
    const Back = () => {
        navigate(`/admindash/${back.email}`);
    }
     return(
        <>
        <h5 style={{marginLeft:"12cm",marginTop:"1cm"}}>Claim Details</h5>
      <Card style={{width:"10cm", height:"8cm",marginLeft:"9cm",backgroundColor:"rgb(179 201 221)",textAlign:"center"}}>
      
        
            <table style={{marginTop:"0.5cm"}}>
                <tr>
                <th>ClaimId</th>
               <td>{inputs}{claim.claimid}</td>
                 </tr>
               <tr>
               <th>PolicyId:</th>
               <td>{inputs}{claim.policyid}</td>
               </tr>
               <tr>
               <th>EmpId:</th>
               <td>{inputs}{claim.empid}</td>
               </tr>
              <tr>
              <th>Claimed Amount</th>
               <td>{inputs}{claim.claimamt}</td>
              </tr>
              <tr>
               <th>Approved Amount</th>
               <input type="text" onChange={(event)=>{setAmount(event.target.value)}}/><br></br>
           </tr>
           <th>Remarks</th>
           <input type ="text" onChange={(event)=>{setRemarks(event.target.value)}}/><br></br><br></br>
           
           <Button variant="dark" onClick={handleClaim}>Submit</Button>
           <Button  variant="dark" onClick={Back} style={{marginLeft:"0.5cm"}}>Back</Button>
               </table>
               
           
               </Card>
               </>
     );


}

export default GetClaim;