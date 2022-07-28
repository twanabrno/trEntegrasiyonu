import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import AllProducts from "./components/AllProducts";
import Product from "./components/Product";
import Category from "./components/Category";
import Brands from "./components/Brands";
import Login from "./components/Login";
import Register from "./components/Register";
import Nomatch from "./components/Nomatch";
import InnerConent from "./components/InnerConent";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<InnerConent />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />}>
          <Route index element={<AllProducts />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
        <Route path="category" element={<Category />} />
        <Route path="brands" element={<Brands />} />
      </Route>
      <Route path="*" element={<Nomatch />} />
    </Routes>
  );
}

export default App;
