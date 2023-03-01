import React from "react";
import{ useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const GetIncident = () => {

const {id} = useParams();
const[incident,setIncident]=useState({})
const [policy,setPolicy]=useState([]);
const [vehicle,setVehicle]=useState([]);
const [claim,setClaim] = useState([]);
const[inputs,setInputs]=useState({

    "incidentid": 0,
        "vehicleid": 0,
        "location": " ",
        "reason": " ",
        "inctype": " ",
        // "fircopy": " ",
        "vehicle": null,
        "file": null
})

const navigate=useNavigate()

const viewpdf1 = (docname) =>{

    window.location=`/viewpdf/${docname}`;
}


useEffect(() => {
    
    fetch(`http://localhost:52101/api/Claim/${id}`)
            .then(res => res.json())
            .then(res => {
                setClaim(res);
                //console.log(res);
                const pid=res.policyid;
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
                
         
            })
            .catch(err => console.log(err));
                
                
            })
            .catch(err => console.log(err));
            })
            .catch(err => console.log(err));


    
 }, [])

return(
    
    <>
    <h5 style={{marginLeft:"12cm",marginTop:"1cm"}}>Incident Details</h5>
  <Card style={{width:"10cm", height:"5cm",marginLeft:"9cm",backgroundColor:"rgb(179 201 221)",textAlign:"center",marginTop:"0.5cm"}}>

    <table>
        <tr>
            <th>Incident Id:</th>
            <td>{vehicle.incidentid}</td>
        </tr>
        <tr>
            <th>Vehicle Id:</th>
            <td>{vehicle.vehicleid}</td>
        </tr>
        <tr>
            <th>Location:</th>
            <td>{vehicle.location}</td>
        </tr>
        <tr>
            <th>Incident Type:</th>
            <td>{vehicle.inctype}</td>
        </tr>
        <tr>
            <th>FIR Copy:</th>
            <td><button onClick={viewpdf1.bind(this,vehicle.fircopy)}>View Pdf</button></td>
        </tr>
    </table>
</Card>
</>

);



}

export default GetIncident;