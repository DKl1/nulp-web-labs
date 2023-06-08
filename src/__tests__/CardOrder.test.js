import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import AuthContext from "../context/AuthContext";
import '@testing-library/jest-dom';
import React from 'react';
import CardOrder from "../components/Order/CardOrder";
import axios from "axios";

jest.mock('axios');


describe('CardOrder', () => {
    beforeEach(() => {
        localStorage.clear(); // Clear localStorage before each test
    });

    // test('renders title from props', () => {
    //     const { getByText } = render(
    //         <AuthContext.Provider value={{ authTokens: { access: 'access_token' } }}>
    //             <CardOrder title={'Current order'} />
    //         </AuthContext.Provider>
    //     );
    //
    //     expect(getByText('Current order')).toBeInTheDocument();
    // });
    test('handleDeleteBook removes a book from the order list', () => {
        localStorage.setItem('orderList', JSON.stringify({
            books: [{ bookId: 1, bookName: 'Test Book' }]
        }));

        const { getByText } = render(
            <AuthContext.Provider value={{ authTokens: { access: 'access_token' } }}>
                <CardOrder title="Test Title" />
            </AuthContext.Provider>
        );

        fireEvent.click(getByText('delete book'));

        expect(localStorage.getItem('orderList')).toBeNull();
    });

    test('HandleAddOrder clears the order list', async () => {
        localStorage.setItem('orderList', JSON.stringify({
            books: [{bookId: 1, bookName: 'Test Book'}],
            user: 'Test User'
        }));

        axios.post.mockResolvedValue(Promise.resolve({})); // Mock the axios post method

        const {getByText} = render(
            <AuthContext.Provider value={{authTokens: {access: 'access_token'}}}>
                <CardOrder title="Test Title"/>
            </AuthContext.Provider>
        );

        fireEvent.click(getByText('submit order'));

        await waitFor(() => {
            expect(localStorage.getItem('orderList')).toBeNull();
        });
    });

});