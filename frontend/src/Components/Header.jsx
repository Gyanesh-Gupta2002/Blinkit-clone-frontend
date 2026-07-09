import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Header({ cart, searchTerm, setSearchTerm, user, logout }) {
  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 px-4 md:px-10 py-3 md:py-4 shadow-md bg-white dark:bg-gray-900 relative z-[9999]">

      {/* Top row on mobile: Logo + Cart (always visible) */}
      <div className="flex items-center justify-between md:justify-start gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 text-white font-extrabold text-base md:text-lg w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center">
            QK
          </div>
          <div>
            <h1 className="text-sm md:text-xl font-extrabold text-gray-800 dark:text-white leading-tight">
              Quick<span className="text-green-600">Kart</span>
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight">
              Delivery in 10 minutes
            </p>
          </div>
        </div>

        {/* Cart visible on mobile top row too */}
        <Link to="/cart" className="md:hidden">
          <button className="relative bg-green-600 text-white px-3 py-2 rounded-xl text-sm">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* Search - full width on mobile */}
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl p-2.5 md:p-3 w-full md:flex-1 md:min-w-[200px] md:max-w-[500px] outline-none text-sm md:text-base"
      />

      {/* Buttons row - scrollable on mobile if needed */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0 flex-nowrap md:flex-wrap justify-start md:justify-end">
        <Link to="/">
          <button className="whitespace-nowrap px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm">
            Home
          </button>
        </Link>

        {user ? (
          <>
            <Link to="/my-orders">
              <button className="whitespace-nowrap px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm">
                Orders
              </button>
            </Link>

            <span className="whitespace-nowrap text-gray-900 dark:text-white font-bold text-xs md:text-sm">
              Hi, {user.name}!
            </span>

            <button
              onClick={logout}
              className="whitespace-nowrap px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/Login">
              <button className="whitespace-nowrap px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm">
                Login
              </button>
            </Link>
            <Link to="/Signup">
              <button className="whitespace-nowrap px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm">
                Signup
              </button>
            </Link>
          </>
        )}

        {/* Theme toggle - always visible regardless of login state */}
        <button
          onClick={toggleTheme}
          className="text-xl px-2"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Cart visible only on desktop here (mobile has it up top) */}
        <Link to="/cart" className="hidden md:block">
          <button className="relative whitespace-nowrap bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition text-sm">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;