import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // logout action, when we click logout, it will logout and navigate to home
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // navbar template from DaisyUI
    <div className="navbar bg-base-300 shadow-sm">
      {/* dropdown for responsive screen */}
      <div className="navbar-start">
        <div className="dropdown z-50">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tv">TV Shows</Link></li>
            <li><Link to="/people">People</Link></li>
            {isAuthenticated && (
              <li><Link to="/favorites-watchlist">Favorites/Watchlist</Link></li>
            )}
          </ul>
        </div>
        <Link
          to="/"
          className="text-2xl font-extrabold ml-10"
          style={{ color: "#605DFF" }}
        >
          Movie Explorer
        </Link>
      </div>
      {/* navbar for desktop */}
      <div className="navbar-mid hidden lg:flex">
        <ul className="menu menu-horizontal px-1 whitespace-nowrap flex-nowrap">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/tv">TV Shows</Link></li>
          <li><Link to="/people">People</Link></li>
          {isAuthenticated && (
            <li><Link to="/favorites-watchlist">Favorites/Watchlist</Link></li>
          )}
        </ul>
      </div>
      
      {/* Authentication section */}
      <div className="navbar-end">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <div className="text-white font-semibold leading-none flex items-center justify-center w-full h-full">
                  {user?.username?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{user?.username || user?.name || 'User'}</span>
              </li>
              <li><Link to="/favorites-watchlist">My Lists</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
