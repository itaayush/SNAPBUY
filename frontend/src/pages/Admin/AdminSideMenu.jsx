import { NavLink } from "react-router-dom";

const AdminSideMenu = () => {
  return (
    <aside className="hidden md:block bg-white rounded-xl shadow-lg p-6 w-64 min-h-[400px] mr-8 mt-8">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-8 text-center">Admin Panel</h2>
      <ul className="space-y-3">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/categorylist"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              }`
            }
          >
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/productlist"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              }`
            }
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/allproductslist"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              }`
            }
          >
            All Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/userlist"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              }`
            }
          >
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orderlist"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              }`
            }
          >
            Manage Orders
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideMenu;
