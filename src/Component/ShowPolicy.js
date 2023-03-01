import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const ShowPolicy=()=>{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
   // const [items, setItems] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [searchTerm, setsearchTerm] = useState("");

        const [items, setItems] = useState([]);
        const [policy, setPolicy] = useState([]);
    
        const {id} = useParams();
        
        const navigate = useNavigate();
         let vid =  sessionStorage.getItem("vid");
         sessionStorage.setItem("particularvehid",vid);
         let ivid= parseInt(vid);
        console.log(vid);
        useEffect(() => {
        
            fetch(`http://localhost:52101/api/Policy/vehicleid/${ivid}`)
                 .then(res => res.json())
                .then(res => {
                    
                    setPolicy(res);
                    
                })
                .catch(err => console.log(err));
    
    
        }, [])

             const claimpol = () =>{
                 navigate(`/addincident/${id}`)
             }

             const vehlist = () => {
                 navigate(`/vehiclelist/${ivid}`)
             }
             const viewpdf1 = (docname) =>{

                window.location=`/viewpdf/${docname}`;
            }
        
            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            }
            else {
        return(
            <>
            <h6 id="info2">EMPLOYEE INFORMATION</h6>
                    <input
                        type="text" placeholder="Search.." className="form-control"
                        style={{width: "40%" }}
                        onChange={(e) => {
                            setsearchTerm(e.target.value);
                        }}
                    />
            <h5 style={{marginLeft:"14cm",marginTop:"1cm"}}>Policy Details</h5>
          <Card style={{width:"8cm", height:"7.5cm",marginLeft:"12cm",backgroundColor:"rgb(179 201 221)"}}>
          {
                policy.filter((val) => {
                    if (searchTerm === "") {
                        return val;
                    } else if (
                        //val.policyid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       
                        val.policyid.toString().includes(searchTerm.toString()) ||
                        val.empLevel.toString().includes(searchTerm.toString()) ||
                        val.managerId.toString().includes(searchTerm.toString())

                    ) {
                        return val;
                    }
                }).map(e =>
                    <ul style={{marginTop:"0.5cm"}}>
                        <li>Policy Id: {e.policyid}</li>
                        <li> Vehicle Id: {e.vehicleId}</li>
                        <li>Policy Type: {e.policytype}</li>
                        <li>Start Date: {e.startdate.split("T")[0]}</li>
                        <li>End Date: {e.enddate.split("T")[0]}</li>
                        <li>Policy Date: {e.policydate.split("T")[0]}</li>
                        <li>Idv: {e.idv}</li>
                        <li>Premium: {e.premium}</li>
                        <li><button onClick={viewpdf1.bind(this,e.documentssrc)}>View Pdf</button></li>
                        
                    </ul>
                   
                )
            }

           
               </Card>
            
               <Button variant="dark" style={{ marginTop:"1cm",marginLeft:"13cm"}}  onClick={claimpol}>Claim Policy</Button>
               <Button variant="dark" style={{marginTop:"0.9cm",marginLeft:"0.5cm"}} onClick={vehlist}>Back</Button>
       
              
           
            </>
            
        );
    }
}
    
    export default ShowPolicy;
    