import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress
} from "../../redux/features/cart/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [stateName, setStateName] = useState(shippingAddress.state || "");
  const [pinCode, setPinCode] = useState(shippingAddress.pinCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, state: stateName, pinCode, country }));
    navigate("/ordersummary");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center items-center min-h-[70vh]">
        <form onSubmit={submitHandler} className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10 border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Add Delivery Address</h1>
          <div className="mb-6">
            <label className="block text-blue-800 font-medium mb-2">Address</label>
            <input
              type="text"
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-800 font-medium mb-2">City</label>
            <input
              type="text"
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-800 font-medium mb-2">State</label>
            <input
              type="text"
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter state"
              value={stateName}
              required
              onChange={(e) => setStateName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-800 font-medium mb-2">Pin Code</label>
            <input
              type="text"
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter pin code"
              value={pinCode}
              required
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-blue-800 font-medium mb-2">Country</label>
            <input
              type="text"
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-lg w-full font-semibold shadow-md transition-colors"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
