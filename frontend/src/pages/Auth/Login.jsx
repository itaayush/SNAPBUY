import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      const errorMsg = err?.data?.message || err.error;
      if (
        errorMsg &&
        (errorMsg.toLowerCase().includes("user not found") ||
          errorMsg.toLowerCase().includes("no user") ||
          errorMsg.toLowerCase().includes("not registered") ||
          errorMsg.toLowerCase().includes("email not found"))
      ) {
        toast.info("New User. Please Register");
        navigate(redirect ? `/register?redirect=${redirect}` : "/register");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full p-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Sign In to SnapBuy</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 border border-blue-200 rounded-lg w-full focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 text-blue-900"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-800 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-3 border border-blue-200 rounded-lg w-full focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 text-blue-900"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading && <Loading />}
        </form>
        <div className="mt-6 text-center">
          <p className="text-blue-700">
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-500 hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
