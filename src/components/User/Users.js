import React, {useContext, useEffect, useState} from "react";
import './Profile'
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Users = () => {

    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState('')
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext)

    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/user/')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    }, []);
    const filtered_users = () => {
        return users?.filter(user => {
            return user.first_name?.toLowerCase().includes(userName?.toLowerCase())
                || user.last_name?.toLowerCase().includes(userName?.toLowerCase())
                || user.email?.toLowerCase().includes(userName?.toLowerCase())
                || user.middle_name?.toLowerCase().includes(userName?.toLowerCase());
        });

    };

    const handleFilterChange = (event) => {
        setUserName(event.target.value);
    };
    return (
        <div>
            <h1>Users</h1>

            <input placeholder="name of the user" type="text" id="name" name="name" value={userName}

                   onChange={handleFilterChange}/>

            <table id="users">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>User name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filtered_users() ?
                    filtered_users().map(user => (
                            <tr key={user.id}>
                                <td> {user.first_name}</td>
                                <td> {user.last_name}</td>
                                <td>{user.middle_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 0 ? 'libririan' : 'visitor'}</td>
                                <td>
                                    <button onClick={() => navigate(`/user/${user.id}`)}>details</button>
                                </td>
                            </tr>
                        )
                    )
                    :
                    <tr>
                        <td colSpan="6">Loading users...</td>
                    </tr>
                }

                </tbody>
            </table>
        </div>
    )
}

export default Users;

