
import { useState } from 'react';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';

const MyReservations = () => {
  const [filter, setFilter] = useState('all');

  const reservations = [
    {
      id: '1',
      classroom: 'Aula A-101',
      date: '2024-11-15',
      time: '10:00 - 12:00',
      subject: 'Programación Web',
      status: 'active'
    },
    {
      id: '2',
      classroom: 'Lab B-205',
      date: '2024-11-16',
      time: '14:00 - 16:00',
      subject: 'Base de Datos',
      status: 'active'
    },
    {
      id: '3',
      classroom: 'Aula C-301',
      date: '2024-11-10',
      time: '08:00 - 10:00',
      subject: 'Algoritmos',
      status: 'completed'
    },
    {
      id: '4',
      classroom: 'Auditorio F-001',
      date: '2024-11-05',
      time: '16:00 - 18:00',
      subject: 'Conferencia',
      status: 'cancelled'
    }
  ];

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'active') return reservation.status === 'active';
    if (filter === 'completed') return reservation.status === 'completed';
    if (filter === 'cancelled') return reservation.status === 'cancelled';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary text-white';
      case 'completed': return 'bg-gray-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <Layout title="Mis Reservas">
      <div className="space-y-6">
        {/* Filtros */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtrar por estado</h2>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button
              variant={filter === 'active' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Activas
            </Button>
            <Button
              variant={filter === 'completed' ? 'outline' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completadas
            </Button>
            <Button
              variant={filter === 'cancelled' ? 'outline' : 'outline'}
              size="sm"
              onClick={() => setFilter('cancelled')}
            >
              Canceladas
            </Button>
          </div>
        </Card>

        {/* Lista de reservas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Historial de reservas ({filteredReservations.length})
          </h2>
          
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <Card key={reservation.id}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {reservation.classroom}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(reservation.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{reservation.subject}</span>
                      </div>
                    </div>
                  </div>
                  
                  {reservation.status === 'active' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modificar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          {filteredReservations.length === 0 && (
            <Card>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay reservas
                </h3>
                <p className="text-gray-600">
                  No tienes reservas {filter !== 'all' ? getStatusText(filter).toLowerCase() : ''} en este momento.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyReservations;
