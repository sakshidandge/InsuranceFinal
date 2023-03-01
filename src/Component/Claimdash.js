import React from "react";
import { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card  from "react-bootstrap/Card";
import  Button  from "react-bootstrap/Button";
import emailjs from '@emailjs/browser';


const Claimdash = () =>{
    const [isApproved, setIsApproved] = useState(false);
    const [isDenied, setIsDenied] = useState(false);
    const[submit, setSubmit]=useState(false);
    const[showInsurance,setInsurance]=useState(false);
    const[ins,setIns]=useState([]);

    const[emp,setEmp]= useState({

        "insuranceid":0,
        "empid":0,
        "name":"",
        "age":0,
        "email":"",
        "gender":"",
        "insurancefor":"",
        "instatus":"",
        "history":"",
        //"documents":""
    });

    const showClaims
     = () => {
        setInsurance(true);}

    useEffect(() => {
        fetch(`http://localhost:60457/api/insurances`)
            .then(res => res.json())
            .then(res => {
                setIns(res);
            })
            .catch(err => console.log(err));

        
     }, [isApproved,isDenied])


  
    const{id}=useParams();

  const handleApprove = (insurance) => {
    var templateparams={
        "from_name":"Admin",
        "message":`Your Insurance for ${insurance.insurancefor} has been approved`
        
    };

    emailjs.send('service_y88ly9n', 'template_7okgb5l', templateparams, 'JreUGL5HjOXKo-Q-U')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    var insuranceObject = {
        ...insurance,
        "instatus": "approved"
    }
    const { insuranceid } = insurance;
   
    //update
    fetch(`http://localhost:60457/api/Insurances/${insuranceid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insuranceObject)
    })
        .then(res => res.json())
        .then(res => {
            
           
        })
        .catch(err => console.log(err));
    setIsApproved(true);
    //again loading
       
}

const handleDeny = (insurance) => {
    var templateparams={
        "from_name":"Admin",
        "message":`Your Insurance for ${insurance.insurancefor} has been denied`
        
    };

    emailjs.send('service_y88ly9n', 'template_7okgb5l', templateparams, 'JreUGL5HjOXKo-Q-U')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    var insuranceObject = {
        ...insurance,
        "instatus": "denied"
    }
    const { insuranceid } = insurance;

    //update
    fetch(`http://localhost:60457/api/Insurances/${insuranceid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insuranceObject)
    })
        .then(res => res.json())
        .then(res => {})
        .catch(err => console.log(err));
    setIsDenied(true);
//       window.location.reload();

}

  const navigate = useNavigate();
  const Back = () =>{
    navigate('/loginclaim')
  }
    return(
<div>
        <div style={{marginTop:"2%"}}>
          
            <button className="btn btn-lg btn-primary" onClick={showClaims} style={{marginLeft:"2%",width:"32%"}}>Approve/Deny Insurance Request</button>
             <Button onClick={Back} variant="dark" style={{marginLeft:"4%",width:"32%"}}>Logout</Button>
            </div>

           < Card style={{marginTop:"1%"}}>
            
            {showInsurance &&
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Insurance no</th>
                            <th scope="col">Emp Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Insurance for</th>
                            <th scope="col">History</th>
                        
                            <th scope="col">Action</th>



                        </tr>
                    </thead>
                    <tbody>
                    {ins.map(e => (
                        <tr key={e.id}>
                            <td>{e.insuranceid}</td>
                            <td>{e.empid}</td>
                            <td>{e.name}</td>
                            <td>{e.age}</td>
                            <td>{e.insurancefor}</td>
                            <td>{e.history}</td>
                            
                            
                            {e.instatus == "pending" && 
                                <td>
                                    <button className="btn  btn-success" onClick={() => handleApprove(e)} >Approve</button>
                                </td>
                            }
                            {e.instatus == "pending" &&
                                <td>
                                    <button className="btn  btn-danger" onClick={() => handleDeny(e)} >Deny</button>
                                </td>
                            }
                            {e.instatus == "approved" &&
                                <td>
                                     <button className="btn  btn-success" disabled={true} >Approved</button>
                                </td>
                            }
                            {e.instatus == "denied" &&
                                <td>
                                    <button className="btn  btn-danger" disabled={true} >Denied</button>
                                </td>
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

export default Claimdash;