import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* dropdown for responsive screen */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tv">TV Shows</Link></li>
            <li><Link to="/people">People</Link></li>
            <li><Link to="/favorites">Favorite/Watchlist</Link></li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl font-extrabold"
          style={{ color: "#605DFF" }}
        >
          Movie Explorer
        </Link>
      </div>
      {/* navbar for desktop */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/tv">TV Shows</Link></li>
          <li><Link to="/people">People</Link></li>
          <li><Link to="/favorites">Favorite/Watchlist</Link></li>
        </ul>
      </div>
    </div>
  );
}
