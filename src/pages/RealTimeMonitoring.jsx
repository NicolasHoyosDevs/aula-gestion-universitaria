
import Layout from '../components/organisms/Layout';
import ClassroomCard from '../components/molecules/ClassroomCard';
import { Monitor } from 'lucide-react';

const RealTimeMonitoring = () => {
  const classrooms = [
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
      available: false
    },
    {
      id: '3',
      name: 'Sala de Conferencias',
      capacity: 50,
      floor: 'Piso 3',
      type: 'Conferencias',
      available: true
    },
    {
      id: '4',
      name: 'Aula 205',
      capacity: 35,
      floor: 'Piso 2',
      type: 'Teórica',
      available: false
    },
  ];

  const availableCount = classrooms.filter(room => room.available).length;
  const occupiedCount = classrooms.length - availableCount;

  return (
    <Layout title="Monitoreo en Tiempo Real">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{availableCount}</p>
                <p className="text-sm text-gray-600">Aulas Libres</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{occupiedCount}</p>
                <p className="text-sm text-gray-600">Aulas Ocupadas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3">
              <Monitor className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{classrooms.length}</p>
                <p className="text-sm text-gray-600">Total Aulas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Classroom Status */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Estado de las Aulas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                {...classroom}
                onClick={() => console.log('Viewing classroom details:', classroom)}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h4 className="font-semibold mb-3">Leyenda</h4>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-sm">Libre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Ocupado</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RealTimeMonitoring;
