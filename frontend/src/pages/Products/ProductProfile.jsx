import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductProfileQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loading from "../../components/Loading";
import PopUp from "../../components/PopUp";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import ProductRatings from "./ProductRatings";
import ProductInfoTabs from "./ProductInfoTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductProfile = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductProfileQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate("/cart");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link
          to="/shop"
          className="inline-block mb-6 text-blue-700 font-semibold hover:underline"
        >
          &larr; Back to Shop
        </Link>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <PopUp variant="danger">
            {error?.data?.message || error.message}
          </PopUp>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-lg p-8">
            {/* Product Image */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-xl border border-blue-100 shadow"
                />
                <div className="absolute top-4 right-4">
                  <HeartIcon product={product} />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
              <h2 className="text-3xl font-extrabold text-blue-900 mb-2">{product.name}</h2>
              <ProductRatings value={product.rating} text={`${product.numReviews} reviews`} />
              <p className="my-4 text-gray-600 text-lg">{product.description}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold text-lg">
                  <FaStore className="mr-2 text-blue-400" /> {product.brand}
                </span>
                <span className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold text-lg">
                  <FaBox className="mr-2 text-blue-400" /> In Stock
                </span>
              </div>
              <div className="flex items-center gap-6 mb-6">
                <span className="text-4xl font-bold text-blue-700">
                  {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </span>
                <div className="">
                  <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="p-2 rounded-lg border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400">
                    {[...Array(100).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={addToCartHandler}
                className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart className="inline mr-2 mb-1" /> Add To Cart
              </button>
            </div>
          </div>
        )}

        {/* Product Tabs (Reviews, etc.) */}
        {!isLoading && !error && (
          <div className="mt-12">
            <ProductInfoTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductProfile;
