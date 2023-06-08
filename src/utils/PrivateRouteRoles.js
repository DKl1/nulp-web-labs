import { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRouteRoles = () => {
    let {user} = useContext(AuthContext)
    if (!user) {
        return <Navigate to="/sign-in" />;
    }
    if (user && user.role !== 1) {
        return <Navigate to="/" />;
    }


    return <Outlet />;
};

export default PrivateRouteRoles;
