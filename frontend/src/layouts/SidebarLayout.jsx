/* eslint-disable react/prop-types */
import { NavLink, Outlet } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function SidebarLayout() {
  return (
    <div className="flex min-h-screen bg-bleu">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-bleu mb-10">Recrutement</h2>
          <nav className="space-y-4">
            <NavItem to="/dashboard" icon={<FiHome />}>Dashboard</NavItem>
            <NavItem to="/profile" icon={<FiUser />}>Profil</NavItem>
            <NavItem to="/settings" icon={<FiSettings />}>Paramètres</NavItem>
          </nav>
        </div>

        {/* Déconnexion */}
        <div className="mt-auto">
          <NavItem 
            to="#" 
            icon={<FiLogOut />} 
            additionalClasses="bg-indigo-100 hover:bg-red-100 hover:text-red-800"
          >
            Déconnexion
          </NavItem>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, icon, children, additionalClasses = "" }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg transition-colors ${
          isActive ? "bg-indigo-100 text-bleu font-semibold" : "text-gray-700 hover:bg-gray-100"
        } ${additionalClasses}`
      }
    >
      <span className="mr-3 text-lg">{icon}</span>
      {children}
    </NavLink>
  );
}
