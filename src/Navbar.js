import { Link } from "react-router-dom";
import { useFetch } from "./custom-hooks/useFetch";

const usersUrl = "https://606216fdac47190017a7267c.mockapi.io/user";

const Navbar = () => {
  let loggedUser = null;
  if (localStorage.getItem("user")) {
    loggedUser = JSON.parse(localStorage.getItem("user"));
  }

  const handleLogout = (e) => {
    // e.preventDefault();
    localStorage.removeItem("user");
  };

  return (
    <nav>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          {loggedUser ? (
            <div>
              <p>Hello, {loggedUser.name}</p>
              <form action="">
                <button onClick={handleLogout}>LOGOUT</button>
              </form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
