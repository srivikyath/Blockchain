// import React from "react";
import React, { useEffect, useState } from "react";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Web3Contract1 from "./contract";
import Web3Contract2 from "./contract1";
import { Web3Storage } from 'web3.storage';

const currentdate = new Date();
const year = currentdate.getFullYear();
const month = currentdate.getMonth();
const date = currentdate.getDate();
const time = currentdate.getHours();
const min = currentdate.getMinutes();
const sec = currentdate.getSeconds();
const milsec = currentdate.getMilliseconds();


function Register() {

    const [win, setwin] = useState([]);
    const [win1, setWin1] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);



    const contract2 = Web3Contract2();
    const contract3 = contract2[1];
    const account3 = contract2[0];

    let reslen;
    const getter = async () => {
        contract3.methods.verify().call().then((result) => {
            reslen = result.length;
            console.log(result);
            setWin1(result);
        })
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileCid, setfileCid] = useState("");
    const contract1 = Web3Contract1();
    const contract = contract1[1];
    const account = contract1[0];
    useEffect(() => {
        if (contract) {
            try {
                get();
                // console.log("hgfhgbv")
            }
            catch (error) {
                console.log(error);
                // console.log("hgfhgbv")
            }
        }
    }, [contract]);
    const sendtoweb3 = (e) => {
        uploadFile(e.target.files[0]);

    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (selectedFile) {
            try {
                const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI1M2U1RTlBNmVEYzk1Y2FDZjU0NWZEN0JCYkRmOTcwOTU0ODE1NUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTg4Mzk1OTc0ODEsIm5hbWUiOiJQcm9qZWN0In0.kF8ghIM6Otvz0CFZsYUHEncY4JZDDbM3oe3HIgY0ehg" });

                setUploading(true);

                const cid = await client.put([selectedFile], {
                    onRootCidReady: (cid) => {
                        console.log(`File uploaded to Web3.Storage with CID: ${cid}`);
                        setUploading(true);
                    },
                    onStoredChunk: (progress) => {
                        const uploadPercentage = Math.round(progress * 100);
                        setUploadProgress(uploadPercentage);
                    },
                });

                setfileCid(cid);
                console.log(`File uploaded to Web3.Storage with CID: ${cid}`);
            } catch (error) {
                console.error('Error uploading file:', error);
                setUploading(false);
            }
        } else {
            console.log('No file selected.');
        }
    };
    const downloadFile = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
    const handleDownload = async (fileCid1) => {
        setfileCid(fileCid1);
        console.log(fileCid1);
        try {
            const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI1M2U1RTlBNmVEYzk1Y2FDZjU0NWZEN0JCYkRmOTcwOTU0ODE1NUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTg4Mzk1OTc0ODEsIm5hbWUiOiJQcm9qZWN0In0.kF8ghIM6Otvz0CFZsYUHEncY4JZDDbM3oe3HIgY0ehg"; // Replace with your actual API key
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
    const sender = async () => {


        const patchname = document.getElementById("patchname").value;
        const e1 = document.getElementById("os").value;
        const e2 = document.getElementById("app").value;
        const e3 = document.getElementById("ver").value;
        const e4 = fileCid;
        console.log(fileCid + "vamsi");
        console.log(e4);
        const e5 = document.getElementById("dis").value;
        const e6 = `Date: ${date}/${month}/${year} 
        Time: ${time}/${min}/${sec}/${milsec}`;
        await contract.methods.registered(patchname, e1, e2, e3, e4, e5, e6).send({ from: account });
        console.log(e1)
        console.log(e2)
        console.log(e3)
        console.log(e4)
        console.log(e5)
        console.log(e6);
        await contract3.methods.selectedReport(e5).send({ from: account }).then((result) => {
            console.log(result)
        })
    }




    const get = async () => {
        console.log("shahsisss")
        contract.methods.show().call().then((result) => {
            console.log(result);
            setwin(result);

        })
    }
    useEffect(() => {
        let progressInterval;

        if (uploading) {
            progressInterval = setInterval(() => {
                setUploadProgress((prevProgress) => {
                    // Increase progress by a small value for smooth animation
                    const newProgress = prevProgress + 1;
                    return newProgress > 100 ? 100 : newProgress;
                });
            }, 100); // Adjust the interval time for faster or slower animation
        } else {
            clearInterval(progressInterval);
        }

        return () => clearInterval(progressInterval);
    }, [uploading]);


    const [requestObj, setRequestObject] = useState({});
    const bugToPatch = (data) => {
        setRequestObject(data);
    }
    let i1 = 0;
    let i2 = 0;
    return (
        <>
            <div className="container">
                <br />
                <nav className="container navbar navbar-expand-sm bg-light navbar">
                    <div className="container d-flex justify-content-evenly">

                        <div>
                            <button className="btn btn-outline-primary" onClick={
                                () => {
                                    getter()
                                }
                            }>
                                Check My bugs
                            </button>
                        </div>

                    </div>
                    <br />

                </nav>
                <br />
                {
                    win1 && win1 != "" &&

                    <table id="table3" className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Operation System</th>
                                <th scope="col">Application</th>
                                <th scope="col">Version</th>
                                <th scope="col">Descripition</th>
                                <th scope="col">Work on it</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {win1.map((data, dataIndex) => {
                                if (data.bugtopatch != 1) {
                                    if (data.selectionstatus == 1) {
                                        i2++
                                        return (
                                            <>
                                                <tr >
                                                    <td className="col">{dataIndex + 1}</td>
                                                    <td className="col">{data.os}</td>
                                                    <td className="col">{data.app}</td>
                                                    <td className="col">{data.ver}</td>
                                                    <td className="col">{data.dis}</td>
                                                    <td className="col">
                                                        <button className="btn btn-dark" onClick={() =>
                                                            bugToPatch(data)}>
                                                            Work on it
                                                        </button>
                                                    </td>

                                                </tr >
                                            </>
                                        )
                                    }
                                }
                            })}
                        </tbody>
                        <div className="container-fluid">
                            {
                                i2 == 0
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
                    </table>

                }
                <hr />
                {requestObj && (
                    <>
                        <div className="d-flex justify-content-center">
                            <h3>Register patch here</h3>

                        </div>

                        <div>
                            <label for="patchname">Patch name</label>
                            <input type="text" id="patchname" placeholder="Patchname" />

                        </div>
                        <br />
                        <label for="applicationnme">Selected OS:</label>
                        <input id="os" name="applicationname" title="operating" readOnly value={requestObj.os}>

                        </input>
                        <br />
                        <br />
                        <label for="versionname">Selected application:</label>
                        <input id="app" name="versionname" title="version" readOnly value={requestObj.app}>
                        </input>
                        <br />
                        <br />
                        <label for="version">selected version:</label>
                        <input id="ver" name="versionn" title="versionn" readonly value={requestObj.ver}>
                        </input>
                        <br />
                        <br />
                        <div>
                            <input type="file" onChange={handleFileChange} />
                            <button ype="button" class="btn btn-light btn-lg" onClick={uploadFile}>Upload</button>

                            {uploading && (
                                <div>
                                    <progress value={uploadProgress} max="100" />
                                    <div>{uploadProgress}%</div>
                                </div>
                            )}
                        </div>
                        <br />
                        <textarea name="dis" id="dis" placeholder="Type your Discription" value={requestObj.dis}></textarea>
                        <br />
                        <br />
                        <button type="submit" className="btn btn-dark" id="submitt" onClick={sender}>Submit</button>
                    </>
                )
                }
                <br />
                <br />
                <br />
                <hr />
                <br />
                <table id="table3" className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Patch Name</th>
                            <th scope="col">Operation System</th>
                            <th scope="col">Application</th>
                            <th scope="col">Version</th>
                            <th scope="col">Descripition</th>
                            <th scope="col">Time Stamp</th>
                            <th scope="col">Verification Status</th>
                            <th scope="col">Deployment Status</th>
                            <th scope="col">Download</th>
                        </tr>
                    </thead>
                    <tbody id="tbody1">
                        {win.map((data, dataIndex) => {
                            i1++;
                            return (
                                <>
                                    <tr >
                                        <td className="col">{dataIndex + 1}</td>
                                        <td className="col">{data.patchname}</td>
                                        <td className="col">{data.os}</td>
                                        <td className="col">{data.app}</td>
                                        <td className="col">{data.version}</td>
                                        <td className="col">{data.dis}</td>
                                        <td className="col">{data.timestamp}</td>
                                        <td className="col">{data.verificationstatus}</td>
                                        <td className="col">{data.deploymentstatus}</td>
                                        <td className="col">
                                            <button className="btn btn-dark" onClick={() => handleDownload(data.cid)} >Download</button>
                                        </td>
                                    </tr >
                                </>
                            )
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
        </>
    )
}


export default Register;