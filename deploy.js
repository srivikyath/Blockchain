import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Web3Contract1 from "./contract";


function Deploy() {
    let Navigate = useNavigate();
    const [win, setwin] = useState([]);


    const contract1 = Web3Contract1();
    const contract = contract1[1];
    const account = contract1[0];
    useEffect(() => {
        try {
            get();
            console.log("shashi");
        }
        catch (error) {
            console.log(error);
            console.log("shashi");
        }
    }, [contract]);



    const get = async () => {
        const data = await window.contract.methods.show().call();
        window.contract.methods.show().call().then((result) => {
            console.log("shashi");
            console.log(result);
            setwin(result);
        })
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
                        <button className="btn btn-info p-1 m-1" onClick={() => { Navigate("/Tranhist") }}>
                            Tranhist
                        </button>
                    </div>
                </>
            </nav>
            <br />
            <div className="container">
                <table id="table4" className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">time</th>
                            <th scope="col">Patch Nmae</th>
                            <th scope="col">Operation System</th>
                            <th scope="col">Application</th>
                            <th scope="col">Version</th>
                            <th scope="col">Descripition</th>
                            <th scope="col">deploy?</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {win.map((data, dataIndex) => {
                            let i = 1;
                            if (data.verificationstatus === 'Verified' && data.deploymentstatus !== 'Deployed') {
                                i1++;
                                return (
                                    <>
                                        <tr>
                                            <td>{i++}</td>
                                            <td className="col">{data.timestamp}</td>
                                            <td className="col">{data.patchname}</td>

                                            <td className="col">{data.os}</td>
                                            <td className="col">{data.app}</td>
                                            <td className="col">{data.version}</td>
                                            <td className="col">{data.dis}</td>
                                            <td>
                                                <button className="col btn btn-success" onClick={() => {
                                                    contract.methods.Deployed(data.patchname).send({ from: account });
                                                }} >Deploy</button>
                                            </td>
                                        </tr>
                                    </>
                                )

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
            </div>

        </>
    )
}

export default Deploy;