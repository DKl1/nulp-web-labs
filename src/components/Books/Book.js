import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Book = () => {
    const [book, setBook] = useState(null);
    const {id} = useParams();
    let {authTokens, user} = useContext(AuthContext)
    const userId = user.user_id
    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/book/${id}/`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    const handleAddToOrder = () => {
        // Retrieve the current order from the browser storage or create a new order object
        const orderList = JSON.parse(localStorage.getItem('orderList')) || {books: [], user: userId};
        console.log(orderList);
        // const previousBookCount = orderList.books.length;

// Add the book ID to the order object
        orderList.books.push({bookId: book.id, bookName: book.name});


        localStorage.setItem('orderList', JSON.stringify(orderList));

// Save the updated order object to the browser storage


    }

    return (
        <div>
            <h1>{book.name}</h1>
            <img src={book.image} alt={book.name}/>
            <p>{book.description}</p>
            <button onClick={handleAddToOrder}>add to order</button>
        </div>
    );
};

export default Book;
