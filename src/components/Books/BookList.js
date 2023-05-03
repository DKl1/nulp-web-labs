import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import './Books.css'
import AuthContext from "../../context/AuthContext";

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const [filter, setFilter] = useState({ name: "", author: "", year_of_publication: "" });
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext)

    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/book/')
            .then(response => {
                setBookList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const filtered_books = () => {
        return bookList.filter(book => {
            return book.name.toLowerCase().includes(filter.name.toLowerCase()) &&
                book.authors.some(author => author.name.toLowerCase().includes(filter.author.toLowerCase())) &&
                book.year_of_publication.toString().includes(filter.year_of_publication);
        });
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    };
    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`);
    }

    return (
        <div>
            <form>
                <input placeholder="name of the book" type="text" id="name" name="name" value={filter.name} onChange={handleFilterChange} />
                <input placeholder="author of the book" type="text" id="author" name="author" value={filter.author} onChange={handleFilterChange} />
                <input placeholder="year of publication" type="text" id="year_of_publication" name="year_of_publication" value={filter.year_of_publication} onChange={handleFilterChange} />
            </form>
            <div className="books-inner">
            {

                filtered_books().map(book => (
                    <article  onClick={() => handleBookClick(book.id)} key={book.id} className="main-books">

                        <img className={` ${
                            book.count === 0 ? "red-background" : "green-background"
                        }`} src={book.image} alt="book.name" />
                        <h3>{book.name}</h3>
                        {book.authors.map(author => (
                            <p key={author.id}>by {author.name}</p>
                        ))}

                    </article>
                ))

            }
            </div>

        </div>
    );
};

export default BookList;
