import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./Profile.css"
import AuthContext from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function User(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    let {logoutUser, authTokens, user, updateToken, setAuthTokens, setUser} = useContext(AuthContext);

    let navigate = useNavigate()

    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    const deleteAccount = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
        if (confirmDelete) {
            axios.delete(`http://127.0.0.1:8000/api/v1/user/${user.user_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            })
                .then(() => {
                    setAuthTokens(null);
                    setUser(null);
                    navigate('/sign-in');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleSave = () => {
        axios.put(`http://127.0.0.1:8000/api/v1/user/${user.user_id}/`, {
            first_name: firstName,
            last_name: lastName,
            // password: password,
            middle_name: middleName,
            email: email,
            role: role
        })
            .catch(error => {
                console.log(error);
            });
        updateToken();
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/user/${user.user_id}/`)
            .then(response => {
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                // setPassword(response.data.password);
                setMiddleName(response.data.middle_name);
                setEmail(response.data.email);
                setRole(response.data.role);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="user">
                <h1>Personal information</h1>
                <hr/>
                <div>
                    <label htmlFor="fname">First name:</label><br/>
                    <input type="text" id="fname" value={firstName} onChange={e => setFirstName(e.target.value)}/><br/>
                    <hr/>
                    <label htmlFor="lname">Name:</label><br/>
                    <input type="text" id="lname" value={lastName} onChange={e => setLastName(e.target.value)}/><br/>
                    <hr/>
                    {/*<label htmlFor="password">Password:</label><br/>*/}
                    {/*<input type="password" id="password" value={password}*/}
                    {/*       onChange={e => setPassword(e.target.value)}/><br/>*/}
                    {/*<hr/>*/}
                    <label htmlFor="uname">User name:</label><br/>
                    <input type="text" id="uname" value={middleName}
                           onChange={e => setMiddleName(e.target.value)}/><br/>
                    <hr/>
                    <label htmlFor="email">Email:</label><br/>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                    <hr/>
                    <label htmlFor="role">Role:</label><br/>
                    <input type="text" id="role" disabled value={role === 1 ? 'libtatian' : 'reader'}
                           onChange={e => setRole(e.target.value)}/><br/>

                    <hr/>
                </div>
                <div>
                    <button onClick={handleSave}>Save changes</button>
                    <br/>
                    <button onClick={logoutUser}>Log out</button>
                    <br/>
                    <button onClick={deleteAccount}>Delete account</button>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default User;

