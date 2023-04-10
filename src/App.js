import React, { useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import Header from './components/Header';
import Books from './components/Books/Books';
import Home from './components/Home/Home';
import SignIn from './components/Sign/SignIn';
import SignUp from './components/Sign/SignUp';
import Profile from "./components/User/Profile";
import Users from "./components/User/Users";

function App() {
    const [token, setToken] = useState('');
    const [role, setRole] = useState(0);
    let check = token !== '' ? true : false;
    const setHandleToken = (value) => {
        setToken(value);
    };
    const setHandleRole= (value) => {
        setRole(value);
    };

    return (
        <BrowserRouter>
            <Header check={check} role={role}/>
            <Routes>
                 <Route path="/" element={<Home />} />
                {check &&  <Route path="/books" element={<Books />} />}
                {check &&  <Route path="/profile" element={<Profile setHandleToken={setHandleToken}/>} />}
                {check &&  <Route path="/users" element={<Users setHandleToken={setHandleToken}/>} />}
                <Route path="/sign-in" element={<SignIn setHandleToken={setHandleToken} setHandleRole={setHandleRole}/>} />
                <Route path="/sign-up" element={<SignUp setHandleToken={setHandleToken} setHandleRole={setHandleRole} />} />

                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
