import Web3Contract3 from "./contract1";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from 'universal-cookie'
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



function Labeler() {

    const [logintonext, setLogintonext] = useState("");
    const callToastSuccess = () => toast("Login success");
    useEffect(() => {
        const logintonext2 = sessionStorage.getItem("logintolabeller");
        const getItem2 = () => {

            setLogintonext(sessionStorage.getItem("logintolabeller"));

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

    var cookie = new Cookie();
    console.log("Cookie labeller : " + cookie);


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

    const [dataa, setDataa] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5001/api/bugreport')
            .then(res => setDataa(res.data))
            .catch(err => console.log(err))
    }, [])

    const [winn, setWinn] = useState([]);
    let i = 1;
    const [array1, setArray1] = useState([]);
    const [array2, setArray2] = useState([]);
    const [reportArray, setReportArray] = useState([]);
    const labelsub = async () => {
        console.log(array1);
        console.log(array2);
        window.contract.methods.submit(os, app, ver, dis, timed, array1, array2).send({ from: account });
        try {
            const response = await axios.post("http://localhost:5001/api/updateLabel", {
                data: discrlabel
            })
            console.log(response.json());
        }
        catch (error) {
            console.log(error)
        }

    }
    const [dis, setdis] = useState("")
    const [os, setos] = useState("")
    const [app, setApp] = useState("")
    const [timed, settimed] = useState("")
    const [ver, setver] = useState("")
    const handleBugArr = (e, dis, os, app, ver, disc, timed) => {
        if (e.target.value) {
            setArray1((prev) => [...prev, dis]);
            setArray2((prev) => [...prev, e.target.value]);
            setos(os)
            setApp(app)
            setdis(disc)
            settimed(timed)
            setver(ver)

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
    const [discrlabel, setDiscrlabel] = useState([]);

    const handleLabelInMongo = (dis, e) => {
        setDiscrlabel((prevDiscrlabel) => [
            ...prevDiscrlabel,
            { description: dis, labelValue: e.target.value }
        ]);
    };




    const contract1 = Web3Contract3();

    const contract = contract1[1];
    const account = contract1[0];
    useEffect(() => {
        if (contract) {
            try {

                getter();
                console.log("shashi")
            }
            catch (error) {
                console.log(error);
                console.log("error");

            }
        }
    }, [contract]);



    let reslen;

    const getter = async () => {

        console.log("hello");

        console.log(contract.methods);

        const data = await contract.methods.verify().call();
        console.log(data);
        setReportArray(data)

    }
    useEffect(() => {
        all();
    }, [])

    const [oss, setoss] = useState([])
    const wind = () => {
        setoss(["windows"]);
    }
    const macoss = () => {
        setoss(["macos"]);
    }
    const linuxx = () => {
        setoss(["linux"]);
    }
    const ubuntu = () => {
        setoss(["ubuntu"]);
    }
    const all = () => {
        setoss(["ubuntu", "linux", "macos", "windows"]);
    }

    let i1 = 0;
    return (
        <>
            <ToastContainer />

            <h1 className="container">Reported Bugs</h1>
            <hr />
            <div className="container">
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
                <br />

                <table id="table12" className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Operation System</th>
                            <th scope="col">Application</th>
                            <th scope="col">Version</th>
                            <th scope="col">Descripition</th>
                            <th scope="col">Time of report</th>
                            <th scope="col"><b>Username</b></th>
                            <th scope="col"><b>Lable here</b></th>
                        </tr>
                    </thead>
                    <tbody id="tbody">



                        {winn.map((data, dataIndex) => {
                            if (oss.includes(data.os)) {
                                if (data.label == "0") {
                                    i1++
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <b>{i++}</b>
                                                </td>
                                                <td>
                                                    {data.os}
                                                </td>
                                                <td>
                                                    {data.app}
                                                </td>
                                                <td>
                                                    {data.version}
                                                </td>
                                                <td>
                                                    {data.dis}
                                                </td>
                                                <td>
                                                    {data.timeed}
                                                </td>
                                                <td>
                                                    {data.user}
                                                </td>
                                                <td>

                                                    <select className="form-select" style={{ color: 'rgb(237,107,96)' }} aria-label="Default select example" onChange={(e) => {
                                                        handleBugArr(e, data.dis, data.os, data.app, data.version, data.dis, data.timeed)
                                                        handleLabelInMongo(data.dis, e);
                                                    }}>
                                                        <option selected><b>Lable Here</b></option>
                                                        <option value="1"><b>1</b></option>
                                                        <option value="2"><b>2</b></option>
                                                        <option value="3"><b>3</b></option>
                                                        <option value="4"><b>4</b></option>
                                                        <option value="5"><b>5</b></option>
                                                    </select>

                                                </td>
                                            </tr>

                                        </>
                                    )
                                }
                            }
                        })}
                    </tbody>
                </table>
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
            </div>
            <div>
                <button className="btn btn-dark" onClick={labelsub}>
                    Send To admin
                </button>
            </div>
        </>
    )
}

export default Labeler;