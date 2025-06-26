import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const [createOrder] = useCreateOrderMutation();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: "Cash on Delivery",
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      toast.success("Order placed successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Order Summary</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Delivery Address</h2>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-900">
            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.country}, {shippingAddress.pinCode}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Cart Items</h2>
          <ul className="divide-y divide-blue-100">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item._id} className="py-3 flex justify-between items-center">
                  <span>{item.name} x {item.qty}</span>
                  <span className="font-semibold text-blue-700">
                    {(item.price * item.qty).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-3 text-gray-500">No items in cart.</li>
            )}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Payment Method</h2>
          <div className="flex items-center bg-blue-50 rounded-lg p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked
              readOnly
              className="form-radio text-blue-600 mr-3"
            />
            <span className="text-blue-900 font-medium">Cash on Delivery</span>
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-lg w-full font-semibold shadow-md transition-colors"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary; 