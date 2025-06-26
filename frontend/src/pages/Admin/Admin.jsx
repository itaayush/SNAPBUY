import { Outlet } from "react-router-dom";
import AdminSideMenu from "./AdminSideMenu";

const Admin = () => {
  return (
    <div className="flex bg-blue-50 min-h-screen">
      <AdminSideMenu />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin; 