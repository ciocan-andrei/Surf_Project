import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {
    isSidebarOpen,
    closeSidebar,
    loggedUser,
    userSignedOut,
  } = useGlobalContext();

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
              <Link to="/about">About</Link>
            </li>
          </ul>
          {loggedUser ? (
            <form action="">
              <button onClick={userSignedOut} className="sidebar-btn">
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
