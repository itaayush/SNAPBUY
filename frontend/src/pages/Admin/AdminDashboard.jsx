import { Link } from "react-router-dom";
import { useGetUsersQuery, useLogoutMutation } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetOrdersQuery,
} from "../../redux/api/orderApiSlice";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import Loading from "../../components/Loading";
import { FaRupeeSign, FaUsers, FaBoxOpen, FaShoppingBag, FaPlus, FaList, FaUser, FaTags } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: allOrders, isLoading: loadingAllOrders } = useGetOrdersQuery();
  const { data: products, isLoading: loadingProducts } = useAllProductsQuery();
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const recentOrders = allOrders?.slice(0, 5) || [];

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      
    }
  };

  return (
    <div className="relative">
      <button
        onClick={logoutHandler}
        className="absolute top-0 right-0 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 mt-4 mr-4 z-10"
      >
        Logout
      </button>
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="bg-white rounded-xl p-6 flex flex-col items-center border border-blue-100">
          <FaRupeeSign className="text-3xl text-blue-600 mb-2" />
          <p className="text-blue-700 mb-1 font-semibold">Total Sales</p>
          <h1 className="text-2xl font-bold text-blue-900">
            {loadingSales ? <Loading /> : (sales?.totalSales || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </h1>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center border border-blue-100">
          <FaShoppingBag className="text-3xl text-blue-600 mb-2" />
          <p className="text-blue-700 mb-1 font-semibold">Total Orders</p>
          <h1 className="text-2xl font-bold text-blue-900">
            {loadingOrders ? <Loading /> : orders?.totalOrders || 0}
          </h1>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center border border-blue-100">
          <FaUsers className="text-3xl text-blue-600 mb-2" />
          <p className="text-blue-700 mb-1 font-semibold">Total Users</p>
          <h1 className="text-2xl font-bold text-blue-900">
            {loadingUsers ? <Loading /> : customers?.length || 0}
          </h1>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center border border-blue-100">
          <FaBoxOpen className="text-3xl text-blue-600 mb-2" />
          <p className="text-blue-700 mb-1 font-semibold">Total Products</p>
          <h1 className="text-2xl font-bold text-blue-900">
            {loadingProducts ? <Loading /> : products?.length || 0}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/admin/productlist" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          <FaPlus className="mr-2" /> Add Product
        </Link>
        <Link to="/admin/orderlist" className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
          <FaList className="mr-2" /> View Orders
        </Link>
        <Link to="/admin/userlist" className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
          <FaUser className="mr-2" /> Manage Users
        </Link>
        <Link to="/admin/categorylist" className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
          <FaTags className="mr-2" /> Create Category
        </Link>
      </div>
      <div className="bg-white rounded-xl p-8 border border-blue-100">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Recent Orders</h2>
        {loadingAllOrders ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">User</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-50">
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2 text-xs text-blue-900">{order._id}</td>
                    <td className="px-4 py-2">{order.user ? order.user.username : "N/A"}</td>
                    <td className="px-4 py-2 font-semibold">{Number(order.totalPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                    <td className="px-4 py-2">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
