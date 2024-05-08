import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/navbar";
import Support from "./components/support";
import Report from "./components/report_a_bug";
import Labeler from "./components/labeler";
import Request from "./components/Request_patch"
import Register from "./components/register_patch";
import Verify from "./components/verfiy";
import Deploy from "./components/deploy";
import Login from "./components/login";
import Login1 from "./components/login1";
import Tranhist from "./components/Tranhist";
import E404 from "./components/E404";
import green from "./pic/greenleaves.jpg"
import Cookie from 'universal-cookie'



const currentdate = new Date();
const year = currentdate.getFullYear();
const month = currentdate.getMonth();
const date = currentdate.getDate();
const time = currentdate.getHours();
const min = currentdate.getMinutes();
const sec = currentdate.getSeconds();
const milsec = currentdate.getMilliseconds();
console.log(year);
console.log(month);
console.log(date);
console.log(time);
console.log(min);
console.log(sec);
console.log(milsec);







function App() {
  console.log("Cookie at app: " + sessionStorage.getItem("Role"));


  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentdate = new Date();
      const year = currentdate.getFullYear();
      const month = currentdate.getMonth();
      const date = currentdate.getDate();
      const time = currentdate.getHours();
      const min = currentdate.getMinutes();
      const sec = currentdate.getSeconds();
      setTimestamp(
        `${date}/${month}/${year} . ${time}:${min}:${sec}`
      );
    }, 1000); // Update every second (1000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);




  let [role, setrole] = useState("");
  const handleRole = (data) => {
    setrole(data);
  }
  return (
    <>
      <Router>
        <NavBar role={role} />
        <>
          <>
          </>
        </>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Labeler" element={<Labeler />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/Deploy" element={<Deploy />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/login1" element={<Login1 role={handleRole} />} />
          <Route path="/Tranhist" element={<Tranhist />} />
          <Route path="/E404" element={<E404 />} />

        </Routes>
      </Router>
      <hr />
      <div className="container" id="tst" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>
          <b>Active Stamp ©</b> {timestamp}
        </p>
      </div>
    </>

  );

}

export default App;
