import React from "react";
import { HashRouter as Router, Route, Routes, } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'react-notifications/lib/notifications.css';
import './App.css';
import './index.css'
import HomeScreen from "./screens/HomeScreen";
import BookScreen from "./screens/BookScreen";
import AboutScreen from "./screens/aboutScreen";
import ContactUs from "./screens/contactUsScreen";
import BagScreen from "./screens/BagScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import BorrowsScreen from "./screens/BorrowsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PlaceBorrowScreen from "./screens/PlaceBorrowScreen";
import DetailsOrderScreen from "./screens/DetailsOrderScreen";
import DetailsBorrowScreen from "./screens/DetailsBorrowScreen";
import AdminScreen from "./screens/AdminScreen";

function App() {
  return (
        <Router>
            <Header/>

            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen/>} exact></Route>
                        <Route path="/signup" element={<SignUpScreen/>}></Route>
                        <Route path="/profile" element={<ProfileScreen/>}></Route>
                        <Route path="/shipping" element={<ShippingScreen/>}></Route>
                        <Route path="/confirm" element={<ConfirmScreen/>}></Route>
                        <Route path="/payment" element={<PaymentScreen/>}></Route>
                        <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
                        <Route path="/order/:id" element={<DetailsOrderScreen/>}></Route>
                        <Route path="/placeborrow" element={<PlaceBorrowScreen/>}></Route>
                        <Route path="/borrow/:id" element={<DetailsBorrowScreen/>}></Route>
                        <Route path="/borrows" element={<BorrowsScreen/>}></Route>
                        <Route path="/login" element={<LoginScreen/>}></Route>
                        <Route path="/book/:id" element={<BookScreen/>}></Route>
                        <Route path="/aboutUs" element={<AboutScreen/>}></Route>
                        <Route path="/contactUs" element={<ContactUs/>}></Route>
                        <Route path="/bag/*" element={<BagScreen/>}></Route>


                        <Route path="/admin/*" element={<AdminScreen/>}></Route>
                    </Routes>
                </Container>
            </main>

            <Footer/>
        </Router>
  );
}

export default App;
