import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from "../context/AuthContext";
import Header from "../components/Header/Header";
import '@testing-library/jest-dom';

describe('Header', () => {
    test('renders Header component', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Header/>
                </AuthProvider>
            </BrowserRouter>
        );

        // Check for logo image
        const logoImage = screen.getByAltText(/main-icon/i);
        expect(logoImage).toBeInTheDocument();

        // Check for Sign in and Sign up links when not logged in
        const signInLink = screen.getByText(/sign in/i);
        expect(signInLink).toBeInTheDocument();
        const signUpLink = screen.getByText(/sign up/i);
        expect(signUpLink).toBeInTheDocument();
    });
});
