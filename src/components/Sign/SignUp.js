import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import jwt_decode from "jwt-decode";
import "./Sign.css";
import * as Yup from 'yup';

const SignUp = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        middle_name: '',
    });

    let {setUser, setAuthTokens} = useContext(AuthContext)


    const signUpSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string()
            .min(8)
            .matches(
                /^(?=.*[A-Z])(?=.*\d).*$/,
                "Password must contain at least one uppercase letter and one digit"
            )
            .required(),
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        middle_name: Yup.string().required(),
    });


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    let navigate = useNavigate()


    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signUpSchema.validate(formData, {abortEarly: false});
        } catch (error) {
            // Handle validation errors
            setError(error.errors.join(' and '));
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/books/');
            } else {
                // Handle error
            }
        } catch (error) {
            // setError(error.message);
        }
    };

    return (
        <div className="user">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor="first-name">First name:</label>
                <input
                    type="text"
                    id="first-name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="last-name">Last name:</label>
                <input
                    id="last-name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="email">Email:</label>
                <input

                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br/>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br/>
                <div>
                    <button style={{width: "22%", marginLeft: "22px"}} type="submit">
                        Sign up
                    </button>
                </div>
                <div style={{display: "flex", width: "22%"}}>
                    <hr style={{width: "15%"}}/>
                    <span>OR</span>
                    <hr style={{width: "15%"}}/>
                </div>
                <div>
                    <span style={{marginLeft: "3%"}}>Have an account?</span>
                    <button onClick={() => navigate('/sign-in')} type="submit">
                        Sign in
                    </button>
                </div>
            </form>
            {error && (
                <div>
                    <p>Error:</p>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}

        </div>
    );

};

export default SignUp;
