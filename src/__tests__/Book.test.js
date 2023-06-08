import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Book from "../components/Books/Book";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('axios');

const sampleBook = {
    id: 1,
    name: 'Test Book',
    image: 'test-image.jpg',
    description: 'Test description',
};

const authContextValue = {
    authTokens: { access: 'access_token' },
    user: { user_id: '1' },
};

describe('Book component', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ id: '1' });
        axios.get.mockResolvedValue({ data: sampleBook });
        localStorage.clear();
    });

    test('renders Book component', async () => {
        render(
            <AuthContext.Provider value={authContextValue}>
                <Book />
            </AuthContext.Provider>
        );

        // Wait for the book data to be loaded
        expect(await screen.findByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    test('adds book to order when button is clicked', async () => {
        render(
            <AuthContext.Provider value={authContextValue}>
                <Book />
            </AuthContext.Provider>
        );

        // Wait for the book data to be loaded
        await screen.findByText('Test Book');

        fireEvent.click(screen.getByText('add to order'));

        // Check if the book is added to the order in the local storage
        const orderList = JSON.parse(localStorage.getItem('orderList'));
        expect(orderList).toBeDefined();
        expect(orderList.books).toContainEqual({ bookId: 1, bookName: 'Test Book' });
    });
});
