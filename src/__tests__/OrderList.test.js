import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import OrderList from "../components/Order/OrdersList";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

const sampleOrders = [
    {
        id: 1,
        book_names: [{ id: 1, name: 'Test Book 1' }],
        created_at: '2023-04-21T05:02:00Z',
        planed_end_at: '2023-04-25T05:02:00Z',
        is_prepared_at: null,
        received_by_user_at: null,
        end_at: null,
        book: 1,
    },
    {
        id: 2,
        book_names: [{ id: 2, name: 'Test Book 2' }],
        created_at: '2023-04-22T05:02:00Z',
        planed_end_at: '2023-04-26T05:02:00Z',
        is_prepared_at: null,
        received_by_user_at: null,
        end_at: null,
        book: 2,
    },
];

const userEmail = {
    1: 'john.doe@example.com',
    2: 'jane.doe@example.com',
};

const authContextValue = {
    authTokens: { access: 'access_token' },
    user: { role: 1 },
};

describe('OrderList component', () => {
    beforeEach(() => {
        useLocation.mockReturnValue({
            state: {
                title: 'orders waiting to be prepared',
                userEmail,
                orders: sampleOrders,
            },
        });
    });

    test('renders OrderList component with waiting orders', () => {
        render(
            <AuthContext.Provider value={authContextValue}>
                <OrderList />
            </AuthContext.Provider>
        );

        expect(screen.getByText('orders waiting to be prepared')).toBeInTheDocument();
        expect(screen.getByText('Test Book 1')).toBeInTheDocument();
        expect(screen.getByText('Test Book 2')).toBeInTheDocument();

    });

    // Add more tests for different titles and scenarios as needed.
});
