import React from 'react';
import {BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom';
import Header from './components/Header/Header';
import Books from './components/Books/Books';
import Home from './components/Home/Home';
import SignIn from './components/Sign/SignIn';
import SignUp from './components/Sign/SignUp';
import Profile from "./components/User/Profile";
import Users from "./components/User/Users";
import Authors from "./components/Author/Authors";
import Book from "./components/Books/Book";
import Orders from "./components/Order/Orders";
import OrdersList from "./components/Order/OrdersList";
import {AuthProvider} from './context/AuthContext';
import PrivateRoute from "./utils/PrivateRoute";
import Footer from "./components/Footer/Footer";
import './App.css'
import ResetPassword from "./components/Sign/ResetPassword";
import PrivateRouteRoles from "./utils/PrivateRouteRoles";
import ResetPasswordConfirm from "./components/Sign/ResetPasswordConfirm";
import User from "./components/User/User";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header/>
                <div className="page">
                    <div className="main">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/" element={<PrivateRoute/>}>
                                <Route path="/books" element={<Books/>}/>
                                <Route path="/book/:id" element={<Book/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/orders" element={<Orders/>}/>
                                <Route path="/orders-list" element={<OrdersList/>}/>
                                <Route path="/authors" element={<Authors/>}/>

                            </Route>
                            <Route path="/" element={<PrivateRouteRoles/>}>
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/user/:id" element={<User/>}/>

                            </Route>
                            <Route path="/sign-in"
                                   element={<SignIn/>}/>
                            <Route path="/sign-up"
                                   element={<SignUp/>}/>
                            <Route path="/reset-password"
                                   element={<ResetPassword/>}/>
                            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}/>

                            <Route
                                path="*"
                                element={<Navigate to="/" replace/>}
                            />
                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
