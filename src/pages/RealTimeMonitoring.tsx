
import { useState } from 'react';
import { Monitor, Users, Clock, Building } from 'lucide-react';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';
import ClassroomCard from '../components/molecules/ClassroomCard';

const RealTimeMonitoring = () => {
  const [filter, setFilter] = useState('all');

  const classrooms = [
    { 
      id: '1', 
      name: 'Aula A-101', 
      capacity: 30, 
      floor: 'Piso 1', 
      type: 'Teórica', 
      available: false,
      currentOccupancy: 28,
      currentClass: 'Programación Web',
      endTime: '12:00'
    },
    { 
      id: '2', 
      name: 'Lab B-205', 
      capacity: 25, 
      floor: 'Piso 2', 
      type: 'Laboratorio', 
      available: true,
      currentOccupancy: 0,
      nextClass: 'Base de Datos',
      nextTime: '14:00'
    },
    { 
      id: '3', 
      name: 'Aula C-301', 
      capacity: 40, 
      floor: 'Piso 3', 
      type: 'Magistral', 
      available: false,
      currentOccupancy: 35,
      currentClass: 'Matemáticas',
      endTime: '11:30'
    },
    { 
      id: '4', 
      name: 'Lab D-102', 
      capacity: 20, 
      floor: 'Piso 1', 
      type: 'Informática', 
      available: true,
      currentOccupancy: 0,
      lastActivity: '2 horas'
    },
    { 
      id: '5', 
      name: 'Aula E-204', 
      capacity: 35, 
      floor: 'Piso 2', 
      type: 'Teórica', 
      available: false,
      currentOccupancy: 32,
      currentClass: 'Historia',
      endTime: '13:00'
    },
    { 
      id: '6', 
      name: 'Auditorio F-001', 
      capacity: 100, 
      floor: 'Planta baja', 
      type: 'Auditorio', 
      available: true,
      currentOccupancy: 0,
      lastActivity: '5 horas'
    }
  ];

  const filteredClassrooms = classrooms.filter(classroom => {
    if (filter === 'occupied') return !classroom.available;
    if (filter === 'available') return classroom.available;
    return true;
  });

  const stats = {
    total: classrooms.length,
    occupied: classrooms.filter(c => !c.available).length,
    available: classrooms.filter(c => c.available).length,
    occupancyRate: Math.round((classrooms.filter(c => !c.available).length / classrooms.length) * 100)
  };

  return (
    <Layout title="Monitoreo en Tiempo Real">
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de aulas</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ocupadas</p>
                <p className="text-xl font-bold">{stats.occupied}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-xl font-bold">{stats.available}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">% Ocupación</p>
                <p className="text-xl font-bold">{stats.occupancyRate}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Filtrar por estado</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas las aulas
            </button>
            <button
              onClick={() => setFilter('occupied')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'occupied' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ocupadas
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'available' 
                  ? 'bg-secondary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Disponibles
            </button>
          </div>
        </Card>

        {/* Estado de aulas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Estado actual de las aulas ({filteredClassrooms.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClassrooms.map((classroom) => (
              <Card key={classroom.id} className="relative">
                {/* Indicador de estado */}
                <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${
                  classroom.available ? 'bg-secondary' : 'bg-red-500'
                }`} />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{classroom.name}</h3>
                    <p className="text-sm text-gray-600">{classroom.floor} • {classroom.type}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Capacidad:</span>
                      <span>{classroom.capacity} personas</span>
                    </div>
                    
                    {!classroom.available ? (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span>Ocupación actual:</span>
                          <span className="font-medium text-red-600">
                            {classroom.currentOccupancy}/{classroom.capacity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Clase actual:</span>
                          <span className="font-medium">{classroom.currentClass}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Termina a las:</span>
                          <span>{classroom.endTime}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-green-600 font-medium">
                          ✓ Aula disponible
                        </div>
                        {classroom.nextClass && (
                          <div className="text-sm text-gray-600">
                            Próxima clase: {classroom.nextClass} a las {classroom.nextTime}
                          </div>
                        )}
                        {classroom.lastActivity && (
                          <div className="text-sm text-gray-500">
                            Sin actividad desde hace {classroom.lastActivity}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Barra de ocupación */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Ocupación</span>
                      <span>{Math.round((classroom.currentOccupancy / classroom.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          classroom.available ? 'bg-gray-300' : 'bg-gradient-to-r from-primary to-red-500'
                        }`}
                        style={{ width: `${(classroom.currentOccupancy / classroom.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RealTimeMonitoring;
