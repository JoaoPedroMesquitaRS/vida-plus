// components/Sidebar.jsx
import { Calendar, Users, LogOutIcon, ListOrdered, CircleDollarSign, ListCheck, User, Hospital, Search, ClipboardPlus, GraduationCap, CircleCheck, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = "/login";  
};

const Sidebar = () => {

  const { pathname } = useLocation();

  const menu = [
    { to: '/buscar-pacientes', label: 'Pacientes', icon: <Users size={20} /> },
    // { to: '/buscar-pacientes', label: 'Iniciar Atendimento', icon: <CircleCheck size={20} /> },
    { to: '/exames', label: 'Exames', icon: <ClipboardPlus size={20} /> },
    { to: '/local-atendimento', label: 'Locais de Atendimento', icon: <Hospital size={20} /> },
    { to: '/profissional', label: 'Profissionais', icon: <GraduationCap size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 shadow-lg fixed left-0 top-0 flex flex-col">
      <div>
        <h2 className="text-2xl font-bold mb-8">VidaPlus</h2>
        <nav className="space-y-3">
          {menu.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors ${
                pathname === to ? 'bg-gray-700' : ''
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded hover:bg-red-600 transition-colors text-red-400 hover:text-white"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>

        </nav>
      </div>

    </div>
  );
};

export default Sidebar;