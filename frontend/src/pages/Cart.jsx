import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty, setQty: true }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-blue-50 min-h-screen py-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-blue-700 shadow-sm">
            Your cart is empty <Link to="/shop" className="text-blue-600 font-semibold hover:underline">Go To Shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-blue-50"
                    />
                    <div className="flex-1 ml-6">
                      <Link to={`/product/${item._id}`} className="text-lg font-bold text-blue-900 hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-blue-600 mt-1 font-semibold">
                        {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                      </div>
                      <div className="text-sm text-blue-400 mt-1">{item.brand}</div>
                    </div>
                    <div className="flex flex-col items-center gap-2 mr-6">
                      <select
                        className="w-20 p-2 border border-blue-200 rounded-lg text-blue-900 bg-blue-50 focus:outline-none"
                        value={item.qty}
                        onChange={(e) => addToCartHandler({ ...item, qty: Number(e.target.value) }, Number(e.target.value))}
                      >
                        {[...Array(100).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                        onClick={() => removeFromCartHandler(item._id)}
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Cart Summary */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-blue-100 flex flex-col justify-between h-fit">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-blue-700 font-medium">
                <span>Items</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>
              <div className="flex justify-between mb-2 text-blue-700 font-medium">
                <span>Total</span>
                <span className="text-2xl font-bold text-blue-900">
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </span>
              </div>
              <button
                className="bg-blue-600 mt-6 py-3 px-4 rounded-lg text-lg font-bold text-white w-full hover:bg-blue-700 transition-colors"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
