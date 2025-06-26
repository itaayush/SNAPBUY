import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const ProductTile = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-blue-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded-t-xl"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold text-blue-900">{product.name}</div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
              {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default ProductTile;
