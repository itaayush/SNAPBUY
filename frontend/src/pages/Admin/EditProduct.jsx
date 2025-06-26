import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    console.log('productData:', productData);
    console.log('categories:', categories);
    console.log('current category:', category);

    if (
      productData &&
      productData._id &&
      categories.length > 0
    ) {

      let validCategory = productData.category?._id;
      if (!validCategory || !categories.some((c) => c._id === validCategory)) {
        validCategory = categories[0]?._id || "";
      }
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(validCategory);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData, categories]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectedCategory = category;
    if (!selectedCategory || selectedCategory === "undefined") {
      selectedCategory = productData?.category?._id || "";
    }
    if (!selectedCategory) {
      alert("Please select a valid category.");
      return;
    }
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (image) {
        formData.append("image", image);
      }
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", selectedCategory);
      formData.append("brand", brand);

      console.log([...formData.entries()]);

      const { data, error } = await updateProduct({ productId: params._id, formData });

      if (error || data?.error) {
        toast.error(error?.data?.message || data?.error || "Update failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      await deleteProduct(params._id);
      toast.success("Product deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Update / Delete Product</h2>
      {image && (
        <div className="text-center mb-4">
          <img
            src={`https://snapbuy-backend-xxxx.onrender.com${image}`}
            alt={name}
            className="w-40 h-40 object-cover rounded mb-4"
          />
        </div>
      )}
      <div className="mb-3">
        <label className="text-blue-900 py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-6 bg-blue-50">
          Upload image
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            className="text-blue-900"
          />
        </label>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="p-3 mb-2 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="p-3 mb-2 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="p-3 mb-2 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            className="p-3 mb-2 w-full border rounded-lg bg-blue-50 text-blue-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category">Category</label>
            <select
              placeholder="Choose Category"
              className="p-3 mb-2 w-full border rounded-lg bg-blue-50 text-blue-900"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
