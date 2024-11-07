import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import "../styles/Sidebar.css";

// Define types for context and props
interface SidebarContextProps {
  expanded: boolean;
}

interface SidebarProps {
  children: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

// Create the Sidebar context to share expanded state
const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <div className="sidebar__header">
          <img
            src="https://img.logoipsum.com/243.svg"
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

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sidebar__menu">{children}</ul>
        </SidebarContext.Provider>

        <div className="sidebar__footer">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
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

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("SidebarItem must be used within a Sidebar");

  const { expanded } = context;

  return (
    <li
      className={`sidebar__item ${active ? "sidebar__item--active" : ""} ${
        alert ? "sidebar__item--alert" : ""
      }`}
    >
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
    </li>
  );
}
