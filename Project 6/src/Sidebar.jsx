import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2> Menu </h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li>
          <Link to="/search">🔍 Search</Link>
        </li>
        <li>
          <Link to="/about">ℹ️ About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;