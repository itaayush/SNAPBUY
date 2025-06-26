import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery, useGetTopProductsQuery, useGetNewProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import Loading from "../components/Loading";
import PopUp from "../components/PopUp";
import Header from "../components/Header";
import Product from "./Products/ProductTile";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  const { data: categoriesData, isLoading: isCategoriesLoading, isError: isCategoriesError } = useFetchCategoriesQuery();
  const { data: bestSellers, isLoading: isBestSellersLoading, isError: isBestSellersError } = useGetTopProductsQuery();
  const { data: newArrivals, isLoading: isNewArrivalsLoading, isError: isNewArrivalsError } = useGetNewProductsQuery();

  return (
    <>
      {/* Hero Section */}
      {!keyword && (
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-4 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold mb-4 text-center drop-shadow-lg">Welcome to SnapBuy</h1>
          <p className="text-xl mb-8 text-center max-w-2xl">Discover the best deals on electronics, fashion, home essentials, and more. Shop the latest arrivals and best sellers, all in one place.</p>
          <Link
            to="/shop"
            className="bg-white text-blue-700 font-bold rounded-full py-3 px-10 text-lg shadow-lg hover:bg-blue-100 transition"
          >
            Shop Now
          </Link>
        </section>
      )}
      {/* End Hero Section */}

      {/* Featured Categories Section */}
      {!keyword && (
        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Featured Categories</h2>
          {isCategoriesLoading ? (
            <Loading />
          ) : isCategoriesError ? (
            <PopUp variant="danger">Failed to load categories.</PopUp>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {categoriesData?.map((category) => (
                <div
                  key={category._id}
                  className="bg-white border border-blue-100 rounded-xl shadow-md p-6 flex items-center justify-center text-blue-700 font-semibold text-lg hover:bg-blue-50 hover:shadow-lg transition cursor-pointer min-h-[100px] text-center"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {/* End Featured Categories Section */}

      {/* Best Sellers Section */}
      {!keyword && (
        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Best Sellers</h2>
          {isBestSellersLoading ? (
            <Loading />
          ) : isBestSellersError ? (
            <PopUp variant="danger">Failed to load best sellers.</PopUp>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {bestSellers?.map((product) => (
                <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {/* End Best Sellers Section */}

      {/* New Arrivals Section */}
      {!keyword && (
        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">New Arrivals</h2>
          {isNewArrivalsLoading ? (
            <Loading />
          ) : isNewArrivalsError ? (
            <PopUp variant="danger">Failed to load new arrivals.</PopUp>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {newArrivals?.map((product) => (
                <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {/* End New Arrivals Section */}

      {/* Promo Banner Section */}
      {!keyword && (
        <section className="max-w-4xl mx-auto my-12 px-4">
          <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-2">Limited Time Offer!</h3>
            <p className="mb-4 text-lg">Get up to 50% off on select products. Hurry, shop now before the offer ends!</p>
            <Link
              to="/shop"
              className="bg-white text-blue-700 font-bold rounded-full py-2 px-8 text-lg shadow hover:bg-blue-100 transition"
            >
              Explore Deals
            </Link>
          </div>
        </section>
      )}
      {/* End Promo Banner Section */}

      {/* Newsletter Signup Section */}
      {!keyword && (
        <section className="max-w-4xl mx-auto my-12 px-4">
          <div className="bg-white border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Stay Updated!</h3>
            <p className="mb-4 text-blue-700 text-lg text-center">Subscribe to our newsletter for the latest updates, offers, and new arrivals.</p>
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="py-3 px-4 border border-blue-200 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold rounded-lg py-3 px-8 hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      )}
      {/* End Newsletter Signup Section */}
    </>
  );
};

export default Home;
