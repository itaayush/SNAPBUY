import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AdminRoute from "./pages/Admin/AdminRoute";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/User/Profile";
import UserList from "./pages/Admin/UserList";

import ManageCategories from "./pages/Admin/ManageCategories";

import ProductList from "./pages/Admin/ProductList";
import EditProduct from "./pages/Admin/EditProduct";
import AllProducts from "./pages/Admin/AllProducts";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductProfile from "./pages/Products/ProductProfile.jsx";

import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

import Shipping from "./pages/Orders/Shipping.jsx";
import AllOrder from "./pages/Admin/AllOrder.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import OrderSummary from "./pages/Orders/OrderSummary.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductProfile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<Admin />}>
          <Route path="userlist" element={<UserList />} />
          <Route path="categorylist" element={<ManageCategories />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="allproductslist" element={<AllProducts />} />
          <Route path="productlist/:pageNumber" element={<ProductList />} />
          <Route path="product/update/:_id" element={<EditProduct />} />
          <Route path="orderlist" element={<AllOrder />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
