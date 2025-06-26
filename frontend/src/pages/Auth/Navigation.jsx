import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-xl py-3 px-6 flex items-center justify-between rounded-b-2xl sticky top-0 z-50 border-b border-blue-100">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors">
          <AiOutlineHome size={24} className="mr-1" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <Link to="/shop" className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors">
          <AiOutlineShopping size={24} className="mr-1" />
          <span className="hidden sm:inline">Shop</span>
        </Link>
        <Link to="/cart" className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors relative">
          <AiOutlineShoppingCart size={24} className="mr-1" />
          <span className="hidden sm:inline">Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-md border-2 border-white">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
        <Link to="/favorite" className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors relative">
          <span className="relative flex items-center">
            <FaHeart size={20} className="mr-1" />
            <FavoritesCount />
          </span>
          <span className="hidden sm:inline">Favorites</span>
        </Link>
      </div>
      <div className="relative">
        {userInfo ? (
          userInfo.isAdmin ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-3 py-2 hover:bg-blue-50 transition"
            >
              {userInfo.username}
            </Link>
          ) : (
            <Link
              to="/profile"
              className="flex items-center text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-3 py-2 hover:bg-blue-50 transition"
            >
              {userInfo.username}
            </Link>
          )
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link to="/login" className="flex items-center text-blue-700 hover:text-blue-900 font-semibold">
                <AiOutlineLogin size={24} className="mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center text-blue-700 hover:text-blue-900 font-semibold">
                <AiOutlineUserAdd size={24} className="mr-1" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          nav { flex-direction: column; align-items: flex-start; padding: 1rem; }
          nav > div:first-child { flex-direction: column; gap: 1rem; }
        }
        
      `}</style>
    </nav>
  );
};

export default Navigation;
