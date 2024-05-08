import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import React, { useEffect, useState } from "react";
import Web3Contract3 from "./contract1";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import { ToastContainer, toast } from 'react-toastify';


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
let tst = { date };
console.log(tst);
function Report() {
    const [logintonext, setLogintonext] = useState("");
    const callToastSuccess = () => toast("Login success");
    useEffect(() => {
        const logintonext2 = sessionStorage.getItem("logintoreport");
        const getItem2 = () => {

            setLogintonext(sessionStorage.getItem("logintoreport"));

        }
        if (logintonext2 === "true") {
            console.log("toast checked true")
            callToastSuccess();
        }
        getItem2();
    }, [])
    useEffect(() => {
        sessionStorage.clear();
    }, [])

    console.log("session storage: " + sessionStorage.getItem("Role"));


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






    const [resulter, setResulter] = useState([]);
    const timeed = `Date: ${date}/${month}/${year}-Time: ${time}/${min}/${sec}/${milsec}`;
    console.log(timeed);
    let label = "0";

    const [oss, setOss] = useState('');
    const [appp, setAppp] = useState('');
    const [verr, setVerr] = useState('');
    const [diss, setDiss] = useState('');
    const [userr, setUserr] = useState('');

    const submitreport = async (result) => {
        console.log("Data Base Send activated");
        console.log("submit verify");
        console.log(resulter);
        try {
            await axios.post('http://localhost:5001/api/bugreport', { os: oss, app: appp, version: verr, dis: diss, user: sessionStorage.getItem("Role"), timeed: timeed, label: label });
            console.log("Hello");
        } catch (error) {
            console.error(error);
        }
        console.log("Data Base Send completed");
        window.location.reload();
    }

    const mongsignupget = async () => {
        console.log("mongodataget entered");
        try {
            console.log("mongodataget entered in try");
            const gett = await axios.get('http://localhost:5001/api/signup');
            console.log("mongodataget entered in try and after localhost");
        }
        catch (error) {
            console.log("mongodataget entered in error");
            console.log(error);
        }
    }
    useEffect(() => {
        mongogetreport();
    }, [])



    const mongogetreport = async () => {
        console.log("mongodataget entered");
        try {
            console.log("mongodataget entered in try");
            const gettt = await axios.get('http://localhost:5001/api/bugreport');
            console.log("mongodataget entered in try and after localhost");
            setWinn([...gettt.data].reverse());
            console.log("shashi get mongo data " + gettt.data[0].os);
        }
        catch (error) {
            console.log("mongodataget entered in error");
            console.log(error);
        }
    }
    const [winn, setWinn] = useState([]);
    const contract1 = Web3Contract3();
    const contract = contract1[1];
    const account = contract1[0];
    useEffect(() => {
        try {
            getter();
        }
        catch (error) {
            console.log(error);
        }
    }, [contract]);
    let Navigate = useNavigate();
    useEffect(() => {
        all();
    }, [])


    const sender = async () => {
        let tst = { date };
        const e1 = document.getElementById("os").value;
        const e2 = document.getElementById("app").value;
        const e3 = document.getElementById("ver").value;
        const e4 = document.getElementById("dis").value;
        const e5 = { timestamp };
        console.log("shashi");
        console.log(e5);
        await window.contract.methods.submit(e1, e2, e3, e4, e5).send({ from: account });
        Navigate("/Report")
    }


    const getter = async () => {
        window.contract.methods.verify().call().then((result) => {
            console.log(result);
        })
    }
    const [os, setos] = useState([])
    const wind = () => {
        setos(["windows"]);
    }
    const macoss = () => {
        setos(["macos"]);
    }
    const linuxx = () => {
        setos(["linux"]);
    }
    const ubuntu = () => {
        setos(["ubuntu"]);
    }
    const all = () => {
        setos(["ubuntu", "linux", "macos", "windows"]);
    }

    let i = 1;
    let i1 = 0;
    let k = 0;
    return (
        <>
            <ToastContainer />
            <br />
            <div className="container">
                <h3>My Reported Bugs ➡</h3>
            </div>
            <br />
            <div className="container ">
                <nav className="navbar navbar-expand-sm globalnav-item globalnav-menuback container">

                    <>
                        <div>

                            <button className="container btn btn-dark mx-4" style={{ marginLeft: "auto" }} onClick={wind}>Windows</button>

                        </div>
                        <br />
                        <div>
                            <button className="container btn btn-dark mx-4" style={{ marginLeft: "auto" }} onClick={macoss}>Mac Os</button>
                        </div>
                        <div>
                            <button className="container btn btn-dark mx-4" style={{ marginLeft: "auto" }} onClick={linuxx}>Linux</button>
                        </div>
                        <div>
                            <button className="container  btn btn-dark mx-4" style={{ marginLeft: "auto" }} onClick={ubuntu}>Ubuntu</button>
                        </div>
                        <div className="container d-flex  justify-content-end">
                            <button className="btn btn-dark hover" style={{ marginLeft: "end" }} onClick={() => window.location.reload(false)}>Click to reload!</button>
                        </div>
                    </>
                </nav>

            </div>
            <div className="container">
                <br />
                <div className="container-fluid">
                    <table id="table1" className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Operation System</th>
                                <th scope="col">Application</th>
                                <th scope="col">Version</th>
                                <th scope="col">Descripition</th>
                                <th scope="col">name</th>
                                <th scope="col">Time of report</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {
                                winn.map((data, dataIndex) => {
                                    if (sessionStorage.getItem("Role") === data.user) {
                                        if (os.includes(data.os)) {
                                            i1++
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{i++}</td>
                                                        <td>{data.os}</td>
                                                        <td> {data.app}</td>
                                                        <td>{data.version}</td>
                                                        <td>{data.dis}</td>
                                                        <td>{data.user}</td>
                                                        <td>{data.timeed}</td>
                                                    </tr>
                                                </>
                                            )

                                        }
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="container d-flex justify-content-center">
                    {
                        i1 == 0
                        && (
                            <>

                                <tr>
                                    <td >
                                        <p><b style={{ 'color': 'red' }}>No data available at this time. please ckeck your internet connection or add data to view</b></p>
                                    </td>
                                </tr>

                            </>
                        )
                    }
                </div>
                <span id="report_a_bug"></span>
            </div >
            <br />
            <div className="container">
                <hr />
                <h3 className="container d-flex justify-content-center">Report a new bug here</h3>
            </div>
            <div className="container" >
                <label for="applicationnme">Choose the os :➡</label>
                <select id="os" name="applicationname" onChange={(e) => {
                    setOss(e.target.value);
                }} title="operating">
                    <option value="."> Select</option>
                    <option value="windows">windows</option>
                    <option value="macos">mac</option>
                    <option value="linux">linux</option>
                    <option value="ubuntu">ubuntu</option>
                </select>
                <br />
                <br />
                <label for="versionname">Choose the application:</label>
                <select id="app" name="versionname" onChange={(e) => {
                    setAppp(e.target.value);
                }} title="version">
                    <option value=".">Select</option>
                    <option value="chrome">chrome</option>
                    <option value="brave">brave</option>
                    <option value="game">game</option>
                    <option value="vs code">vs code</option>
                    <option value="python">python</option>
                    <option value="java">java</option>
                </select>

                <br />
                <br />

                <label for="version">Choose the version:</label>
                <select id="ver" name="versionn" onChange={(e) => {
                    setVerr(e.target.value);
                }} title="versionn">
                    <option value=".">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>

                <br />
                <br />
                <textarea name="dis" id="dis" onChange={(e) => { setDiss(e.target.value) }} placeholder="Type your Discription"></textarea>
                <br />
                <button type="submit" className="btn btn-primary" id="submitt" onClick={submitreport}>Submit</button>
                <br />
            </div>
        </>
    )
    console.log("k2" + k);
    k = i1
    console.log("k3" + k);
}
export default Report;



