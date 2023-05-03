import React from 'react';
import './Books.css'
import BookList from "./BookList";

 const Books = () => {


     return (
         <div id="books-articles" className="main-books">
             {/*<h1>Books in the Quill</h1>*/}
             <BookList/>
         </div>

     );

};


export default Books;