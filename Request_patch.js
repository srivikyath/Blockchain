// import react from "react";
import React, { useEffect, useState } from "react";
import web3 from "web3";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import detectEthereumProvider from "@metamask/detect-provider";
import Web3Contract1 from "./contract1";



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





function Request() {



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








    let i = 1;
    const [win, setwin] = useState([]);
    let Navigate = useNavigate();
    const contract1 = Web3Contract1();
    const contract = contract1[1];
    const account = contract1[0];
    useEffect(() => {
        if (contract) {
            try {
                getter();
                console.log("shashi");
            }
            catch (error) {
                console.log(error);
                console.log("shashi");
            }
        }
    }, [contract]);


    const sendit = async () => {
        let arr3 = [];
        for (let i = 0; i < win.length; i++) {
            if (win[i].lablestatus != 0 && win[i].selectionstatus != 1) {
                console.log(win.length);
                if (document.getElementById("check" + `${(i + 1)}`).checked) {
                    console.log("senit 1");
                    arr3.push(document.getElementById("des" + `${(i + 1)}`).innerHTML);
                }
            }
        }
        await window.contract.methods.adminselect(arr3).send({ from: account });
        console.log(arr3);




    }
    let reslen;
    const getter = async () => {
        contract.methods.verify().call().then((result) => {
            reslen = result.length;
            console.log(result);
            const tbody = document.getElementById("tbody");
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
            <div className="container">
                <div className="container">
                    <h1>Request here</h1>
                </div>
                <div className="container">
                    <table id="table12" className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Operation System</th>
                                <th scope="col">Descripition</th>
                                <th scope="col">Application</th>
                                <th scope="col">Version</th>
                                <th scope="col">Priority</th>
                                <th scope="col">select</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {win.map((data, dataIndex) => {
                                if (data.lablestatus != 0 && data.selectionstatus != 1) {
                                    i1++
                                    return (
                                        <>
                                            <tr>
                                                <td><b>{i++}</b></td>
                                                <td>{data.os}</td>
                                                <td id={"des" + (dataIndex + 1)}>{data.dis}</td>
                                                <td>{data.app}</td>
                                                <td>{data.ver}</td>
                                                <td>{data.lablestatus}</td>
                                                <td><input type="checkbox" class="form-check-input mt-0" id={"check" + (dataIndex + 1)} /></td>
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
                    <div className="btn btn-dark" onClick={sendit}>
                        Submit
                    </div>
                </div>
            </div>
        </>
    )
}

export default Request;