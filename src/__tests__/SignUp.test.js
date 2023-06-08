import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter, Router} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import SignUp from "../components/Sign/SignUp";
import '@testing-library/jest-dom';
import React from 'react';

const mockResetPasswordConfirm = jest.fn(() => Promise.resolve());
const mockAuthContext = {
    loginUser: jest.fn(),
    user: jest.fn(),
    authTokens: {access: 'test_token'},
    location: {state: {title: 'Test Title'}},
    resetPasswordConfirm: mockResetPasswordConfirm,

};

describe('SignUp', () => {


    test('renders SignUp component', () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <SignUp/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const signUpTitle = screen.getByRole('heading', {name: /Sign up/i, level: 1});
        fireEvent.click(screen.getByRole('button', {name: /Sign up/i}));
        fireEvent.click(screen.getByRole('button', {name: /Sign in/i}));
        fireEvent.click(screen.getByText(/Have an account?/i))
        expect(signUpTitle).toBeInTheDocument();
    });

    test('handles input change events', () => {

        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <SignUp/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        // Simulate input change events
        fireEvent.change(screen.getByLabelText(/First name:/i), {target: {value: 'John'}});
        fireEvent.change(screen.getByLabelText(/Last name:/i), {target: {value: 'Doe'}});
        fireEvent.change(screen.getByLabelText(/Email:/i), {target: {value: 'test@email.com'}});
        fireEvent.change(screen.getByLabelText(/Username:/i), {target: {value: 'testusername'}});
        fireEvent.change(screen.getByLabelText(/Password:/i), {target: {value: 'Testpass1'}});


        expect(screen.getByLabelText(/First name:/i).value).toBe('John');
        expect(screen.getByLabelText(/Last name:/i).value).toBe('Doe');
        expect(screen.getByLabelText(/Email/i).value).toBe('test@email.com');
        expect(screen.getByLabelText(/Username/i).value).toBe('testusername');
        expect(screen.getByLabelText(/Password/i).value).toBe('Testpass1');
    });


});


// Similarly, you would need to write tests to simulate navigation actions, error handling, etc.
