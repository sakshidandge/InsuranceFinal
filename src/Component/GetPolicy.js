import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

const GetClaim = () => {

    const {email}= useParams()
    const [premium,setPremium]=useState([])
    const[idv,setIdv]=useState([])
    const{id}= useParams();
    const [claim,setClaim] = useState([])
    const[inputs,setInputs]=useState()
    const [policy,setPolicy]=useState({

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
    });
    const [vehicle,setVehicle]=useState([]);
    

    useEffect(() => {
        // fetch(`http://localhost:52101/api/Claim/${id}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setClaim(res);
                //console.log(res);
                //const pid=res.policyid;
                fetch(`http://localhost:52101/api/Policy/${id}`)
            .then(res => res.json())
            .then(res => {
                setPolicy(res);
                //alert(policy.history);
                //alert(res.policytype);
                      })
            .catch(err => console.log(err));
                    })
                

      // const policyid = policy.policyid;
     const handlePolicy = () =>{
         console.log(policy.policyid);
        // console.log(claim)
         fetch(`http://localhost:52101/api/Policy/updatepolicyid/${policy.policyid}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...policy,"premium":premium,"idv":idv})
            
        })
            .then(response =>{
                alert('Policy Premium and Idv Approved');
                navigate(`admindash/${email}`)
            })
    }

    const navigate = useNavigate()
    
    const Back = () => {
        navigate(`/admindash/${email}`);
     }

     const viewpdf1 = (docname) =>{

        window.location=`/viewpdf/${docname}`;
    }
     return(
        <>
        <h5 style={{marginLeft:"12cm",marginTop:"1cm"}}>Policy Details</h5>
      <Card style={{width:"10cm", height:"8cm",marginLeft:"9cm",backgroundColor:"rgb(179 201 221)",textAlign:"center"}}>
      
        
            <table style={{marginTop:"0.5cm"}}>
                <tr>
                <th>Policy Id</th>
               <td>{inputs}{policy.policyid}</td>
                 </tr>
               <tr>
               <th>Vehicle Id:</th>
               <td>{inputs}{policy.vehicleId}</td>
               </tr>
               <tr>
               <th>Policy Type:</th>
               <td>{inputs}{policy.policytype}</td>
               </tr>
              <tr>
              <th>Start Date</th>
               <td>{inputs}{policy.startdate.split("T")[0]}</td>
              </tr>
             <tr>
             <th>End Date</th>
               <td>{inputs}{policy.enddate.split("T")[0]}</td>
                 </tr>
                 <tr>
                     <th>Policy Date</th>
                     <td>{inputs}{policy.policydate.split("T")[0]}</td>
                 </tr>
                 <tr>
                     <th>Document</th>
                     <td><button onClick={viewpdf1.bind(this,policy.documentssrc)}>View Pdf</button></td>
                 </tr>
                  
              
              
              <tr>
               <th>Premium</th>
               <input type="text" onChange={(event)=>{setPremium(event.target.value)}}/><br></br>
           </tr>
           <th>Idv</th>
           <input type ="text" onChange={(event)=>{setIdv(event.target.value)}}/><br></br><br></br>
           
           <Button variant="dark" onClick={handlePolicy}>Submit</Button>
           <Button  variant="dark"  style={{marginLeft:"0.5cm"}}>Back</Button>
               </table>
               
           
               </Card>
               </>
     );


}

export default GetClaim;