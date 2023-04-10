import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Sign.css";
import axios from "axios";

const SignUp = (props) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUp = async () => {
        try {
             await axios.post(
                "http://127.0.0.1:8000/api/v1/user/",
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    middle_name: userName,
                    password: password,
                    role: 1
                }
            );
            props.setHandleToken(userName);
            props.setHandleRole(0);
            navigate("/books");
        } catch (error) {
            console.log(error);
        }
    };

    // const handleLogUp = async () => {
    //     await getUser();
    //     if (user.password === password) {
    //         props.setHandleToken(userName);
    //         navigate("/books");
    //     }
    //     else {
    //         props.setHandleToken("");
    //     }
    // };

    return (
        <div className="user">
            <h1>Sign Up</h1>
            <form>
                <label htmlFor="first-name">First name:</label>
                <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
                <br />
                <label htmlFor="last-name">Last name:</label>
                <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <br />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={handleUserNameChange}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br />
                <div>
                    <button onClick={handleSignUp} type="button">
                        Sign up
                    </button>
                    <span>or</span>
                    <button onClick={() => navigate('/sign-in')}>Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
