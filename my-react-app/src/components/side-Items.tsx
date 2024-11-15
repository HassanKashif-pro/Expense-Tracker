import React from "react";
import { SidebarItem } from "@/components/SideBar";
import Sidebar from "@/components/SideBar";
import { Outlet } from "react-router-dom";
import {
  BarChart3,
  Clock,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { type: "divider" },
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", link: "/home" },
  { icon: <BarChart3 size={20} />, text: "Statistics", link: "/stats" },
  { icon: <Clock size={20} />, text: "History", link: "/history" },
  { icon: <Receipt size={20} />, text: "Expense", link: "/expense" },
  { type: "divider" },
  { icon: <Settings size={20} />, text: "Settings", link: "/settings" },
  { icon: <LifeBuoy size={20} />, text: "Help", link: "/help" },
];

export default function IloveBalls() {
  return (
    <main className="App">
      <Sidebar>
        {sidebarItems.map((item, index) => {
          if (item.type === "divider") {
            return <hr key={index} className="my-3" />;
          }
          return (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              link={item.link}
            />
          );
        })}
      </Sidebar>
      <div className="content">
        <Outlet /> {/* This will render the current route's component */}
      </div>
    </main>
  );
}
