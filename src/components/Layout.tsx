import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Utensils, Menu, X } from "lucide-react";
import img1 from "../../assets/logo_v1.png";
import img2 from "../../assets/pexels-olly-831012.jpg";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Meals", href: "/meals" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 h-20 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="">
                <img src={img1} alt="" className="size-20" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                MUMMA'S KITCHEN
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link
                to="/meals"
                className="bg-amber-500 text-white px-6 py-2 mt-1 h-10  rounded-lg font-medium hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Order Now
              </Link>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-amber-500 text-white ml-3 p-1 rounded-full font-medium hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <img src={img2} alt="" className="w-10 h-10 rounded-full" />
              </button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-44 mr-20 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1 text-sm text-gray-700">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/meals"
                onClick={() => setIsMenuOpen(false)}
                className="block mx-3 mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg font-medium text-center hover:bg-amber-600 transition-colors duration-200"
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Mumma's Kitchen</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Bringing home-style meals to busy lives. Reliable, warm, and
                personal food delivery that feels like mumma's cooking.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>hello@mummaskitchen.com</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mumma's Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
