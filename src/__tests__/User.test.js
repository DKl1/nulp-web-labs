import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import User from "../components/User/User";
import AuthContext from "../context/AuthContext";
import '@testing-library/jest-dom';
// This sets the mock adapter on the default instance
let mock = new MockAdapter(axios);

// Mock any GET request to /api/v1/user/1/
// Respond with mock data
mock.onGet("http://127.0.0.1:8000/api/v1/user/1/").reply(200, {
    first_name: "John",
    last_name: "Doe",
    middle_name: "JD",
    email: "john.doe@example.com",
    role: 1,
    created_at: "2023-04-21T05:02:00Z",
    last_login: "2023-04-21T05:02:00Z",
    updated_at: "2023-04-21T05:02:00Z",
});

mock.onGet("http://127.0.0.1:8000/api/v1/user/1/order/").reply(200, [
    {
        id: 1,
        book: 1,
        book_names: [{ id: 1, name: "Test Book" }],
    },
]);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "1",
    }),
}));

describe("User component", () => {
    test("fetches user and order data and renders", async () => {
        render(
            <AuthContext.Provider value={{ authTokens: { access: "access_token" } }}>
                <Router>
                    <User />
                </Router>
            </AuthContext.Provider>
        );

        await waitFor(() => screen.getByText("User Information"));

        expect(screen.getByText("User First Name: John Doe")).toBeInTheDocument();
        expect(screen.getByText("User Last Name: Doe")).toBeInTheDocument();
        expect(screen.getByText("User Name: JD")).toBeInTheDocument();
        expect(screen.getByText("Email: john.doe@example.com")).toBeInTheDocument();
        expect(screen.getByText(/Role:/)).toBeInTheDocument();
        expect(screen.getByText("Created at: 2023-04-21T05:02:00Z")).toBeInTheDocument();
        expect(screen.getByText("Last Login at: 2023-04-21T05:02:00Z")).toBeInTheDocument();
        expect(screen.getByText("Updated at: 2023-04-21T05:02:00Z")).toBeInTheDocument();
        expect(screen.getByText(/Test Book/)).toBeInTheDocument();

    });
});
