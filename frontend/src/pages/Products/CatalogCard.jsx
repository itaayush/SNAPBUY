import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const CatalogCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-xs bg-white border border-blue-100 rounded-2xl transition-shadow duration-200 hover:shadow-xl flex flex-col overflow-hidden group">
      <div className="relative">
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full z-10">
          {p?.brand}
        </span>
        <Link to={`/product/${p._id}`}> 
          <img
            className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-200"
            src={`${import.meta.env.VITE_API_URL}${p.image}`}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </div>
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <h5 className="mb-2 text-lg font-bold text-blue-900 truncate">{p?.name}</h5>
          <p className="text-blue-600 font-semibold text-xl mb-2">
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
          <p className="mb-3 text-gray-500 text-sm min-h-[40px]">{p?.description?.substring(0, 60)} ...</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            onClick={() => addToCartHandler(p, 1)}
            title="Add to Cart"
          >
            <AiOutlineShoppingCart size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
