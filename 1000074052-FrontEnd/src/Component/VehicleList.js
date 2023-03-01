import React, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from "react-bootstrap";



const VehicleList = () => {

    const {id} = useParams();
    const {email} = useParams();
   
    const [items, setItems] = useState([]);
    
    const navigate = useNavigate();


  
    useEffect(() => {
        fetch(`http://localhost:52101/api/Vehicles/empid/${id}`)
            .then(res => res.json())
            .then(res => {
                
               
                setItems(res);
              
            })
            .catch(err => console.log(err));

        // fetch(`http://localhost:52101/api/Policy/vehicleid/${}`)
        //      .then
     }, [])

   
     
const Back = () => {
    navigate(`/dash/${id}`)
}

     const Addvehicle=()=>{
 
        navigate(`/addvehicle/${id}`);
     }

        const ViewPolicy = (val) =>{
            if(sessionStorage.getItem("vid")){
                sessionStorage.clear();
            }
            
            sessionStorage.setItem("vid", JSON.stringify(val));
            navigate(`/showpolicy/${id}`)
            //console.log(val);
        }

        const AddPolicy = () =>{
        
            navigate(`/addpolicy/${id}`)
            //console.log(val);
        }
    

    return(
        <div>
            <Card style={{marginLeft:"1cm",width:"90%",marginTop:"2%",textAlign:"center"}}>
            <table>
                <thead>
                    <tr style={{padding:"3%"}}>
                        <th>Vehicle Id</th>
                        <th>Registration No</th>
                        <th>Vehicle No</th>
                        <th>Registration Date</th>
                        
                        </tr>
                    
                </thead>

{items.map(item => (
<tr>
    
    <td>{item.id}</td>
    <td>{item.regno}</td>
    <td>{item.vehicleno}</td>
    <td>{item.regdate.split("T")[0]}</td>
    <td> {item.policy.length === 0 ?
            <Button onClick={AddPolicy} variant="dark" style={{padding:"2%"}}>Add Policy</Button> : 
          <Button onClick={ViewPolicy.bind(this,item.id)} variant="dark" style={{padding:"2%"}}>Show Policy</Button>}</td>
</tr>
//     <tr>
//         <th>
//         VehicleId</th>
//         <td>
//             {item.id}
//         </td>
//         <th>
//             Registration No
//         <td>
//             {item.regno}
//         </td>
//         </th>
//         <th>
//             Vehicle No
//         <td>
       
//        {item.vehicleno}
//    </td>
//         </th>

//         <th>
//         Registration Date
//         <td>
//            {item.regdate.split("T")[0]}
//        </td>
//        </th>
      
//        <td>
//            {item.policy.length === 0 ?
//            <Button onClick={AddPolicy} variant="dark">Add Policy</Button> : 
//            <Button onClick={ViewPolicy.bind(this,item.id)} variant="dark">Show Policy</Button>}
       
//        </td>

//     </tr>

))}

</table>
            </Card>
            
<Button variant='dark' onClick={Addvehicle} style={{marginLeft:"4%"}}>Add Vehicle</Button>
<Button variant='dark' onClick={Back} style={{marginLeft:"1%"}}>Back</Button>
    </div>

    
);
}
    


export default VehicleList;