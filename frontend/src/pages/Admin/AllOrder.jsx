import PopUp from "../../components/PopUp";
import Loading from "../../components/Loading";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const AllOrder = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Orders</h2>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <PopUp variant="danger">
          {error?.data?.message || error.error}
        </PopUp>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Items</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">User</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {orders.map((order, idx) => (
                <tr key={order._id} className={idx % 2 === 0 ? "bg-blue-50" : ""}>
                  <td className="px-4 py-2">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${order.orderItems[0].image}`}
                      alt={order.orderItems[0].name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-xs text-blue-900">{order._id}</td>
                  <td className="px-4 py-2">{order.user ? order.user.username : "N/A"}</td>
                  <td className="px-4 py-2">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                  <td className="px-4 py-2 font-semibold">
                    {Number(order.totalPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
