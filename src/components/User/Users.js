import React, {useEffect, useState} from "react";
import './Profile'
import axios from "axios";

const Users = () => {

    const [users, setUsers] = useState([])
     useEffect(() => {
         axios.get('http://127.0.0.1:8000/api/v1/user/')
             .then(response => setUsers(response.data))
             .catch(err =>console.log(err))
     },[]);

    return (
        <div>
            <h1>Users</h1>

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
                {users ?
                    users.map(user => (
                        <tr>
                            <td> {user.first_name}</td>
                            <td> {user.last_name}</td>
                            <td>{user.middle_name}</td>
                            <td>{user.email}</td>
                            <td>{ user.role === 0 ? 'libririan' : 'visitor'}</td>
                            <td>
                                <button>details</button>
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

