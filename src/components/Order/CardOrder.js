import React, {useContext, useState} from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const CardOrder = (props) => {


    const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('orderList')))
    let {authTokens} = useContext(AuthContext)

    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    if (orderList) {
        if (orderList.books.length === 0) {
            localStorage.removeItem(('orderList'));
            setOrderList(null)

        }
    }
    const handleDeleteBook = (bookId) => {
        const updatedBooks = orderList.books.filter(book => book.bookId !== bookId);
        const updatedOrderList = {...orderList, books: updatedBooks};
        setOrderList(updatedOrderList);
        localStorage.setItem('orderList', JSON.stringify(updatedOrderList));

    }
    const HandleAddOrder = () => {
        // const [books, setBooks] = useState([])
        let books = orderList?.books.map(book => book.bookId)


        axios.post('http://127.0.0.1:8000/api/v1/order/',
            {
                "book": [...books],
                "user": orderList.user,
                "plated_end_at": "2023-04-21T05:02:00Z"
            })
            .catch(error => {
                console.log(error);
            });
        localStorage.removeItem(('orderList'));
        setOrderList(null)

    }
    if (orderList) {
        return (
            <div className='div-card'>
                <h2>{props.title}</h2>
                <div>
                    {
                        orderList?.books.map(book => (
                            <div key={book.bookId} className='order-book'>
                                <p>{book.bookName}</p>
                                <button onClick={() => handleDeleteBook(book.bookId)}>delete book</button>

                            </div>
                        ))
                    }
                </div>
                <button className='button-submit' onClick={HandleAddOrder}>submit order</button>
            </div>


        )
    }


};

export default CardOrder;