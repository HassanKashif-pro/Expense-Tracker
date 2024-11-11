import { SidebarItem } from "@/components/SideBar";
import Sidebar from "@/components/SideBar";
import {
  BarChart3,
  Clock,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Settings,
} from "lucide-react";

export default function App() {
  return (
    <main className="App">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={undefined}
          link="/home"
          alert={undefined}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Statistics"
          active
          link="/statistics"
          alert={undefined}
        />

        <SidebarItem
          icon={<Clock size={20} />}
          text="History"
          active={undefined}
          link="/history"
          alert={undefined}
        />
        <SidebarItem
          icon={<Receipt size={20} />}
          text="Expense"
          active={undefined}
          link="/expense"
          alert={undefined}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={undefined}
          link="/settings"
          alert={undefined}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          active={undefined}
          link="/help"
          alert={undefined}
        />
      </Sidebar>
    </main>
  );
}
