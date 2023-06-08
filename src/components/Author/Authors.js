import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Authors = () => {
    const [authors, setAuthors] = useState()
    let {authTokens} = useContext(AuthContext)

    axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/author/')
            .then(response => setAuthors(response.data))
            .catch(error => console.log(error))
    }, []);
    return (
        <>
            <h1>Authors</h1>
            <div>
                <table id="authors">
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Patronymic</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authors ?
                        authors.map(author => (
                            <tr key={author.id}>
                                <td> {author.name}</td>
                                <td> {author.surname}</td>
                                <td>{author.patronymic}</td>
                            </tr>
                        ))
                            :
                        <tr>
                            <td colSpan="6">Loading authors...</td>
                        </tr>
                    }
                    </tbody>

                </table>
            </div>
        </>);

};

export default Authors;


