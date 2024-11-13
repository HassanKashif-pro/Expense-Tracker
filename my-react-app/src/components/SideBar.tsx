import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  MouseEventHandler,
} from "react";
import "../styles/Sidebar.css";
import { Link, useLocation } from "react-router-dom";

// Define types for context and props
interface SidebarContextProps {
  expanded: boolean;
  activeItem: string;
  setActiveItem: (name: string) => void;
}

interface SidebarProps {
  children: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  link?: string;
  onClick: () => void;
}

// Create the Sidebar context to share expanded state
const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  return (
    <aside className={`sidebar ${expanded ? "" : "sidebar--collapsed"}`}>
      <nav className="sidebar__nav">
        <div className="sidebar__header">
          <img
            src="../public/nav-logo.png"
            className={`sidebar__logo ${
              expanded ? "sidebar__logo--expanded" : ""
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="sidebar__toggle-button"
            aria-label="Toggle Sidebar"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar context to control expansion */}
        <SidebarContext.Provider
          value={{ expanded, activeItem, setActiveItem }}
        >
          <ul className="sidebar__menu">{children}</ul>
        </SidebarContext.Provider>

        {/* Footer with user information */}
        <div className="sidebar__footer">
          <img
            src="../public/bot.ico"
            alt="User Avatar"
            className="sidebar__avatar"
          />
          <div
            className={`sidebar__user-info ${
              expanded ? "sidebar__user-info--expanded" : ""
            }`}
          >
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

export function SidebarItem({ icon, text, alert, link }: any) {
  const { expanded }: any = useContext(SidebarContext);
  const location = useLocation(); // Get the current route path

  const isActive = location.pathname === link; // Check if the item is active

  return (
    <li
      className={`sidebar__item ${isActive ? "sidebar__item--active" : ""} ${
        alert ? "sidebar__item--alert" : ""
      }`}
    >
      <Link to={link} className="sidebar__link">
        <div className="sidebar__item-content">
          {icon}
          <span
            className={`sidebar__item-text ${
              expanded ? "sidebar__item-text--expanded" : ""
            }`}
          >
            {text}
          </span>
        </div>
        {alert && (
          <div
            className={`sidebar__alert-dot ${
              expanded ? "" : "sidebar__alert-dot--collapsed"
            }`}
          />
        )}
        {!expanded && <div className="sidebar__tooltip">{text}</div>}
      </Link>
    </li>
  );
}
