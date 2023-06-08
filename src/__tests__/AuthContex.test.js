import {render, act, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import {BrowserRouter as Router, MemoryRouter} from 'react-router-dom';
import AuthContext, {AuthProvider} from "../context/AuthContext";
import '@testing-library/jest-dom';
import axios from "axios";
jest.mock('axios');

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

describe('AuthProvider', () => {

    // Mock jwt_decode
    const mockJwtDecode = jest.fn();
    jest.mock('jwt-decode', () => mockJwtDecode);
    let spy;
    let setItemSpy, removeItemSpy, getItemSpy;

    beforeEach(() => {
        jest.resetAllMocks();
        spy = jest.spyOn(Storage.prototype, 'removeItem');
        setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
        removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
        getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    });

    afterEach(() => {
        spy.mockRestore();
        setItemSpy.mockRestore();
        removeItemSpy.mockRestore();
        getItemSpy.mockRestore();
    });




    it('should call logoutUser and remove items from localstorage', () => {
        const TestComponent = () => {
            const { logoutUser } = React.useContext(AuthContext);

            return <button onClick={logoutUser}>Logout</button>;
        };

        const { getByText } = render(
            <MemoryRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </MemoryRouter>
        );

        const logoutButton = getByText('Logout');

        fireEvent.click(logoutButton);

        expect(spy).toHaveBeenCalledWith('authTokens');
    });
    it('should render children', () => {
        const { getByText } = render(
            <MemoryRouter>
                <AuthProvider>
                    <div>Test child</div>
                </AuthProvider>
            </MemoryRouter>
        );

        expect(getByText('Test child')).toBeTruthy();
    });

    it('should call resetPassword and send a post request', async () => {
        axios.post.mockResolvedValue({ data: {} });

        const TestComponent = () => {
            const { resetPassword } = React.useContext(AuthContext);

            return <button onClick={() => resetPassword('test@example.com')}>Reset Password</button>;
        };

        const { getByText } = render(
            <MemoryRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </MemoryRouter>
        );

        const resetButton = getByText('Reset Password');

        await act(async () => {
            fireEvent.click(resetButton);
        });

        expect(axios.post).toHaveBeenCalledWith(
            `http://localhost:8000/auth/users/reset_password/`,
            JSON.stringify({ email: 'test@example.com' }),
            { headers: { "Content-Type": "application/json" } }
        );
    });
    it('should call resetPasswordConfirm and send a post request', async () => {
        axios.post.mockResolvedValue({ data: {} });

        const TestComponent = () => {
            const { resetPasswordConfirm } = React.useContext(AuthContext);

            return <button onClick={() => resetPasswordConfirm('uid', 'token', 'new_password')}>Reset Password Confirm</button>;
        };

        const { getByText } = render(
            <MemoryRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </MemoryRouter>
        );

        const resetButton = getByText('Reset Password Confirm');

        await act(async () => {
            fireEvent.click(resetButton);
        });

        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8000/auth/users/reset_password_confirm/",
            JSON.stringify({ uid: 'uid', token: 'token', new_password: 'new_password' }),
            { headers: { "Content-Type": "application/json" } }
        );
    });
});
