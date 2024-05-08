import React, { useEffect, useState } from "react";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Web3Contract1 from "./contract";
import green from "./greenleaves.jpg";
import { Web3Storage } from 'web3.storage';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
    const notify = () => toast("Wow so easy!")

    const openInstagram = () => {
        window.open("https://instagram.com/patch_blockers?igshid=MzRlODBiNWFlZA==");
    };
    const openGithub = () => {
        window.open("https://github.com/Shashi-Tej-Reddy-Singa-Reddy/BLOCKCHAIN-BASED-PATCH-MANAGEMENT-SYSTEM");
    };
    const openEmail = () => {
        window.open("https://mail.google.com/mail/u/0/#inbox", "_self");

    };

    let i = 1;
    let Navigate = useNavigate();
    const [fileCid, setfileCid] = useState("");
    const handleDownload = async (fileCid1) => {
        setfileCid(fileCid1);
        console.log(fileCid1);
        try {
            // const apiKey = process.env.REACT_APP_APIKEY; // Replace with your actual API key
            const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU1NGZlOWYyNUI2NDk2N0U4MTY3OUIyZTljOEVFQTViNDNlNzZiY2YiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODg0NjI3NjgxOTUsIm5hbWUiOiJyZWdpc3RlcmJ1ZyJ9.sXWJ0TPv2EWe2w6N32TVrARiMpW0GusaiwS__5FjDcE"; // Replace with your actual API key
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
    const [win, setwin] = useState([]);


    const contract1 = Web3Contract1();
    const contract = contract1[1];
    const account = contract1[0];
    useEffect(() => {
        try {
            get();
        }
        catch (error) {
            console.log(error);
        }
    }, [contract]);

    const [trend, setTrend] = useState('');

    const get = async () => {
        contract.methods.show().call().then((result) => {
            console.log(result);
            setwin([...result].reverse());
            console.log("result cid: " + result.cid);
        })
    }

    const divStyle = {
        backgroundImage: `url(${green})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "200vh",
    };

    const login = () => {
        Navigate("/login1")
    }

    return (
        <>
            <div>
                {/* <div>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Report") }} >
                        report a bug
                    </button>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Labeler") }} >
                        Labeler
                    </button>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Request") }} >
                        Request patch
                    </button>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Register") }} >
                        Register Patch
                    </button>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Verify") }} >
                        Verify
                    </button>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Deploy") }} >
                        Deploy
                    </button>
                    <button className="btn btn-primary p-1 m-1" onClick={() => { Navigate("/Tranhist") }}>
                        Tranhist
                    </button>
                </div> */}
            </div>
            <br />

            <div className="container-flex" >

                <div className="container" >

                    <table id="table1" className="table-striped table table-bordered">
                        <thead className="container">
                            <tr>
                                <th scope="col"><b>S.No</b></th>
                                <th scope="col"><b>Patch Name</b></th>
                                <th scope="col"><b>Operation System</b></th>
                                <th scope="col"><b>Application</b></th>
                                <th scope="col"><b>Version</b></th>
                                <th scope="col"><b>Descripition</b></th>
                                <th scope="col">download</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {
                                win.map((data, dataIndex) => {

                                    if (data.deploymentstatus == "Deployed") {
                                        return (
                                            <>
                                                <tr>
                                                    <td><b>{i++}</b></td>
                                                    <td>{data.patchname}</td>
                                                    <td>{data.os}</td>
                                                    <td>{data.app}</td>
                                                    <td>{data.version}</td>
                                                    <td>{data.dis}</td>
                                                    <td className="col">
                                                        <button className="btn btn-dark" onClick={() => handleDownload(data.cid)} >Download</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                })}
                        </tbody>
                    </table>
                </div>
                <div className="container" ><hr /></div>
                <br />
                <div className="container" id="project">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Trending Patch</h5>
                                    <p className="card-text">This is the patch that has been download by most of the users recently.</p>
                                    <button className="container btn btn-dark" onClick={handleDownload} >
                                        Download
                                    </button>
                                    <ToastContainer />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Recent viewed Patch</h5>
                                    <p className="card-text">This is the patch,you have viewed recently.</p>
                                    <button className="container btn btn-dark" onClick={downloadFile}>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Most Recomended</h5>
                                    <p className="card-text">This is most Recomended Patch by your software provider.</p>
                                    <button className="container btn btn-dark" onClick={downloadFile}>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Report a Bug</h5>
                                    <p className="card-text">Found any Bug in the system report here.</p>
                                    <button className="container btn btn-dark" onClick={login}>
                                        report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="container" ><hr /></div>
                <div className="container">
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="feature col">

                            <h3 className="fs-2">Check Our Repository</h3>
                            <p>Get our Project real time update in our Git Hub Repository</p>

                            <FontAwesomeIcon icon={faGithub} size="2x" color="&#xf09b" className="github" onClick={openGithub} />
                            <span id="index"></span>
                        </div>
                        <div className="feature col">

                            <h3 className="fs-2">Instagram</h3>
                            <p>See our latest updated information in our instagram handle</p>

                            <FontAwesomeIcon icon={faInstagram} size="2x" color="#e1306c" className="instagram-icon" onClick={openInstagram} />
                        </div>
                        <div className="feature col">

                            <h3 className="fs-2">Email Us</h3>
                            <p>contact us through the email and get a chance to work with us </p>
                            <FontAwesomeIcon icon={faEnvelope} size="2x" color="#e1306c" className="instagram-icon" onClick={openEmail} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;




