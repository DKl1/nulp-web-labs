import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css"

function User(props) {
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleLogOut = () => {
        props.setHandleToken("");
    };

    const handleSave = () => {
        axios.put(`http://127.0.0.1:8000/api/v1/user/${user.id}/`, {
            first_name: firstName,
            last_name: lastName,
            password: password,
            middle_name: middleName,
            email: email,
            role: role
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/user/11/')
            .then(response => {
                setUser(response.data);
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setPassword(response.data.password);
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
                <hr />
                <div>
                    <label htmlFor="fname">First name:</label><br />
                    <input type="text" id="fname" value={firstName} onChange={e => setFirstName(e.target.value)} /><br />
                    <hr />
                    <label htmlFor="lname">Name:</label><br />
                    <input type="text" id="lname" value={lastName} onChange={e => setLastName(e.target.value)} /><br />
                    <hr />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                    <hr />
                    <label htmlFor="uname">User name:</label><br />
                    <input type="text" id="uname" value={middleName} onChange={e => setMiddleName(e.target.value)} /><br />
                    <hr />
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <hr />
                    <label htmlFor="role">Role:</label><br />
                    <input type="text" id="role" value={role} onChange={e => setRole(e.target.value)} /><br />
                    <hr />
                </div>
                <div>
                    <button onClick={handleLogOut}>Log out</button><br />
                    <button onClick={handleSave}>Save</button>
                    <button>Delete account</button>
                </div>
            </div>
        </div>
    );
}

export default User;


//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Profile.css"
//
// function User(props) {
//     const [user, setUser] = useState({});
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [password, setPassword] = useState("");
//     const [middleName, setMiddleName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//
//     const handleLogOut = () => {
//         props.setHandleToken("");
//     };
//
//     const handleUpdate = async (event) => {
//         event.preventDefault();
//         const updatedUser = {
//             ...user,
//             first_name: firstName,
//             last_name: lastName,
//             password: password,
//             middle_name: middleName,
//             email: email,
//             role: role,
//         };
//         try {
//             const response = await axios.put(`http://127.0.0.1:8000/api/v1/user/${user.id}/`, updatedUser);
//             setUser(response.data);
//             alert("User updated successfully");
//         } catch (error) {
//             console.log(error);
//             alert("Error updating user");
//         }
//     };
//
//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/v1/user/11/')
//             .then(response => {
//                 setUser(response.data);
//                 setFirstName(response.data.first_name);
//                 setLastName(response.data.last_name);
//                 setPassword(response.data.password);
//                 setMiddleName(response.data.middle_name);
//                 setEmail(response.data.email);
//                 setRole(response.data.role);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <div className="user">
//                 <h1>Personal information</h1>
//                 <hr />
//                 <form onSubmit={handleUpdate}>
//                     <div>
//                         <label htmlFor="fname">First name:</label><br />
//                         <input type="text" id="fname" value={firstName} onChange={(event) => setFirstName(event.target.value)} /><br />
//                         <hr />
//                         <label htmlFor="lname">Name:</label><br />
//                         <input type="text" id="lname" value={lastName} onChange={(event) => setLastName(event.target.value)} /><br />
//                         <hr />
//                         <label htmlFor="password">Password:</label><br />
//                         <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
//                         <hr />
//                         <label htmlFor="uname">User name:</label><br />
//                         <input type="text" id="uname" value={middleName} onChange={(event) => setMiddleName(event.target.value)} /><br />
//                         <hr />
//                         <label htmlFor="email">Email:</label><br />
//                         <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
//                         <hr />
//                         <label htmlFor="role">Role:</label><br />
//                         <input type="text" id="role" value={role} onChange={(event) => setRole(event.target.value)} /><br />
//                         <hr />
//                     </div>
//                     <div>
//                         <button type="submit">Update</button>
//                         <button onClick={handleLogOut}>Log out</button><br />
//                         <button>Delete account</button>
//                     </div>
//                 </form>
//
