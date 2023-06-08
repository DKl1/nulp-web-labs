import React, {useContext, useState} from 'react';
import {useLocation} from "react-router-dom";
import './Orders.css'
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const OrderList = () => {
    const location = useLocation();
    const title = location.state.title;
    const userEmail = location.state.userEmail;
    const [orders, setOrders] = useState(location.state.orders)
    const waiting_title = 'orders waiting to be prepared';
    const prepared_title = 'prepared orders';
    const received_title = 'orders you have received';

    let {authTokens, user} = useContext(AuthContext)


    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    let field = null;
    if (title === waiting_title) {
        field = 'is_prepared_at'
    } else if (title === prepared_title) {
        field = 'received_by_user_at'
    } else if (title === received_title) {
        field = 'end_at'
    }

    const handleChange = (id, book) => {
        axios.put(`http://127.0.0.1:8000/api/v1/order/${id}/`, {
            [field]: new Date().toISOString(),
            book: book,
        })
            .then(() => {
               setOrders(orders.filter(order => order.id !== id))

            })
            .catch(error => {
                console.log(error);
            });

    }

    const renderOrderList = () => {
        return orders.map(order => (
            <tr key={order.id}>
                <td>{order.book_names.map(book_name => <p key={book_name.id}>{book_name.name}</p>)}</td>
                <td>{userEmail[order.id]}</td>
                <td>{order.created_at}</td>
                <td>{order.planed_end_at || 'no data'}</td>
                <td>{order.is_prepared_at || 'no data'}</td>
                <td>{order.received_by_user_at || 'no data'}</td>
                <td>{order.end_at || 'no data'}</td>
                <td>
                    {user.role === 1 && field !== null ? <button
                        onClick={() => handleChange(order.id, order.book)}>
                        {buttonName}
                    </button> : null}
                </td>
            </tr>
        ));
    };

    let buttonName = '';
    if (title === waiting_title) {
        buttonName = 'prepared';
    } else if (title === prepared_title) {
        buttonName = 'received';
    } else if (title === received_title) {
        buttonName = 'returned';
    }

    if (orders) {
        return (
            <div>
                <h2>{title}</h2>
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Name of Book</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Planned end at</th>
                        <th scope="col">Prepared in library</th>
                        <th scope="col">Received by reader</th>
                        <th scope="col">Returned at</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderOrderList()}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default OrderList;
