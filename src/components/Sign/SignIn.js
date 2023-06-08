import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Sign.css";

import AuthContext from "../../context/AuthContext";


const SignIn = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let {loginUser} = useContext(AuthContext)
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };



    return (
        <div className="user">
            <h1>Sign In</h1>
            <form onSubmit={loginUser}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <br/>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br/>
                <div>
                    <button style={{width: "22%", marginLeft: "22px"}} type="submit">
                        Sign in
                    </button>
                </div>
                <div style={{  display: "flex", width: "22%"}}>
                    <hr style={{width: "15%"}}/>
                    <span>OR</span>
                    <hr style={{width: "15%"}}/>
                </div>

                <div>
                    <span>Forgot password?</span>
                    <button onClick={() => navigate('/reset-password')}>Reset Password</button>
                </div>
                <div>
                    <span>Don't have an account?</span>
                    <button onClick={() => navigate('/sign-up')}>Sign up</button>
                </div>

            </form>
        </div>
    );
};

export default SignIn;


