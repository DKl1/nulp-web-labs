import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Books.css'

const BookList = () => {
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/book/')
            .then(response => {
                setBookList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {
                bookList.map(book => (
                    <article key={book.id} className="main-books">

                        <img src={book.image} alt="book.name" />
                        <h3>{book.name}</h3>
                        {book.authors.map(author => (
                            <p key={author.id}>by {author.name}</p>
                        ))}
                    </article>
                    ))
            }
        </div>
    );
};

export default BookList;