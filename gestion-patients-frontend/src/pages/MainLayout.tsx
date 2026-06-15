import SideBar, { SidebarItem } from "./SideBar";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarDays,
  CalendarPlus,
  Stethoscope,
  BarChart3,
  Settings,
} from "lucide-react";

export default function MainLayout({ children }: any) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* SIDEBAR */}
      <SideBar>

        {/* DASHBOARD */}
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          to="/dashboard"
        />

        {/* PATIENTS */}
        <SidebarItem
          icon={<Users size={20} />}
          text="Patients"
          to="/patients"
        />

        <SidebarItem
          icon={<UserPlus size={20} />}
          text="Ajouter Patient"
          to="/add-patient"
        />

        {/* RENDEZ-VOUS */}
        <SidebarItem
          icon={<CalendarDays size={20} />}
          text="Rendez-vous"
          to="/appointments"
        />

        <SidebarItem
          icon={<CalendarPlus size={20} />}
          text="Nouveau RDV"
          to="/add-appointment"
        />

        {/* CONSULTATIONS */}
        <SidebarItem
          icon={<Stethoscope size={20} />}
          text="Consultations"
          to="/consultations"
        />

        <SidebarItem
          icon={<CalendarPlus size={20} />}
          text="Nouvelle Consultation"
          to="/add-consultation"
        />

        {/* AUTRES */}
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Rapports"
          to="/reports"
        />

        <SidebarItem
          icon={<Settings size={20} />}
          text="Paramètres"
          to="/settings"
        />

      </SideBar>

      {/* CONTENU */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}