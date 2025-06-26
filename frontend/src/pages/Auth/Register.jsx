import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        if (err?.data?.message === 'User already exists' || err?.data === 'User already exists') {
          toast.error('You already have an account');
          navigate('/login');
        } else {
          toast.error(err.data?.message || 'Registration failed');
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full p-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Register for SnapBuy</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-3 border border-blue-200 rounded-lg w-full focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 text-blue-900"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-800 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-3 border border-blue-200 rounded-lg w-full focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 text-blue-900"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loading />}
        </form>
        <div className="mt-6 text-center">
          <p className="text-blue-700">
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-blue-500 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
