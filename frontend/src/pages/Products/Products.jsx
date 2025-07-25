import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductProfileQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import ProductRatings from "./ProductRatings";
import Loading from "../../components/Loading";
import PopUp from "../../components/PopUp";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductInfoTabs from "./ProductInfoTabs";
import HeartIcon from "./HeartIcon";
import ProductRatings from "./ProductRatings";

const Products = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

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
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div>
        <Link
          className="text-white font-semibold hover:underline ml-[10rem]"
          to="/"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <PopUp variant="danger">
          {error?.data?.message || error.error}
        </PopUp>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div>
              <img
                src={`${import.meta.env.VITE_API_URL}${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>

              <p className="my-4 xl:w-[35rem] lg:w-[35] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>
              <p className="text-5xl my-4 font-extrabold">
                {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaBox className="mr-2 text-white" /> In Stock
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <ProductRatings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                <div className="">
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="p-2 rounded-lg border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400"
                  >
                    {[...Array(100).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
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
        </>
      )}
    </>
  );
};

export default Products;
