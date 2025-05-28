
import { Calendar, Search, Plus, BookOpen, Bell, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import ClassroomCard from '../components/molecules/ClassroomCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    { icon: Search, label: 'Buscar aulas', path: '/reserve', color: 'from-blue-500 to-blue-600' },
    { icon: Plus, label: 'Nueva reserva', path: '/reserve', color: 'from-primary to-primary-dark' },
    { icon: BookOpen, label: 'Ver reservas', path: '/my-reservations', color: 'from-secondary to-secondary-dark' }
  ];

  const upcomingReservations = [
    { id: '1', classroom: 'Aula A-101', date: 'Hoy', time: '10:00 - 12:00', subject: 'Programación Web' },
    { id: '2', classroom: 'Lab B-205', date: 'Mañana', time: '14:00 - 16:00', subject: 'Base de Datos' },
    { id: '3', classroom: 'Aula C-301', date: '15 Nov', time: '08:00 - 10:00', subject: 'Algoritmos' }
  ];

  const recommendedClassrooms = [
    { id: '1', name: 'Aula A-101', capacity: 30, floor: 'Piso 1', type: 'Teórica', available: true },
    { id: '2', name: 'Lab B-205', capacity: 25, floor: 'Piso 2', type: 'Laboratorio', available: true },
    { id: '3', name: 'Aula C-301', capacity: 40, floor: 'Piso 3', type: 'Magistral', available: false }
  ];

  const notifications = [
    { id: '1', message: 'Tu reserva para el Aula A-101 ha sido confirmada', time: '5 min ago' },
    { id: '2', message: 'Recordatorio: Clase en Lab B-205 en 30 minutos', time: '30 min ago' }
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Saludo personalizado */}
        <div className="university-gradient rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">¡Hola, {user?.name}! 👋</h1>
          <p className="opacity-90">Bienvenido al sistema de gestión de aulas universitarias</p>
        </div>

        {/* Acciones rápidas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.path} to={action.path}>
                <Card hoverable className="text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-gray-900">{action.label}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Próximas reservas */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Próximas reservas</h2>
              <Link to="/my-reservations">
                <Button variant="ghost" size="sm">Ver todas</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingReservations.map((reservation) => (
                <Card key={reservation.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{reservation.classroom}</h3>
                      <p className="text-sm text-gray-600">{reservation.subject}</p>
                      <p className="text-xs text-gray-500">{reservation.date} • {reservation.time}</p>
                    </div>
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Notificaciones */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Últimas notificaciones</h2>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id}>
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Aulas recomendadas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Aulas recomendadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedClassrooms.map((classroom) => (
              <ClassroomCard key={classroom.id} {...classroom} />
            ))}
          </div>
        </div>

        {/* Botón de aulas sin movimiento */}
        <div className="text-center">
          <Link to="/monitoring">
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Ver aulas sin movimiento
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
