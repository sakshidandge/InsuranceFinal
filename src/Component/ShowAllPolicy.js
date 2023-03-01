import React, { useEffect, useState } from "react";
import  Button  from 'react-bootstrap/Button';
import { Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";


const ShowAllPolicy = () =>{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchBy, setSearchBy] = useState("");

    const{id}= useParams();
    const {email}= useState();
    const navigate = useNavigate();   
    const[show,setShow] = useState([])
    const [myOptions, setMyOptions] = useState([])
    const[policy,setPolicy]=useState({
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

    })
    const[inputs,setInputs]=useState([]
)

    useEffect(() => {
        fetch(`http://localhost:52101/api/Policy/?searchBy=${searchBy}`)
            .then(res => res.json())
            .then(res => {
                // alert(inputs.policyid);
                setInputs(res);
                console.log(res)
                
                  
           })
            .catch(err => console.log(err));
      }, [searchBy])
        
        


     const viewpdf1 = (docname) =>{

        window.location=`/viewpdf/${docname}`;
    }

    const GetPolicy = (id) => {
        //alert("hello")
       window.location= `/getpolicy/${id}`;
    }

   const Back = () => {
       navigate(`/admindash/${email}`);
   }

    return(

        <>
        <input type="text" placeholder="Search.." className="form-control"
                        style={{width: "40%",marginLeft:"2%" }}
                        onChange={(e) => {
                            setSearchBy(e.target.value);
                        }}
                    /> 
         {/* <h6 id="info2">EMPLOYEE INFORMATION</h6>
                    <input
                        type="text" placeholder="Search.." className="form-control"
                        style={{width: "40%" }}
                        onChange={(e) => {
                            setsearchTerm(e.target.value);
                        }}
                    /> */}
        <Card style={{width:"90%", marginLeft:"2%"}}>
        <table>

{ inputs.map(item => (
    <tr key={item.id}>

        <th>
        PolicyId
        <td>
            {item.policyid}
        </td>
        </th>
        <th>
            Policy Date
        <td>
            {item.policydate.split("T")[0]}
        </td>
        </th>     
        <td>Policy
        <td><Button className="btn  btn-dark" onClick={GetPolicy.bind(this,item.policyid)}>Policy Details</Button></td>
            </td>  

    </tr>

))}

</table>
        </Card>
         

<Button className="btn  btn-dark" onClick={Back}>Back</Button>
           
   
          
       
        </>
        
    );
}

export default ShowAllPolicy;