import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import Profile from "../components/User/Profile";

jest.mock('axios');

const mockUser = {
    user_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    middle_name: 'M',
    email: 'johndoe@example.com',
    role: 1,
};

const mockOrders = [
    { /* some mock order data */ },
    { /* some more mock order data */ },
    // ...etc.
];

const mockAuthContext = {
    user: mockUser,
    authTokens: { access: 'test_token' },
    logoutUser: jest.fn(),
    updateToken: jest.fn(),
    setAuthTokens: jest.fn(),
    setUser: jest.fn(),
};

describe('Profile component', () => {

    test('loads and displays user data', async () => {
        axios.get
            .mockResolvedValueOnce({ data: mockUser })
            .mockResolvedValueOnce({ data: mockOrders });

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <Profile/>
                </BrowserRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => screen.getByRole('heading', { name: /Personal information/i }));

        expect(screen.getByLabelText(/First name:/i)).toHaveValue(mockUser.first_name);
        expect(screen.getByLabelText(/User name:/i)).toHaveValue(mockUser.middle_name);
        expect(screen.getByLabelText(/Email:/i)).toHaveValue(mockUser.email);
        expect(screen.getByLabelText(/Role:/i)).toHaveValue(mockUser.role === 1 ? 'librarian' : 'reader');
    });

    test('saves changes when save button is clicked', async () => {
        axios.get
            .mockResolvedValueOnce({ data: mockUser })
            .mockResolvedValueOnce({ data: mockOrders });
        axios.put.mockResolvedValueOnce({ data: {} });

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <Profile/>
                </BrowserRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => screen.getByRole('heading', { name: /Personal information/i }));

        const saveButton = screen.getByRole('button', { name: /Save changes/i });

        fireEvent.click(saveButton);

        await waitFor(() => expect(axios.put).toHaveBeenCalled());
        expect(mockAuthContext.updateToken).toHaveBeenCalled();
    });

    it('logs out user when logout button is clicked', async () => {
        axios.get
            .mockResolvedValueOnce({ data: mockUser })
            .mockResolvedValueOnce({ data: mockOrders });

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <Profile/>
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Wait for any async actions to complete.
        await waitFor(() => screen.getByText(/Log out/i));

        const logoutButton = screen.getByRole('button', { name: /Log out/i });
        const deleteButton = screen.getByRole('button', { name: /Delete/i });

        fireEvent.click(logoutButton);
        fireEvent.click(deleteButton);

        await waitFor(() => expect(mockAuthContext.logoutUser).toHaveBeenCalled());
    });

});

