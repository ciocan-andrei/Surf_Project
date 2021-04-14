import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useGlobalContext } from "./context";

const Navbar = () => {
  const { openSidebar } = useGlobalContext();

  let loggedUser = null;
  if (localStorage.getItem("user")) {
    loggedUser = JSON.parse(localStorage.getItem("user"));
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <h2 style={{ userSelect: "none" }}>KITE</h2>
          <div className="toggle-sidemenu" onClick={openSidebar}>
            <IoMenu className="home-btn" />
          </div>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
        </ul>
        {loggedUser ? (
          <form action="">
            <button onClick={handleLogout} className="nav-btn">
              LOGOUT
            </button>
          </form>
        ) : (
          <Link to="/login" className="nav-btn">
            LOG IN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
