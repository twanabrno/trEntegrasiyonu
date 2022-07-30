import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/temporary/auth";
import Dashboard from "./components/Dashboard";
import Products from "./components/products/Products";
import AllProducts from "./components/products/AllProducts";
import Product from "./components/products/Product";
import Category from "./components/Category";
import Brands from "./components/brands/Brands";
import Login from "./components/Login";
import Register from "./components/Register";
import Nomatch from "./components/Nomatch";
import InnerConent from "./components/InnerConent";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<RequireAuth><InnerConent /></RequireAuth>}>
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
    </AuthProvider>
  );
}

export default App;
