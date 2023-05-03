import { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    if (!user) {
        return <Navigate to="/sign-in" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
