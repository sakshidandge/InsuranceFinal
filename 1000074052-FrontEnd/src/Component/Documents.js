import  Button  from "react-bootstrap/Button";
import React, { useState } from "react";
import { Component } from "react";
import axios from 'axios';

const Documents = ()=> {

    /* const state = {
       file: null
    }*/

    const [filea, setFile] = useState(null);

   const handleFile= (e) =>
    {
        //console.log(e.target.files,"$$$$");
        //console.log(e.target.files[0],"$$$$")
        let file=e.target.files[0];
        setFile({filea:file});
    }

    const handleUpload = (e) =>
    {
        //console.log(file,"hello");
        let file = filea;
        let formdata = new FormData();
        formdata.append('documents',file);
        formdata.append('name',"hi!!");
        axios({
            url:'http://localhost:60457/api/Insurances',
            method:"POST",
            headers:{
                authorization:'your token'
            },
            data:formdata

        }).then((res)=>{
            
        })
    }

    return(
        <div>
            <h1>Form </h1>
        <form>
            <div>
            <label>Select file</label>
          <input type="file" name="file" onChange={(e)=>handleFile(e)} /> 
            </div>
         <Button onClick={(e)=>handleUpload(e)}>Upload</Button>
        </form>
        </div>
       
    );

  
}

export default Documents;