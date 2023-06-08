import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import App from '../App';
import Home from "../components/Home/Home";
import SignIn from "../components/Sign/SignIn";
import '@testing-library/jest-dom';
import AuthContext from "../context/AuthContext";
import ResetPassword from "../components/Sign/ResetPassword";
import ResetPasswordConfirm from "../components/Sign/ResetPasswordConfirm";
import BookList from "../components/Books/BookList";
import Profile from "../components/User/Profile";
import Orders from "../components/Order/Orders";
import Authors from "../components/Author/Authors";
import Users from "../components/User/Users";
import * as Yup from "yup";
import AppRoutes from "../routes";
import React from "react";
import axios from "axios";
// jest.mock("axios");

jest.spyOn(axios, 'get');
let errorSpy;
const mockResetPasswordConfirm = jest.fn(() => Promise.resolve());
const mockAuthContext = {
    loginUser: jest.fn(),
    user: {role: 1},
    authTokens: {access: 'test_token'},
    location: {state: {title: 'Test Title'}},
    resetPasswordConfirm: mockResetPasswordConfirm,

};
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        uid: 'test_uid',
        token: 'test_token',
    }),
}));

describe('App', () => {
    beforeEach(() => {
        errorSpy = jest.spyOn(console, 'error');
        errorSpy.mockImplementation(() => {});

    });

    afterEach(() => {
        axios.get.mockClear();
        errorSpy.mockRestore()
    });


    test('renders App component', () => {
        render(<App/>);

        // Check for an element that you know will be in the document after App is rendered
        const element = screen.getByText(/Welcome to Quill/i);
        expect(element).toBeInTheDocument();
    });
    test('navigating to /sign-in renders SignIn component', () => {
        render(
            <MemoryRouter initialEntries={["/sign-in"]}>
                <AppRoutes/>
            </MemoryRouter>
        );
        const Title = screen.getByRole('heading', {name: /Sign in/i, level: 1});
        expect(Title).toBeInTheDocument();
    });

    test('navigating to /sign-up renders SignUp component', () => {
        render(
            <MemoryRouter initialEntries={["/sign-up"]}>
                <AppRoutes/>
            </MemoryRouter>
        );

        const Title = screen.getByRole('heading', {name: /Sign up/i, level: 1});
        expect(Title).toBeInTheDocument();
    });

    test('renders App component', () => {
        render(
            <BrowserRouter>
                <Home/>

            </BrowserRouter>
        );

        const homeLink = screen.getByText(/Welcome to Quill/i);
        expect(homeLink).toBeInTheDocument();
    });

    test('renders BookList component and checks for three input fields', () => {
        render(
            <AuthContext.Provider value={{authTokens: {access: 'test_token'}}}>
                <BrowserRouter>
                    <BookList/>
                </BrowserRouter>
            </AuthContext.Provider>
        );

        const nameInput = screen.getByPlaceholderText(/name of the book/i);
        const authorInput = screen.getByPlaceholderText(/author of the book/i);
        const yearInput = screen.getByPlaceholderText(/year of publication/i);
        fireEvent.change(nameInput, {target: {value: 'bookname'}});
        fireEvent.change(authorInput, {target: {value: 'authorname'}});
        fireEvent.change(yearInput, {target: {value: 'year'}});
        expect(nameInput).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
    });
    test("fetches book data from the API", async () => {
        const data = { data: [] }; // Your expected book data here
        axios.get.mockImplementation(() => Promise.resolve(data));

        render(
            <AuthContext.Provider value={{ authTokens: { access: "test_token" } }}>
                <BrowserRouter>
                    <BookList />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:8000/api/v1/book/");
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });
    test("handles API errors", async () => {
        axios.get.mockImplementation(() => Promise.reject(new Error("API Error")));

        render(
            <AuthContext.Provider value={{ authTokens: { access: "test_token" } }}>
                <BrowserRouter>
                    <BookList />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => expect(errorSpy).toHaveBeenCalledTimes(2));
    });



    test('render Profile component', () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <Profile/>
                </BrowserRouter>
            </AuthContext.Provider>
        )
        const profileTitle = screen.getByRole('heading', {name: /Personal information/i, level: 1});

        expect(profileTitle).toBeInTheDocument();
    });
    test('render Orders component', () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <Orders/>
                </BrowserRouter>
            </AuthContext.Provider>
        )
        const ordersTitle = screen.getByRole('heading', {name: /Orders/i, level: 1});

        expect(ordersTitle).toBeInTheDocument();
    });

    test('renders Authors component', () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <Authors/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const authorsTitle = screen.getByRole('heading', {name: /Authors/i, level: 1});
        expect(authorsTitle).toBeInTheDocument();
    });
    test('renders Users component', () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>

                    <Users/>

                </AuthContext.Provider>
            </BrowserRouter>
        );

        const usersTitle = screen.getByRole('heading', {name: /Users/i, level: 1});
        expect(usersTitle).toBeInTheDocument();
    });
    test('renders SignIn component', () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <SignIn/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const signInTitle = screen.getByRole('heading', {name: /Sign in/i, level: 1});
        expect(screen.getByRole('button', {name: /Sign up/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Sign in/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Reset Password/i})).toBeInTheDocument();
        expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
        expect(screen.getByText(/Forgot password?/i)).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/Email:/i), {target: {value: 'test@email.com'}});
        fireEvent.change(screen.getByLabelText(/Password:/i), {target: {value: 'Testpass1'}});

        fireEvent.click(screen.getByRole('button', {name: /Sign up/i}));
        fireEvent.click(screen.getByRole('button', {name: /Sign in/i}));
        fireEvent.click(screen.getByRole('button', {name: /Reset Password/i}));
        expect(signInTitle).toBeInTheDocument();
    });


    test('renders ResetPassword component', () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <ResetPassword/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const ResetTitle = screen.getByRole('heading', {name: /Request Password Reset/i, level: 1});
        const EmailInput = screen.getByPlaceholderText(/Email/i);
        const ResetButton = screen.getByRole('button', {name: /Reset Password/i})
        expect(ResetTitle).toBeInTheDocument();
        expect(EmailInput).toBeInTheDocument();
        expect(ResetButton).toBeInTheDocument();
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {target: {value: 'test@email.com'}});
        fireEvent.click(EmailInput);


    });
    test('renders ResetPasswordConfirm component', () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <ResetPasswordConfirm/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const ResetComfTitle = screen.getByRole('heading', {name: /Reset Password Confirmation/i, level: 1});
        const PasswordInput = screen.getByPlaceholderText(/New Password/i);
        const RePasswordInput = screen.getByPlaceholderText(/Confirm Password/i);
        const ResetButton = screen.getByRole('button', {name: /Reset Password/i});
        fireEvent.change(screen.getByPlaceholderText(/New Password/i), {target: {value: 'password12N'}});
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {target: {value: 'password12N'}});
        expect(ResetComfTitle).toBeInTheDocument();
        expect(PasswordInput).toBeInTheDocument();
        expect(RePasswordInput).toBeInTheDocument();
        expect(ResetButton).toBeInTheDocument();
        fireEvent.click(ResetButton);
    });

    test('submits the form with valid data', async () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <ResetPasswordConfirm/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText(/New Password/i), {target: {value: 'Password1'}});
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {target: {value: 'Password1'}});

        // Submit the form
        fireEvent.click(screen.getByRole('button', {name: /Reset Password/i}));

        // Wait for any async actions to complete
        await waitFor(() => expect(mockResetPasswordConfirm).toHaveBeenCalledTimes(1));
        // expect(mockResetPasswordConfirm).toHaveBeenCalledWith(expect.anything(), expect.anything(), 'Password1', 'Password1');
        expect(mockResetPasswordConfirm).toHaveBeenCalledWith('test_uid', 'test_token', 'Password1', 'Password1');

    });
    test('validates form data', async () => {
        const formData = {
            new_password: 'pass',
            re_new_password: 'password',
        };
        const resetPasswordConfirmSchema = Yup.object().shape({
            new_password: Yup.string()
                .min(8)
                .matches(
                    /^(?=.*[A-Z])(?=.*\d).*$/,
                    'Password must contain at least one uppercase letter and one digit'
                )
                .required(),
            re_new_password: Yup.string()
                .oneOf([Yup.ref('new_password')], 'These passwords must match')
                .required(),
        });

        try {
            await resetPasswordConfirmSchema.validate(formData, {abortEarly: false});
        } catch (err) {
            expect(err.errors).toContain('Password must contain at least one uppercase letter and one digit');
            expect(err.errors).toContain('These passwords must match');
        }

    });


});
