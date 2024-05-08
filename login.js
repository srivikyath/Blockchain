import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined } from '@ant-design/icons';

function Login() {
    console.log("function login has entered");

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    console.log("function login after usestate");
    const checkPassWord2 = (password, cpassword) => {
        if (password !== cpassword) {
            setWrongPassword(true);
        }
        else {
            setWrongPassword(false);
        }
    }
    const mongodataget = async () => {
        console.log("mongodataget entered");
        try {
            console.log("mongodataget entered in try");
            const gett = await axios.get('http://localhost:5001/api/signup');
            console.log("mongodataget entered in try and after localhost");
            console.log(gett.data);
        }
        catch (error) {
            console.log("mongodataget entered in error");
            console.log(error);
        }
    }
    const [errorMessage, setErrorMessage] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    console.log("This is before submitsignin: ");
    const checkPassWord = (cpassword, password) => {
        if (password !== cpassword) {
            setWrongPassword(true)
        }
        else {
            setWrongPassword(false);
        }
    }
    const [loginsuccess, setLoginsuccess] = useState("");
    const submitsingin = async () => {
        console.log("Data Base Send activated");
        if (password === cpassword) {

            try {
                console.log("submitsingin entered try");

                console.log("submitsignin in try");
                await axios.post('http://localhost:5001/api/signup', { username: name, email: email, password: password });
                console.log("submitsignin after localhost")
                sessionStorage.setItem("fromSignUp", "true");
                Navigate('/login1');
            } catch (error) {
                console.log("submitsignin in error ")
                console.log(error.message);
                setErrorMessage(error.message);
            }

        }
        console.log("Data Base Send completed");
    }
    const Navigate = useNavigate();
    return (

        <>
            <section classname="signup">
                <div className="container mt-5">
                    <div classname="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title ">Create your account here</h2>
                            <form classname="registration-form col-md-6" id="registration-form">
                                <div classname="form-group">
                                    <label htmlFor="name">
                                        <p><i class="zmdi zmdi-account zmdi-hc-2x"></i></p>
                                    </label>
                                    <input type="text" name="username" autocomplete="off"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div classname="form-group">
                                    <label htmlFor="email">
                                        <p><i class="zmdi zmdi-email zmdi-hc-2x"></i></p>
                                    </label>
                                    <input type="email" name="email" autocomplete="off" placeholder="@ gmail.com" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div classname="form-group p1">
                                    <label htmlFor="password">
                                        <p><i class="zmdi zmdi-star zmdi-hc-2x"></i></p>
                                    </label>
                                    <input type={visible ? "text" : "password"} name="passwordd" autocomplete="off" placeholder="enter your password " onChange={(e) => {
                                        if (e.target.value) {

                                            setPassword(e.target.value)
                                        }
                                        else {
                                            setWrongPassword(false);
                                        }
                                        checkPassWord2(e.target.value, cpassword)
                                    }
                                    } />
                                    <div className="p1" onClick={() => setVisible(!visible)}>
                                        {visible ? <EyeOutlined /> : < EyeInvisibleOutlined />}
                                    </div>
                                </div>

                                <div classname="form-group">
                                    <label htmlFor="password">
                                        <p><i class="zmdi zmdi-star zmdi-hc-2x"></i></p>
                                    </label>
                                    <input type={visible ? "text" : "password"} name="password" id="password" autocomplete="off" placeholder="confirm your password " onChange={(e) => {

                                        setCpassword(e.target.value);
                                        checkPassWord(e.target.value, password);

                                    }
                                    }
                                    />
                                </div>
                                {
                                    wrongPassword == true &&
                                    (<div className="text-danger">
                                        <p><b>password dosend match</b></p>
                                    </div>)
                                }
                                {
                                    errorMessage != "" && (
                                        <>
                                            <div className="text-danger">
                                                {errorMessage}
                                            </div>
                                        </>
                                    )

                                }
                                {
                                    loginsuccess != "" && (
                                        <>
                                            <div className="text-success">
                                                {loginsuccess}
                                            </div>
                                        </>
                                    )
                                }

                                <div classname="container from-group from-button">
                                    <input type="button" name="signup" id="signup" className="form-submit" value="Create account" onClick={submitsingin}></input>
                                </div>
                            </form>
                            <hr />
                            <div>
                                <h3>Already have an account </h3>
                                <button className="btn btn-dark" onClick={() => {
                                    Navigate("/login1")
                                }}>
                                    lOG-IN
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Login;


