import {createContext, useEffect, useState,} from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/v1/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/books/')
        } else {
            alert('Wrong email or password!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')

    }


    let updateToken = async () => {

        let response = await fetch('http://127.0.0.1:8000/api/v1/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }
    const resetPassword = async (email) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({email});

        try {
            await axios.post(
                `http://localhost:8000/auth/users/reset_password/`,
                body,
                config
            );

        } catch (err) {
            console.error(err);
        }
    };
    const resetPasswordConfirm = async (uid, token, new_password) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({uid, token, new_password});
        console.log(body);
        try {
            await axios.post(
                "http://localhost:8000/auth/users/reset_password_confirm/",
                body,
                config
            );

        } catch (err) {
            console.error(err);
        }
    };

    let contextData = {
        resetPassword: resetPassword,
        resetPasswordConfirm: resetPasswordConfirm,
        user: user,
        setAuthTokens,
        setUser,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateToken: updateToken,
    }



    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        setLoading(false)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}

