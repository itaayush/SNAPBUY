import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-center py-8 mt-8 rounded-t-2xl shadow-inner border-t border-blue-200">
    <div className="container mx-auto flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center space-x-6 mb-2 text-base font-medium">
        <Link to="/" className="hover:text-blue-900 transition-colors">About</Link>
        <Link to="/" className="hover:text-blue-900 transition-colors">Contact</Link>
        <Link to="/" className="hover:text-blue-900 transition-colors">Privacy Policy</Link>
        <Link to="/" className="hover:text-blue-900 transition-colors">Terms of Service</Link>
      </div>
      <p className="text-lg font-bold">&copy; {new Date().getFullYear()} SnapBuy. All rights reserved.</p>
      <p className="text-sm text-blue-700 mt-1">Your trusted online shop for the best deals and products.</p>
    </div>
  </footer>
);

export default Footer; 