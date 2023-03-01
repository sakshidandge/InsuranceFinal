import React from "react";
import { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card  from "react-bootstrap/Card";
import  Button  from "react-bootstrap/Button";
import emailjs from '@emailjs/browser';


const Admindash = () =>{
    const [isApproved, setIsApproved] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const[submit, setSubmit]=useState(false);
    const[showClaim,setClaim]=useState(false);
    const[ins,setIns]=useState([]);

    const[emp,setEmp]= useState({

       "claimid": "",
       "policyid": "",
       "empid": 0,
       "claimamt": 0,
       "approvedamt": " ",
       "claimstatus": " ",
       "remarks": "",
      // "emp": null,
      // "policy": null
    });

    const showClaims
     = () => {
        setClaim(true);}

    useEffect(() => {
        fetch(`http://localhost:52101/api/Claim`)
            .then(res => res.json())
            .then(res => {
                setIns(res);
            })
            .catch(err => console.log(err));

        
     }, [isApproved,isRejected])


     const BackDash = (val) =>{
        if(sessionStorage.getItem("email")){
            sessionStorage.clear();
        }
        
        sessionStorage.setItem("email", JSON.stringify(val));
       
        //console.log(val);
    }

    const{id}=useParams();

  const handleApprove = (claim) => {
    var templateparams={
        "from_name":"Admin",
       "message":`Your Claim for ${claim.claimamt} has been approved against the amount of ${claim.approvedamt} with
       the following remarks ${claim.remarks}`
        
     };

    emailjs.send('service_y88ly9n', 'template_7okgb5l', templateparams, 'JreUGL5HjOXKo-Q-U')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    var claimObject = {
        ...claim,
        "claimstatus": "approved"
    }
    const { claimid } = claim;
   
    //update
    fetch(`http://localhost:52101/api/Claim/${claimid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(claimObject)
    })
        .then(res => res.json())
        .then(res => {
            
           
        })
        .catch(err => console.log(err));
    setIsApproved(true);
    //again loading
       
}

const handleDeny = (claim) => {
    var templateparams={
        "from_name":"Admin",
        "message":`Your Claim for ${claim.claimamt} has been denied with
        the following remarks ${claim.remarks}`
      
      
    };

    emailjs.send('service_y88ly9n', 'template_7okgb5l', templateparams, 'JreUGL5HjOXKo-Q-U')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    var claimObject = {
        ...claim,
        "claimstatus": "rejected"
    }
    const { claimid } = claim;

    //update
    fetch(`http://localhost:52101/api/Claim/${claimid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(claimObject)
    })
        .then(res => res.json())
        .then(res => {})
        .catch(err => console.log(err));
    setIsRejected(true);
     //window.location.reload(false);

}


  const navigate = useNavigate();
  const Back = () =>{
    navigate('/loginclaim')
  }

  const GetClaim = (id) =>{
    navigate(`/getclaim/${id}`)
  }

  const Incident = (id) => {
    window.location=`getincident/${id}`
  }

  const Vehicle = (id) => {
      navigate(`/getvehicle/${id}`)
  }

  const Policy = (id) => {
      navigate(`/showtoadmin/${id}`)
  }

  const ShowPolicy = () =>{
      navigate(`/showallpolicy`)
  }

    return(
<div>
        <div style={{marginTop:"2%"}}>
          
            <button className="btn btn-lg btn-primary" onClick={showClaims} style={{marginLeft:"2%",width:"32%"}}>Approve/Deny Insurance Request</button>
            <Button onClick={ShowPolicy} variant="dark" style={{marginLeft:"4%",width:"20%"}}>Show Policy</Button>
             <Button onClick={Back} variant="dark" style={{marginLeft:"4%",width:"32%"}}>Logout</Button>
             
            </div>

           < Card style={{marginTop:"1%"}}>
            
            {showClaim &&
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Claim Id</th>
                            <th scope="col">Policy Id</th>
                            <th scope="col">Emp Id</th>                            
                            <th scope="col">Action</th>



                        </tr>
                    </thead>
                    <tbody>
                    {ins.map(e => (
                        <tr key={e.id}>
                          <td>{e.claimid}</td>
                            <td>{e.policyid}</td>
                            <td>{e.empid}</td>
                            
                            
                            
                            {e.claimstatus == "pending" && 
                                <td>
                                    <button className="btn  btn-success" onClick={() => handleApprove(e)} >Approve</button>
                                    {/* <button className="btn  btn-success" onClick={GetClaim.bind(this,e.claimid)}>Claim Details</button> */}
                                </td>
                            }
                            {e.claimstatus == "pending" &&
                                <td>
                                    <button className="btn  btn-danger" onClick={() => handleDeny(e)} >Reject</button>
                                </td>
                            }
                            {e.claimstatus == "approved" &&
                                <td>
                                     <button className="btn  btn-success" disabled={true} >Approved</button>
                                </td>
                            }
                            {e.claimstatus == "rejected" &&
                                <td>
                                    <button className="btn  btn-danger" disabled={true} >Rejected</button>
                                </td>
                            }
                            {
                              <td> <button className="btn  btn-dark" onClick={GetClaim.bind(this,e.claimid)}>Claim Details</button></td>
                            }
                            {
                              <td><button className="btn  btn-dark" onClick={Incident.bind(this,e.claimid)}>Incident Details</button></td>
                            }
                            {
                              <td><button className="btn  btn-dark" onClick={Vehicle.bind(this,e.claimid)}>Vehicle Details</button></td>
                            }
                            
                               { <td><button className="btn  btn-dark" onClick={Policy.bind(this,e.claimid)}>Policy Details</button></td>
                            
                        }

                            
                            

                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            </Card>
           
            
    
    
</div>

      
        
    );          
    
}

export default Admindash;