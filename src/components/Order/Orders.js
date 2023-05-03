import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import CardOrder from "./CardOrder";
import OrderList from "./OrdersList";
import {useNavigate} from "react-router-dom";
import './Orders.css'
import AuthContext from "../../context/AuthContext";

const Orders = () => {
    const [orderList, setOrderList] = useState([]);
    const [userEmail, setUserEmails] = useState({});
    const [preparedOrders, setPreparedOrders] = useState([]);
    const [waitingToBePrepare, setWaitingToBePrepare] = useState([]);
    const [receivedByUserOrders, setReceivedByUserOrders] = useState([]);
    const [returnedOrders, setReturnedOrders] = useState([]);
    const waiting_title =  'orders waiting to be prepared';
    const prepared_title =  'prepared orders';
    const received_title =  'orders you have received';
    const returned_title =  'orders you have returned'
    let navigate = useNavigate();
    let {authTokens, user} = useContext(AuthContext)


    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/order/')
            .then(response => {

                if (user.role.toString() === '0') {
                    setOrderList(response.data.reverse().filter(order => order.user.toString() === user.user_id.toString()))
                }
                else{
                    setOrderList(response.data.reverse())
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const fetchUserEmail = async () => {
            const newUserEmail = {};
            for (const order of orderList) {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/${order.user}/`);
                newUserEmail[order.id] = response.data.email;
            }
            setUserEmails(newUserEmail);
        };
        fetchUserEmail();
    }, [orderList]);
    // console.log(orderList);
    useEffect(() => {
        const waiting_to_be_prepare_orders = orderList.filter(order => !order.is_prepared_at && order.created_at && order.user.toString() === user.user_id.toString());
        setWaitingToBePrepare(waiting_to_be_prepare_orders);

    }, [orderList]);
    useEffect(() => {
        const prepared_orders = orderList.filter(order => !order.received_by_user_at && order.is_prepared_at);
        setPreparedOrders(prepared_orders);

    }, [orderList]);

    useEffect(() => {
        const received_orders = orderList.filter(order => !order.end_at && order.received_by_user_at );
        setReceivedByUserOrders(received_orders)

    }, [orderList]);
    useEffect(() => {
        const returned_orders = orderList.filter(order => order.end_at && order.user === user.user_id);
        setReturnedOrders(returned_orders)

    }, [orderList]);

    const handleOrdersClick = ({title, userEmail, orders}) => {
        navigate(`/orders-list/`, {
            state: {
                title: title,
                userEmail: userEmail,
                orders: orders,
            }
        })

    };
    return (
        <div className='ordersArticle'>
            <h1>Orders</h1>
            <CardOrder title={'Current order'}/>
            <div className='div-orders-list'  onClick={() => handleOrdersClick({title: waiting_title, userEmail: userEmail, orders: waitingToBePrepare})} >
                <h2>{waiting_title}</h2>
            </div>
            <div className='div-orders-list' onClick={() => handleOrdersClick({title: prepared_title, userEmail: userEmail, orders: preparedOrders})} >
                <h2>{prepared_title}</h2>
            </div>
            <div className='div-orders-list' onClick={() => handleOrdersClick({title: received_title, userEmail: userEmail, orders: receivedByUserOrders})} >
                <h2>{received_title}</h2>
            </div>
            <div className='div-orders-list' onClick={() => handleOrdersClick({title: returned_title, userEmail: userEmail, orders: returnedOrders})} >
                <h2>{returned_title}</h2>
            </div>
        </div>
    );
};

export default Orders;
