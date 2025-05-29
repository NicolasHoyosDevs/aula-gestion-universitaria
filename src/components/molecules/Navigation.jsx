
import { useState } from 'react';
import { Menu, X, User, Calendar, Monitor, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const menuItems = [
    { icon: User, label: 'Ver perfil', path: '/profile' },
    { icon: Calendar, label: 'Reservar aula', path: '/reserve' },
    { icon: Calendar, label: 'Mis reservas', path: '/my-reservations' },
    { icon: Monitor, label: 'Monitoreo en tiempo real', path: '/monitoring' },
  ];

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setIsOpen(true)}
        className="p-2"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Menú</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white">
            <h3 className="font-semibold">{user?.name}</h3>
            <p className="text-sm opacity-90">{user?.role}</p>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
