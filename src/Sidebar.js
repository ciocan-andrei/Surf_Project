import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {
    isSidebarOpen,
    closeSidebar,
    // loggedUser,
    // handleLogout,
  } = useGlobalContext();

  let loggedUser = null;
  if (localStorage.getItem("user")) {
    loggedUser = JSON.parse(localStorage.getItem("user"));
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      <aside className="sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          <IoClose />
        </button>
        <div className="sidebar-items">
          <ul className="sidebar-menu">
            <li className="" onClick={closeSidebar}>
              <Link to="/">Home</Link>
            </li>
            <li className="sidebar-menu" onClick={closeSidebar}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="sidebar-menu" onClick={closeSidebar}>
              <Link to="#">About</Link>
            </li>
          </ul>
          {loggedUser ? (
            <form action="">
              <button onClick={handleLogout} className="sidebar-btn">
                LOGOUT
              </button>
            </form>
          ) : (
            <div style={{ marginTop: "3rem" }}>
              <Link to="/login" className="sidebar-btn" onClick={closeSidebar}>
                SIGN IN
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
