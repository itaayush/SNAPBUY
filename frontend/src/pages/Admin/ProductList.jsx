import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", imageFile);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("brand", brand);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const [brand, setBrand] = useState("");

  return (
    <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-4">
          <label className="w-full cursor-pointer">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 transition-colors">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="product preview"
                  className="w-40 h-40 object-cover rounded mb-2"
                />
              ) : (
                <span className="text-blue-400 font-semibold">Click to upload product image</span>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imageFile && (
              <div className="text-xs text-blue-700 mt-2">{imageFile.name}</div>
            )}
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-blue-900">Name</label>
            <input
              type="text"
              className="p-3 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">Price</label>
            <input
              type="number"
              className="p-3 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-blue-900">Brand</label>
            <input
              type="text"
              className="p-3 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">Category</label>
            <select
              className="p-3 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-blue-900">Description</label>
          <textarea
            className="p-3 w-full border rounded-lg bg-blue-50 text-blue-900 min-h-[80px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full py-3 px-8 rounded-lg text-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductList;
