import { MoreVertical } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import "../styles/Sidebar.css";
import { Link, useLocation } from "react-router-dom";

// Define types for context and props
interface SidebarContextProps {
  activeItem: string;
  setActiveItem: (name: string) => void;
}

interface SidebarProps {
  children: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  alert?: boolean;
  link?: string;
}

// Create the Sidebar context to share active item state
const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export default function Sidebar({ children }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("");

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <div className="sidebar__header">
          <img
            src="../public/nav-logo.png"
            className="sidebar__logo"
            alt="Logo"
          />
        </div>

        {/* Sidebar context to control active item */}
        <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
          <ul className="sidebar__menu">{children}</ul>
        </SidebarContext.Provider>

        {/* Footer with user information */}
        <div className="sidebar__footer">
          <img
            src="../public/bot.ico"
            alt="User Avatar"
            className="sidebar__avatar"
          />
          <div className="sidebar__user-info">
            <div className="sidebar__user-text">
              <h4 className="sidebar__user-name">John Doe</h4>
              <span className="sidebar__user-email">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} className="sidebar__more-icon" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, link }: SidebarItemProps) {
  const { activeItem, setActiveItem } = useContext(SidebarContext) || {};
  const location = useLocation(); // Get the current route path

  const isActive = location.pathname === link; // Check if the item is active

  const handleItemClick = () => {
    setActiveItem && setActiveItem(text);
  };

  return (
    <li
      className={`sidebar__item ${isActive ? "sidebar__item--active" : ""} ${
        alert ? "sidebar__item--alert" : ""
      }`}
    >
      <Link to={link} className="sidebar__link" onClick={handleItemClick}>
        <div className="sidebar__item-content">
          {icon}
          <span className="sidebar__item-text">{text}</span>
        </div>
        {alert && <div className="sidebar__alert-dot" />}
      </Link>
    </li>
  );
}
