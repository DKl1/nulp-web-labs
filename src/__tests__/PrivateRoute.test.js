import { render } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PrivateRouteRoles from "../utils/PrivateRouteRoles";
import '@testing-library/jest-dom';
import PrivateRoute from "../utils/PrivateRoute";
import BookList from "../components/Books/BookList";

const mockAuthContext = {
    loginUser: jest.fn(),
    user: null,
    authTokens: {access: 'test_token'},
    location: {state: {title: 'Test Title'}},
};
describe("PrivateRouteRoles", () => {
    const TestComponent = () => {
        return <div data-testid="test-component">Test Component</div>;
    };

    // it("renders children for authenticated user with correct role", () => {
    //
    //      render(
    //         <BrowserRouter>
    //             <AuthContext.Provider value={{ mockAuthContext }}>
    //                 <PrivateRoute>
    //                     <BookList />
    //                 </PrivateRoute>
    //             </AuthContext.Provider>
    //         </BrowserRouter>
    //     );
    //
    //     expect(screen.getByText("sign in")).toBeInTheDocument()
    // });
    //
    // it("redirects to sign-in for unauthenticated user", () => {
    //     const user = {role: 0};
    //
    //     const { queryByTestId } = render(
    //         <BrowserRouter>
    //             <AuthContext.Provider value={{ user }}>
    //                 <PrivateRouteRoles>
    //                     <TestComponent />
    //                 </PrivateRouteRoles>
    //             </AuthContext.Provider>
    //         </BrowserRouter>
    //     );
    //
    //     expect(queryByTestId(/sign in/i)).toBeNull();
    // });

    it("render test component for authenticated user with role libr2", () => {
        const user = { role: 1 }; // or whatever signifies an authenticated user with wrong role

        const { queryByTestId } = render(
            <BrowserRouter>
                <AuthContext.Provider value={{ user }}>
                    <PrivateRouteRoles>
                        <TestComponent />
                    </PrivateRouteRoles>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(queryByTestId("test-component")).toBeNull();
    });    it("render test component for authenticated user with role libr", () => {
        const user = { role: 1 }; // or whatever signifies an authenticated user with wrong role

        const { queryByTestId } = render(
            <BrowserRouter>
                <AuthContext.Provider value={{ user }}>
                    <PrivateRoute>
                        <TestComponent />
                    </PrivateRoute>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(queryByTestId("test-component")).toBeNull();
    });
});
