import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loading from "./Loading";
import MiniProductCard from "../pages/Products/MiniProductCard";
import FeaturedProductsSlider from "../pages/Products/FeaturedProductsSlider";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <header className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex-1 mb-6 md:mb-0 md:mr-8">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900">Welcome to SnapBuy</h1>
        <p className="text-lg text-blue-700 mb-6">Discover our top products and latest deals!</p>
        <div className="grid grid-cols-2 gap-4">
          {data.map((product) => (
            <div key={product._id}>
              <MiniProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <FeaturedProductsSlider />
      </div>
    </header>
  );
};

export default Header;
