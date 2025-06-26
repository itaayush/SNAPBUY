import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import { FaRedo, FaSearch } from "react-icons/fa";
import SingleProductBox from "./Products/SingleProductBox";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        const matchesCategory = checked.length === 0 || checked.includes(product.category?._id || product.category);
        const matchesBrand = radio.length === 0 || radio.includes(product.brand);
        const matchesPrice = !priceFilter || product.price <= parseInt(priceFilter, 10);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, searchTerm]);

  
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-12">
      <div className="container mx-auto">
        <div className="flex items-center mb-8 gap-4 pt-8">
          <div className="flex flex-1 items-center bg-white border border-blue-200 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
            <FaSearch className="text-blue-400 mr-2" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-blue-900 placeholder-blue-300 border-none focus:ring-0 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8 bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col">
            <label className="text-blue-700 font-semibold mb-1">Category</label>
            <select
              className="px-4 py-2 rounded-lg border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400 min-w-[160px]"
              value={checked[0] || ""}
              onChange={e => {
                const value = e.target.value;
                if (value) {
                  dispatch(setChecked([value]));
                } else {
                  dispatch(setChecked([]));
                }
              }}
            >
              <option value="">All Categories</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-blue-700 font-semibold mb-1">Brand</label>
            <select
              className="px-4 py-2 rounded-lg border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400 min-w-[160px]"
              value={radio[0] || ""}
              onChange={e => {
                const value = e.target.value;
                if (value) {
                  dispatch({ type: 'shop/setRadio', payload: [value] });
                } else {
                  dispatch({ type: 'shop/setRadio', payload: [] });
                }
              }}
            >
              <option value="">All Brands</option>
              {uniqueBrands?.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-blue-700 font-semibold mb-1">Price</label>
            <select
              className="px-4 py-2 rounded-lg border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400 min-w-[120px]"
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="500">Below ₹500</option>
              <option value="1000">Below ₹1000</option>
              <option value="5000">Below ₹5000</option>
              <option value="10000">Below ₹10000</option>
            </select>
          </div>

          <button
            className="bg-blue-100 text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-blue-200 flex items-center gap-2 transition-colors mt-6 md:mt-0"
            onClick={() => {
              setPriceFilter("");
              dispatch(setChecked([]));
              dispatch({ type: 'shop/setRadio', payload: [] });
            }}
          >
            <FaRedo /> Reset Filters
          </button>
        </div>

        <h2 className="text-xl font-bold text-blue-900 mb-4">{products?.length} Products</h2>
        <div className="flex flex-col gap-4">
          {products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No products" className="w-32 h-32 mb-4 opacity-60" />
              <p className="text-blue-700 text-lg font-semibold">No products found. Try adjusting your filters or search!</p>
            </div>
          ) : (
            products?.map((p, idx) => (
              <SingleProductBox key={p._id || p.id} product={p} />
            ))
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default Shop;
