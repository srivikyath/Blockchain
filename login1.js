import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
function Login1({ role }) {

    const Navigate = useNavigate();

    const [email, setEmail] = useState('');


    const [password, setPassword] = useState('');

    const [fromSignUp, setFromSignUp] = useState("");
    const callToastSuccess = () => toast("Sign In Successful");
    useEffect(() => {
        const fromSignUp2 = sessionStorage.getItem("fromSignUp");
        const getItem2 = () => {

            setFromSignUp(sessionStorage.getItem("fromSignUp"));

        }
        if (fromSignUp2 === "true") {
            console.log("toast checked true")
            callToastSuccess();
        }
        getItem2();
    }, [])
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    useEffect(() => {
        sessionStorage.clear();
    }, [])


    const submitlogin = async (event) => {

        event.preventDefault();
        try {
            console.log("submitsingin entered try");


            console.log(email, password);
            const response = await axios.post('http://localhost:5001/api/login', { Email: email, Password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response);
            const { token, Email, Role } = await response.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('Email', Email);
            sessionStorage.setItem('role', Role);
            role(Role);
            if (Role === "User") {
                sessionStorage.setItem("logintoreport", "true");
                Navigate("/Report");

            }
            else if (Role === "labeller") {
                sessionStorage.setItem("logintolabeller", "true");
                Navigate("/Labeler");
            }
            else if (Role === "admin") {
                Navigate("/Request");
            }
            else if (Role === "verifier") {
                Navigate("/verify")
            }
            else if (Role === "developer") {
                Navigate("/Register")
            }

        } catch (error) {
            console.log("submitlogin in error ")
            setInvalidCredentials(true);
            console.error(error);
        }
    }

    return (
        <>

            <section classname="signin">
                <div className="container mt-5">
                    <div classname="signin-content">
                        <div className="signin-form">
                            <h2 className="form-title ">Log in Here</h2>
                            <form classname="registration-form col-md-6" id="registration-form">

                                <div classname="form-group">
                                    <label htmlFor="email">
                                        <p><i className="zmdi zmdi-email zmdi-hc-2x"></i></p>
                                    </label>
                                    <input type="email" name="email" id="email" autocomplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Name/ ✉️ / Number" />
                                </div>

                                <div classname="form-group">
                                    <label htmlFor="password">
                                        <p><i className="zmdi zmdi-star zmdi-hc-2x"></i></p>
                                    </label>
                                    <input type="password" name="password" id="password" autocomplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="enter your password " />
                                </div>

                                {
                                    invalidCredentials == true && (
                                        <>
                                            <p><b style={{ 'color': 'red' }} >Invalid credentials</b></p>
                                        </>
                                    )
                                }

                                <div classname="from-group from-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" onClick={submitlogin}

                                        value="Log In" ></input>
                                </div>

                            </form>
                            <hr />
                            <div>
                                <h3>Dint have an account? </h3>
                                <button className={"btn btn-dark"} onClick={() => {
                                    Navigate("/login")
                                }}>
                                    Create account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <ToastContainer />
        </>
    )
}

export default Login1;