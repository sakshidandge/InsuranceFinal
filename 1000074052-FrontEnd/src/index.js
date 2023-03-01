  import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Layout from './Component/Layout';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Login1 from './Component/Login';
import Viewdetails from './Component/Viewdetails';
import Loginclaim from './Component/Loginclaim';
import Claimdash from './Component/Claimdash';
import Claiminsc from './Component/Claiminsc';
import Register from './Component/Register';
import Details from './Component/Details';
import Homedetails from './Component/Homedetails';
import Documents from './Component/Documents';
import VehicleList from './Component/VehicleList';
import AddVehicle from './Component/AddVehicle';
import AddInc from './Component/AddIncident';
import {ViewPolicy} from './Component/ViewPolicy';
import ShowPolicy from './Component/ShowPolicy';
import Addclaim from './Component/Addclaim';
import Viewpdf from './Component/Viewpdf';
import Admindash from './Component/Admindash';
import GetClaim from './Component/GetClaim';
import GetIncident from './Component/GetIncident';
import AddPolicy from './Component/AddPolicy';
import GetVehicle from './Component/GetVehicle';
import GetPolicy from './Component/GetPolicy';
import ShowAllPolicy from './Component/ShowAllPolicy';
import ShowPolicytoAdmin from './Component/ShowPolicytoAdmin';



 function App1()
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="login" element={<Login/>}/>
        <Route path="dash/:email" element={<Dashboard/>}/>
        <Route path="login1" element={<Login1/>}/>
        <Route path ="viewdetails/:email" element={<Viewdetails/>}/>
        <Route path ="loginclaim" element={<Loginclaim/>}/>
        <Route path="claimdash/:id" element={<Claimdash/>}/>
        <Route path="claiminsc/:id" element={<Claiminsc/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="details/:username" element ={<Details/>}/>
        <Route path="/homedetails" element={<Homedetails/>}/>
        <Route path ="/documents" element={<Documents/>}/>
        <Route path = "/vehicle/:id" element={<VehicleList/>}/>
        <Route path ="/addvehicle/:id" element = {<AddVehicle/>}/>
        <Route path ="/addincident/:id" element={<AddInc/>}/>
        <Route path ="/viewpolicy/:id" element={<ViewPolicy/>}/>
       <Route path ="/showpolicy/:id" element={<ShowPolicy/>}/>
       <Route path ="/addclaim/:id" element={<Addclaim/>}/>
       <Route path ="/viewpdf/:doc" element={<Viewpdf/>}/>
       <Route path ="/admindash/:email" element={<Admindash/>}/>
       <Route path ="/getclaim/:id" element={<GetClaim/>}/>
       <Route path ="/admindash/getincident/:id" element={<GetIncident/>}/>
       <Route path ="/addpolicy/:id" element={<AddPolicy/>}/>
       <Route path ="/getvehicle/:id" element ={<GetVehicle/>}/>
       <Route path ="/getpolicy/:id" element ={<GetPolicy/>}/>
       <Route path ="/showallpolicy" element={<ShowAllPolicy/>}/>
       <Route path ="/showtoadmin/:id" element={<ShowPolicytoAdmin/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App1 />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
