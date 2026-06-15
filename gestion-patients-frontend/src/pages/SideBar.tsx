import {
    MoreVertical,
    ChevronLast,
    ChevronFirst,
  } from "lucide-react";
  
  import { useContext, createContext, useState } from "react";
  import { Link } from "react-router-dom";
  
  const SidebarContext = createContext({
    expanded: true,
  });
  
  export default function Sidebar({ children }: any) {
    const [expanded, setExpanded] = useState(true);
  
    return (
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
  
          {/* LOGO */}
          <div className="p-4 pb-2 flex justify-between items-center">
  
            <div
              className={`overflow-hidden transition-all ${
                expanded ? "w-44" : "w-0"
              }`}
            >
              <h1 className="text-xl font-bold text-blue-700">
                MediCare
              </h1>
  
              <p className="text-xs text-gray-500">
                Gestion des Patients
              </p>
            </div>
  
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
  
          </div>
  
          {/* MENU */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              {children}
            </ul>
          </SidebarContext.Provider>
  
          {/* FOOTER */}
          <div className="border-t flex p-3">
  
            <img
              src="https://ui-avatars.com/api/?background=dbeafe&color=1d4ed8&name=A"
              alt=""
              className="w-10 h-10 rounded-md"
            />
  
            <div
              className={`
                flex justify-between items-center
                overflow-hidden transition-all
                ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">
                  Administrateur
                </h4>
  
                <span className="text-xs text-gray-600">
                  admin@gmail.com
                </span>
              </div>
  
              <MoreVertical size={20} />
            </div>
  
          </div>
  
        </nav>
      </aside>
    );
  }
  
  export function SidebarItem({
    icon,
    text,
    active,
    alert,
    to,
  }: any) {
    const { expanded } = useContext(SidebarContext);
  
    return (
      <Link to={to}>
        <li
          className={`
            relative flex items-center py-3 px-3 my-1
            font-medium rounded-xl cursor-pointer
            transition-all group
            ${
              active
                ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700"
                : "hover:bg-blue-50 text-gray-600"
            }
          `}
        >
  
          {icon}
  
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
  
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-blue-500 ${
                expanded ? "" : "top-2"
              }`}
            />
          )}
  
          {!expanded && (
            <div
              className="
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-blue-100 text-blue-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100
                group-hover:translate-x-0
              "
            >
              {text}
            </div>
          )}
  
        </li>
      </Link>
    );
  }