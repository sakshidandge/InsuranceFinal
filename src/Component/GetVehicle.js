import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button  from "react-bootstrap/Button";

const GetVehicle = () =>{

    const{id}= useParams();
    const [policy,setPolicy]=useState([]);
    const [claim,setClaim] = useState([]);
    const[vehicle,setVehicle] = useState({
        "id": 0,
        "vehicleno": "",
        "modelname": "",
        "serialno": 0,
        "regno": 0,
        "vehicletype": "",
        "empid": 0,
        "vehiclecost": 0,
        "regdate": "",
        "emp": null,
        "incident": [],
        "policy": []
      });
const [inputs,setInputs]=useState({
    "id": 0,
    "vehicleno": " ",
    "modelname": " ",
    "serialno": 0,
    "regno": 0,
    "vehicletype": " ",
    "empid": 0,
    "vehiclecost": 0,
    "regdate": " ",
    "emp": null,
    // "incident": [],
    // "policy": []
    })

    useEffect(() => {
        fetch(`http://localhost:52101/api/Claim/${id}`)
            .then(res => res.json())
            .then(res => {
                setClaim(res);
                
                const pid=res.policyid;
                fetch(`http://localhost:52101/api/Policy/${pid}`)
            .then(res => res.json())
            .then(res => {
                setPolicy(res);
                
                const vid= res.vehicleId;
                //alert("vid"+vid);
                
                fetch(`http://localhost:52101/api/Vehicles/${vid}`)
            .then(res => res.json())
            .then(res => {
                
                console.log(res);
              //alert(res.id);
                setVehicle(res);
                
         
            })
            .catch(err => console.log(err));
                
                
            })
            .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

        
     }, [])

     const {email} = useParams();
     
    const navigate = useNavigate()
    const Back = () =>{
        navigate(`/admindash/${email}`)
    }

return(
    <div>
        <h5 style={{marginLeft:"12cm",marginTop:"1cm"}}>Policy Details</h5>
      <Card style={{width:"10cm", height:"8cm",marginLeft:"9cm",backgroundColor:"rgb(179 201 221)",textAlign:"center"}}>
        <table>
            <tr>
                <th>Vehicle Id</th>
               <td>{vehicle.id}</td></tr>
               <tr> <th>Vehicle No</th>
               <td>{vehicle.vehicleno}</td></tr>
               <tr><th>Model Name</th>
               <td>{vehicle.modelname}</td></tr>
               <tr><th>Serial No</th>
                <td>{vehicle.serialno}</td></tr>
               <tr><th>Registration No</th>
                <td>{vehicle.regno}</td></tr>
               <tr><th>Vehicle Type</th>
                <td>{vehicle.vehicletype}</td></tr>
                <tr><th>Emp Id</th>
                <td>{vehicle.empid}</td></tr>
                <tr><th>Vehicle Cost</th>
                <td>{vehicle.vehiclecost}</td></tr>
                <tr><th>Registration Date</th>
                <td>{vehicle.regno}</td></tr>

                <Button variant="dark" onClick={Back}>Back</Button>  
        </table>
      
        </Card>
        </div>
    

);


}

export default GetVehicle;