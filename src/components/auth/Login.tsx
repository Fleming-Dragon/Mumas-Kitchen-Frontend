import React, { useState, FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
// Import your logo - you'll need to adjust the path based on your project structure
import logo from "../../../assets/logo_v1.png";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>(""); // Can be email or username
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ identifier, password });
      navigate("/"); // Redirect to dashboard after login
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/" className="flex items-center justify-center">
            <img src={logo} alt="Vedant Kitchen" className="h-60" />
          </Link>
          <h2 className="mt-4 text-center text-xl font-sans leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[320px]">
          <div className="bg-white py-8 px-0 shadow sm:rounded-lg sm:px-4">
            {error && (
              <div className="mb-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-sans font-bold leading-6 text-gray-900 px-6"
                >
                  Email or Username
                </label>
                <div className="mt-1 px-6">
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your email or username"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-sans font-bold leading-6 text-gray-900 px-6"
                >
                  Password
                </label>
                <div className="mt-1 px-6">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xs leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-xs leading-6">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-amber-600 hover:text-amber-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="px-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-amber-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-gray-500">
              Not a member?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-amber-600 hover:text-amber-500"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
