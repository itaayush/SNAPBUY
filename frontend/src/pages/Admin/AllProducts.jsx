import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">All Products ({products.length})</h2>
      <div className="flex flex-wrap justify-around items-center gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-blue-50 rounded-lg shadow p-4 w-[22rem] mb-4 flex flex-col justify-between">
            <img
              src={`${import.meta.env.VITE_API_URL}${product.image}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <div className="flex flex-col justify-between flex-1">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-blue-900">{product?.name}</h5>
                <span className="text-xs text-gray-400">{moment(product.createdAt).format("MMM Do YYYY")}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-1">
                {product?.description?.substring(0, 120)}...
              </p>
              <div className="flex justify-between items-center mt-2">
                <Link
                  to={`/admin/product/update/${product._id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Product
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
                <span className="font-bold text-blue-900">
                  {product?.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
