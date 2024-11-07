import { SidebarItem } from "@/components/Nav-bar";
import Sidebar from "@/components/Nav-bar";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";

export default function App() {
  return (
    <main className="App">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={undefined}
          alert={undefined}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Statistics"
          active
          alert={undefined}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Users"
          active={undefined}
          alert={undefined}
        />
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Inventory"
          active={undefined}
          alert={undefined}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Orders"
          alert
          active={undefined}
        />
        <SidebarItem
          icon={<Receipt size={20} />}
          text="Billings"
          active={undefined}
          alert={undefined}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={undefined}
          alert={undefined}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          active={undefined}
          alert={undefined}
        />
      </Sidebar>
    </main>
  );
}
