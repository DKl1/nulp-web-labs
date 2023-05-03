import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const User = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const {id} = useParams();
    let {authTokens,} = useContext(AuthContext)
    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/v1/user/${id}/`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://127.0.0.1:8000/api/v1/user/${id}/order/`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    if (!user) {
        return <p>Loading user data...</p>;
    }


    return (
        <div className={"user"}>
            <h1>User Information</h1>
            <div>

                <p>User First Name: {user.first_name} {user.last_name}</p>
                <p>User Last Name: {user.last_name}</p>
                <p>User Name: {user.middle_name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role === 1 ? <a>librarian</a> : <a>reader</a>}</p>
                <p>Created at: {user.created_at}</p>
                <p>Last Login at: {user.last_login}</p>
                <p>Updated at: {user.updated_at}</p>
                <h3>Orders</h3>
            </div>

            {orders.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Book Id</th>
                        <th>Book Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td >{order.id}</td>
                            <td>{order.book}</td>
                            <td>{order.book_names.map((book_name) => (
                                <div key={book_name.id}>
                                        <p >{book_name.name}; </p>
                                </div>
                                )
                            )}
                            </td>


                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default User;