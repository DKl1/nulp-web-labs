import React, {  useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Sign.css";
import axios from "axios";

const SignIn = (props) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const getUser = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/v1/users/" + userName.toString() + "/"
            );
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogIn = async () => {
        await getUser();
        if (user.password === password) {
            props.setHandleToken(userName);
            props.setHandleRole(user.role);
            navigate("/books");
        }
        else {
            props.setHandleToken("");
        }
    };

    return (
        <div className="user">
            <h1>Sign In</h1>
            <form>
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
                    <button onClick={handleLogIn} type="button">
                        Sign in
                    </button>
                    <span>or</span>
                    <button onClick={() => navigate('/sign-up')}>Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
