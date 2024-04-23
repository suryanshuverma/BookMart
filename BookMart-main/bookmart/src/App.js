import "./App.css";
import Home from "./components/Home" ;
import Header from "./components/Header";
import Wishlist from "./components/Wishlist" ;
import AddBook from "./components/AddBook";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import { ToastContainer } from "react-toastify";
import Constants from "./components/Utilities/Constants";
import GoToTopButton from "./components/GoToTopButton";
import Help from "./components/Help";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/CartItems/ShoppingCart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/help" element={<Help />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cartdata" element={<ShoppingCart/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={Constants.autoCloseTime}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <GoToTopButton />
    </>
  );
}

export default App;