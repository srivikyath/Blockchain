import React, { useEffect, useState } from "react";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tranhist() {
    const [histt, setHistt] = useState([]);
    const Labeller = () => {
        setHistt(['Labeller']);
    }
    const userreporter = () => {
        setHistt(['User']);
    }
    const adminrequest = () => {
        setHistt(['AdminRequest']);
    }
    const developer = () => {
        setHistt(['Developer']);
    }
    const verifierhist = () => {
        setHistt(['Verifier']);
    }
    const admindeploy = () => {
        setHistt(['AdminDeploy']);
    }
    const all = () => {
        setHistt(['Labeller', 'User', 'AdminRequest', 'Developer', 'Verifier', 'AdminDeploy'])
    }
    useEffect(() => {
        all();
    }, [])



    let Navigate = useNavigate();
    const [win, setwin] = useState([]);
    useEffect(() => {
        mongodataget();
    })
    const mongodataget = async () => {
        console.log("mongodataget entered");
        try {
            console.log("mongodataget entered in try");
            const gett = await axios.get('http://localhost:5001/api/verifyhist');
            console.log("mongodataget entered in try and after localhost");
            console.log(gett.data);
            setwin([...gett.data].reverse());
            const len = gett.data.length;
            console.log(len);
            for (var i = 0; i < len; i++) {
                console.log(gett.data[i].email);
            }
        }
        catch (error) {
            console.log("mongodataget entered in error");
            console.log(error);
        }
    }
    let i1 = 0;
    return (

        <>
            <br />
            <nav className="navbar navbar-expand-sm globalnav-item globalnav-menuback container">
                <>
                    <div>
                        <button className="btn btn-warning p-1 m-1" onClick={() => { Navigate("/Request") }} >
                            Request patch
                        </button>
                    </div>
                    <br />
                    <div>
                        <button className="btn btn-success p-1 m-1" onClick={() => { Navigate("/Deploy") }} >
                            Deploy
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-info p-1 m-1" onClick={() => {
                            Navigate("/Tranhist");
                        }}>
                            Tranhist
                        </button>
                    </div>
                </>
            </nav>
            <br />
            <div className="container mx-9" style={{ padding: '3px', maxWidth: '1200px' }}>
                <nav className="navbar navbar-expand-sm globalnav-item globalnav-menuback container">
                    <>
                        <div>
                            <button className="btn btn-warning p-1 m-1" onClick={Labeller} >
                                Labeller
                            </button>
                        </div>
                        <br />
                        <div>
                            <button className="btn btn-success p-1 m-1" onClick={userreporter} >
                                User-Reporter
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-success p-1 m-1" onClick={adminrequest} >
                                Admin-Request
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-info p-1 m-1" onClick={developer}>
                                Developer
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-info p-1 m-1" onClick={verifierhist}>
                                verifier
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-info p-1 m-1" onClick={admindeploy}>
                                Admin-Deploy
                            </button>
                        </div>
                    </>
                </nav>
            </div>
            <div className="container">
                <div className="table-responsive">
                    <table id="table2" className="table table-striped table-bordered  ">

                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"><b>sno</b></th>
                                <th scope="col"><b>Name</b></th>
                                <th scope="col"><b>BlockNumber</b></th>
                                <th scope="col"><b>Gas used</b></th>
                                <th scope="col"><b>Gas Price</b></th>
                                <th scope="col"><b>Date / Time</b></th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

                            {
                                win.map((data, dataIndex) => {
                                    if (histt.includes(data.name)) {
                                        i1++;
                                        return (
                                            <>
                                                <tr >
                                                    <td className="col"><b>{dataIndex + 1}</b></td>
                                                    <td className="col">{data.name}</td>
                                                    <td className="col">{data.blocknumber}</td>
                                                    <td className="col">{data.gasused}</td>
                                                    <td className="col">{data.effectivegasprice}</td>
                                                    <td className="col"><b>{data.timeed}</b></td>
                                                </tr >
                                            </>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>



            </div>
        </>
    )
}

export default Tranhist;