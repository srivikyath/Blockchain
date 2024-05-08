// import React from "react";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Web3Storage } from 'web3.storage';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Web3Contract1 from "./contract";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const currentdate = new Date();
const year = currentdate.getFullYear();
const month = currentdate.getMonth();
const date = currentdate.getDate();
const time = currentdate.getHours();
const min = currentdate.getMinutes();
const sec = currentdate.getSeconds();
const milsec = currentdate.getMilliseconds();





function Verify() {
    let Navigate = useNavigate();
    let i = 1
    const name = 'Verifier';
    const verified = 'verified';
    const rejected = 'rejected';
    const [win, setwin] = useState([]);
    const [resulter, setResulter] = useState([]);
    const timeed = `Date: ${date}/${month}/${year}-Time: ${time}/${min}/${sec}/${milsec}`;
    useEffect(() => {
        all();
    }, [])


    const getTransactionDetails = async (txHash) => {
        // const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/nzorq5D2odtKK6zLcxgJ8prCJLE9iW2G"); // Update the port number if necessary
        const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/nzorq5D2odtKK6zLcxgJ8prCJLE9iW2G"); // Update the port number if necessary

        web3.eth.getTransactionReceipt(txHash).then((result) => {
            console.log(result);
            const TransactionHash = result.transactionHash;
            console.log("Transactioin hash : " + TransactionHash);
            submitverify(result);

        });

    };
    const submitverify = async (result) => {
        console.log("Data Base Send activated");
        console.log("submit verify");
        console.log(resulter);
        try {
            await axios.post('http://localhost:5001/api/verifyhist', { name: name, blocknumber: result.blockNumber, gasused: result.gasUsed, cumulativeGasUsed: result.cumulativeGasUsed, effectivegasprice: result.effectiveGasPrice, from: result.from, to: result.to, blockhash: result.blockHash, transactionhash: result.transactionHash, timeed: timeed });
            console.log("blocknumber1: " + resulter.cumulativeGasUsed);
            console.log("Hello");
        } catch (error) {
            console.error(error);
        }
        console.log("Data Base Send completed");
    }
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
        window.contract.methods.show().call().then((result) => {
            console.log(result);
            setwin(result);
        }
        )
    }
    const [ver, setVer] = useState([])
    const veri = () => {
        setVer(['Verified'])
    }
    const notveri = () => {
        setVer(['Rejected'])
    }
    const all = () => {
        setVer(['Not yet sent to verification']);
    }
    const [fileCid, setfileCid] = useState("");
    const handleDownload = async (fileCid1) => {
        setfileCid(fileCid1);
        console.log(fileCid1);
        try {
            const apiKey = process.env.REACT_APP_APIKEY; // Replace with your actual API key
            const client = new Web3Storage({ token: apiKey });
            const data = await client.get(fileCid1);
            console.log(data);
            const files = await data.files();
            if (files && files.length > 0) {
                const file = files[0]
                const fileName = file.name;
                const fileDownloadURl = URL.createObjectURL(file);
                downloadFile(fileDownloadURl, fileName);
            }
            else {
                console.log("No files in response");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const downloadFile = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }


    let i1 = 0;

    return (
        <>
            <br />
            <br />
            <br />
            <nav className="navbar navbar-expand-sm globalnav-item globalnav-menuback container">
                <>
                    <div>
                        <button className="container btn btn-success mx-2" onClick={veri}>verified</button>
                    </div>
                    <br />
                    <div>
                        <button className="container btn btn-danger mx-3" onClick={notveri}>rejected</button>
                    </div>
                    <div>
                        <button className="container btn btn-dark mx-4" onClick={all}>Not yet Verified</button>
                    </div>
                </>
            </nav>
            <br />
            <div className="container">
                <hr />
            </div>
            <br />
            <div className="container">
                <div className="table-responsive">
                    <table id="table2" className="table table-striped table-bordered  ">

                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"><b>.No</b></th>
                                <th scope="col"><b>time</b></th>
                                <th scope="col"><b>Patch Nmae</b></th>
                                <th scope="col"><b>Operation System</b></th>
                                <th scope="col"><b>Application</b></th>
                                <th scope="col"><b>Version</b></th>
                                <th scope="col"><b>Descripition</b></th>
                                <th scope="col"><b>Status</b></th>
                                {ver == 'Not yet sent to verification' && (
                                    <>
                                        <th scope="col"><b>Verify/Reject</b></th>
                                    </>)}
                                <th scope="col"><b>Download</b></th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {win.map((data, dataIndex) => {
                                if (ver.includes(data.verificationstatus)) {
                                    i1++;
                                    return (
                                        <tr>
                                            <td className="col"><b>{i++}</b></td>
                                            <td className="col">{data.timestamp}</td>
                                            <td className="col">{data.patchname}</td>

                                            <td className="col">{data.os}</td>
                                            <td className="col">{data.app}</td>
                                            <td className="col">{data.version}</td>
                                            <td className="col">{data.dis}</td>
                                            {
                                                data.verificationstatus == "Verified" && (
                                                    <>
                                                        <td className="col" style={{ color: 'green' }} >
                                                            {data.verificationstatus}</td>
                                                    </>
                                                )

                                            }
                                            {
                                                data.verificationstatus == "Rejected" && (
                                                    <>
                                                        <td className="col" style={{ color: 'red' }} >{data.verificationstatus}</td>
                                                    </>
                                                )

                                            }
                                            {
                                                data.verificationstatus == "Not yet sent to verification" && (
                                                    <>
                                                        <td className="col" style={{ color: 'rgb(234,156,74)' }} ><p>Not Yet Verified</p></td>
                                                    </>
                                                )

                                            }
                                            {ver == 'Not yet sent to verification' && (
                                                <>
                                                    <td className="col">
                                                        <button className="btn btn-success" onClick={() => {
                                                            contract.methods.findandreply(data.patchname).send({ from: account }).then((result) => {
                                                                getTransactionDetails(result.transactionHash);
                                                            });
                                                        }}>verify</button>
                                                        <button className="btn btn-danger" onClick={() => {
                                                            contract.methods.findandreplynotverified(data.patchname).send({ from: account });
                                                        }}>reject</button>

                                                    </td>
                                                </>
                                            )}
                                            {

                                            }
                                            <td className="col"><b>
                                                <button className="btn btn-dark" onClick={() => handleDownload(data.cid)} >Download</button>
                                            </b></td>
                                        </tr >
                                    )
                                }
                            })}
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
            </div >
        </>
    )
}

export default Verify;