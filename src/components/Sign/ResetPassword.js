import React, {useContext, useState} from 'react';

import authContext from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [email, setEmail] = useState('');
    let {resetPassword} = useContext(authContext)
    let navigate = useNavigate()

    const onChange = (event) => {
        setEmail(event.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        resetPassword(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return navigate('/')
    }

    return (
        <div className="user">
            <h1>Request Password Reset</h1>
            <form onSubmit={e => onSubmit(e)}>

                    <input

                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />

                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;