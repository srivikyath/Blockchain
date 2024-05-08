import React, { useEffect, useState } from "react";
import Pic from "../pic/home.png";
import { useNavigate } from "react-router-dom";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import detectEthereumProvider from "@metamask/detect-provider";
import './Navbar2.css';
import Cookies from "universal-cookie";
import axios from "axios";

function NavBar({ role }) {
    let Navigate = useNavigate();
    let Cookie = new Cookies();
    let [Role, setRole] = useState("");

    const change = async () => {
        const provider = await detectEthereumProvider();
        console.log(provider);
        if (provider) {
            await provider.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }],
            });
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                let { data } = await axios.get("http://localhost:5001/api/user", {
                    withCredentials: true
                });
                console.log("username: " + data.username)
                sessionStorage.setItem("Role", data.username);
                if (!data.error) {
                    setRole(data.username);
                } else {
                    setRole(role);

                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [Role, role]);

    const handleLogout = () => {
        Cookie.remove("shashi");
        Navigate("");
        setRole("");
        window.location.reload();
        sessionStorage.clear()
    };

    return (
        <>
            <nav className="navbar navbar-expand-sm globalnav-item globalnav-menuback">
                <div className="container-fluid globalnav-item globalnav-menuback">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <button onClick={() => { Navigate("/") }}>
                            <img src={Pic} alt="Avatar Logo" style={{ width: "45px" }} className="rounded-pill" />
                        </button>
                        <button className="btn btn-dark p-1 m-1" onClick={() => { Navigate("/Support") }}>
                            Support
                        </button>
                        <div>
                            <button className="btn btn-dark p-1" onClick={change}>
                                Change Account
                            </button>
                        </div>
                    </div>

                    {(() => {
                        if (Role === "User") {
                            return (
                                <div>
                                </div>
                            );
                        } else if (Role === "labeller") {
                            return (
                                <div>
                                </div>
                            );
                        } else if (Role === "admin") {
                            return (
                                <div>
                                </div>
                            );
                        } else if (Role === "verifier") {
                            return (
                                <div className="">
                                </div>
                            );
                        } else if (Role === "developer") {
                            return (
                                <div>
                                </div>
                            );
                        }
                    })()}
                    <br />
                    {(() => {
                        if (!Cookie.get("shashi")) {
                            return (
                                <>
                                    <div>
                                        <button className="btn btn-dark p-1 mx-2" onClick={() => { Navigate("/Login") }}>
                                            Sign Up
                                        </button>
                                    </div>
                                    <div>
                                        <button className="btn btn-dark p-1" onClick={() => {
                                            Navigate("/Login1");
                                            sessionStorage.clear();
                                        }}>
                                            Log In
                                        </button>
                                    </div>
                                </>
                            );
                        } else {
                            return (
                                <div>
                                    <button className="btn btn-dark p-1" onClick={handleLogout}>
                                        Log out
                                    </button>
                                </div>
                            );
                        }
                    })()}
                </div>
            </nav >
        </>
    );
}

export default NavBar;
