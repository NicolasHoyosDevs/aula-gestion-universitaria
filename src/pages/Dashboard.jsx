
import { Calendar, Search, Clock, Bell } from 'lucide-react';
import Layout from '../components/organisms/Layout';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import ClassroomCard from '../components/molecules/ClassroomCard';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    { icon: Search, label: 'Buscar aulas', path: '/reserve' },
    { icon: Calendar, label: 'Nueva reserva', path: '/reserve' },
    { icon: Clock, label: 'Ver reservas', path: '/my-reservations' },
  ];

  const upcomingReservations = [
    { id: 1, classroom: 'Aula 101', date: '2024-01-15', time: '10:00 AM' },
    { id: 2, classroom: 'Laboratorio A', date: '2024-01-16', time: '2:00 PM' },
  ];

  const recommendedClassrooms = [
    {
      id: '1',
      name: 'Aula 101',
      capacity: 30,
      floor: 'Piso 1',
      type: 'Teórica',
      available: true
    },
    {
      id: '2',
      name: 'Laboratorio A',
      capacity: 25,
      floor: 'Piso 2',
      type: 'Laboratorio',
      available: true
    }
  ];

  const notifications = [
    { id: 1, message: 'Tu reserva para mañana a las 10:00 AM ha sido confirmada' },
    { id: 2, message: 'Nueva aula disponible: Sala de conferencias' },
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Hola, {user?.name}</h2>
          <p className="text-white/90">Bienvenido al sistema de gestión de aulas</p>
        </div>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="flex items-center gap-2 p-4 h-auto"
              >
                <action.icon className="w-5 h-5" />
                {action.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Upcoming Reservations */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Próximas Reservas</h3>
          <div className="space-y-3">
            {upcomingReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{reservation.classroom}</p>
                  <p className="text-sm text-gray-600">{reservation.date} - {reservation.time}</p>
                </div>
                <Clock className="w-5 h-5 text-primary" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Classrooms */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Aulas Recomendadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedClassrooms.map((classroom) => (
              <ClassroomCard key={classroom.id} {...classroom} />
            ))}
          </div>
        </div>

        {/* No Movement Button */}
        <div className="text-center">
          <Button variant="secondary" size="lg">
            Ver aulas sin movimiento
          </Button>
        </div>

        {/* Notifications */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Últimas Notificaciones</h3>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
