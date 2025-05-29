
import { useState } from 'react';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MyReservations = () => {
  const [filter, setFilter] = useState('active');

  const reservations = [
    {
      id: 1,
      classroom: 'Aula 101',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      status: 'active',
      floor: 'Piso 1'
    },
    {
      id: 2,
      classroom: 'Laboratorio A',
      date: '2024-01-10',
      time: '2:00 PM - 4:00 PM',
      status: 'completed',
      floor: 'Piso 2'
    },
    {
      id: 3,
      classroom: 'Sala de Conferencias',
      date: '2024-01-08',
      time: '9:00 AM - 11:00 AM',
      status: 'cancelled',
      floor: 'Piso 3'
    },
  ];

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'active') return reservation.status === 'active';
    if (filter === 'cancelled') return reservation.status === 'cancelled';
    if (filter === 'completed') return reservation.status === 'completed';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-secondary text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  return (
    <Layout title="Mis Reservas">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Filtrar Reservas</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'active' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Activas
            </Button>
            <Button
              variant={filter === 'cancelled' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('cancelled')}
            >
              Canceladas
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completadas
            </Button>
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
          </div>
        </Card>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{reservation.classroom}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{reservation.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{reservation.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{reservation.floor}</span>
                    </div>
                  </div>
                </div>
                
                {reservation.status === 'active' && (
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">No hay reservas que coincidan con el filtro seleccionado.</p>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyReservations;
