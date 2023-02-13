import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProduct from "./Views/CreateProducts/CreateProduct";
import ProductOrders from "./Views/ProductOrders/ProductOrders";
import Login from "./Views/Login/Login";
import ProductLists from "./Views/ProductLists/ProductLists";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<CreateProduct />} />
        <Route path="/product-orders" element={<ProductOrders />} />
        <Route path="/product-lists" element={<ProductLists />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
