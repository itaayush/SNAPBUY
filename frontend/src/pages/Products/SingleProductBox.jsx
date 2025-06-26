import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { Link } from "react-router-dom";

const SingleProductBox = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="flex items-center bg-white rounded-xl shadow-md border border-blue-100 mb-6 p-4 relative">
      
      <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-28 h-28 object-cover rounded-lg hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
      
      <div className="flex-1 px-6 flex flex-col items-start">
        <Link to={`/product/${product._id}`} className="hover:underline">
          <h2 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h2>
        </Link>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <span className="bg-blue-100 text-blue-800 text-base font-medium px-3 py-1 rounded-full">
          {product.price?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </span>
      </div>
      
      <div className="flex flex-col items-center gap-4 min-w-[80px]">
        <HeartIcon product={product} />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProductBox; 