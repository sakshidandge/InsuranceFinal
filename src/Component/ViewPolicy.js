import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { logDOM } from "@testing-library/react";

// export default function ViewPolicy() {

//     const [items, setItems] = useState([]);
//     const [policy, setPolicy] = useState({

    //     "policyid": 0,
    // "vehicleId": 0,
    // "policytype": "",
    // "startdate": "",
    // "enddate": "",
    // "policydate": "",
    // "history": "",
    // "documentssrc": null,
    // "idv": 0,
    // "premium": 0,
    // "vehicle": null,
    // "file": null,
    // "claim": []

//     })

//     const id = useParams();
    //  let vid = sessionStorage.getItem("vid");
    //  let ivid= parseInt(vid);
//     //console.log(vid);
//     useEffect(() => {
//         fetch(`http://localhost:52101/api/Policy/vehicleid/${ivid}`)
//              .then(res => res.json())
//             .then(res => {
//                 setPolicy(res);
//                 console.log(ivid);
//                 console.log(policy);
//             })
//             .catch(err => console.log(err));


//     }, [])



//     return (
        // <div>
        //     <table>

                

        //             <tr>
                    
        //                 <th>

        //                     VehicleId
        //                     <td>
        //                         {policy.policyid}
        //                     </td>
        //                 </th>
        //                 <th>
        //                     Registration No
        //                     <td>
        //                         {policy.startdate}
        //                     </td>
        //                 </th>
        //                 <th>
        //                     Vehicle No
        //                     <td>

        //                         {policy.enddate}
        //                     </td>
        //                 </th>

        //                 <th>
        //                     Registration Date
        //                     <td>
        //                         {policy.policytype}
        //                     </td>
        //                 </th>

        //                 <td>
        //                     <Button onClick={ViewPolicy} variant="dark">Policy</Button>
        //                 </td>
                    
        //             </tr>
                    
                

        //     </table>

        // </div>


//     );
// }

// export default ViewPolicy;


export class ViewPolicy extends Component{
    constructor(props){
        super(props);
        this.state={
            "policyid": 0,
            "vehicleId": 0,
            "policytype": "",
            "startdate": "",
            "enddate": "",
            "policydate": "",
            "history": "",
            "documentssrc": null,
            "idv": 0,
            "premium": 0,
            "vehicle": null,
            "file": null,
            "claim": []

        }
this.addclaim=this.addclaim.bind(this);
    }
    refreshList(){
        let vid = sessionStorage.getItem("vid");
        let ivid= parseInt(vid);

        fetch('http://localhost:52101/api/Policy/vehicleid/'+ivid)
        .then(response=>response.json())
        .then(data=>{
            this.setState({claim:data});
        });
    }

    // addclaim(id){
    //     sessionStorage.setItem("Empid",id);
    //     window.location="/addincident"
    // }

    componentDidMount(){
        this.refreshList();
    }

    changevehicleId=(e)=>{
        this.setState({vehicleId:e.target.value});
    }
    changepolicyid=(e)=>{
        this.setState({policyid:e.target.value});
    }
    changepolicytype=(e)=>{
        this.setState({policytype:e.target.value});
    }
    changestartdate=(e)=>{
        this.setState({startdate:e.target.value});
    }
    changeenddate=(e)=>{
        this.setState({enddate:e.target.value});
    }
    changepolicydate=(e)=>{
        this.setState({policydate:e.target.value});
    }
    changephistory=(e)=>{
        this.setState({history:e.target.value});
    }
    changedocumentssrc=(e)=>{
        this.setState({documentssrc:e.target.value});
    }
    changeidv=(e)=>{
        this.setState({idv:e.target.value});
    }
    changepremium=(e)=>{
        this.setState({premium:e.target.value});
    }
    changefile=(e)=>{
        this.setState({file:e.target.value});
    }

    render(){
        const{

            policyid,
            vehicleId,
            policytype,
            startdate,
            enddate,
            policydate,
            history,
            idv,
            premium,
            file,

            claim
        }=this.state;

        const items= claim.map((lms)=>
        <div key={lms.policyid}>
        <li>Policy Id:{lms.policyid}</li>
        <li>Vehicle Id: {lms.vehicleId}</li>
        <li>Policy Type: {lms.policytype}</li>
        <li>Start Date: {lms.startdate}</li>
        <li>End Date: {lms.enddate}</li>
        <li>Policy Date:{lms.policydate}</li>
        <li>History:{lms.history}</li>
        <li>Idv:{lms.idv}</li>
        <li>Premium:{lms.premium}</li>
        <li>Uploaded File:{lms.file}</li>
        <button >Claim Policy</button>
      </div>

     
        

        )

        
        return(
            <div>
                 <ul>Your Policy Details</ul>
                {/* <li>Policy Id:</li>
                <li>Vehicle Id:</li> */}
                {/* <li>Policy Type:</li>
                <li>Start Date:</li>
                <li>End Date:</li>
                <li>Policy Date:</li>
                <li>History:</li>
                <li>Idv:</li>
                <li>Premium:</li>
                <li>File:</li>   */}

                <ul>{items}</ul> 



                        </div>


        )
    }




}