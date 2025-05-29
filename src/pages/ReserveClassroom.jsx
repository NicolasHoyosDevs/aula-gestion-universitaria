
import { useState } from 'react';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import ClassroomCard from '../components/molecules/ClassroomCard';
import { Filter } from 'lucide-react';

const ReserveClassroom = () => {
  const [filters, setFilters] = useState({
    date: '',
    time: '',
    block: '',
    type: '',
    floor: ''
  });

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
      available: true
    },
    {
      id: '3',
      name: 'Sala de Conferencias',
      capacity: 50,
      floor: 'Piso 3',
      type: 'Conferencias',
      available: false
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters);
  };

  const handleClassroomClick = (classroom) => {
    console.log('Classroom selected:', classroom);
  };

  return (
    <Layout title="Reservar Aula">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Filtros de Búsqueda</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Input
              label="Fecha"
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            />
            <Input
              label="Hora"
              type="time"
              value={filters.time}
              onChange={(e) => handleFilterChange('time', e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bloque
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.block}
                onChange={(e) => handleFilterChange('block', e.target.value)}
              >
                <option value="">Seleccionar bloque</option>
                <option value="A">Bloque A</option>
                <option value="B">Bloque B</option>
                <option value="C">Bloque C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Aula
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">Seleccionar tipo</option>
                <option value="Teórica">Teórica</option>
                <option value="Laboratorio">Laboratorio</option>
                <option value="Conferencias">Conferencias</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Piso
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.floor}
                onChange={(e) => handleFilterChange('floor', e.target.value)}
              >
                <option value="">Seleccionar piso</option>
                <option value="Piso 1">Piso 1</option>
                <option value="Piso 2">Piso 2</option>
                <option value="Piso 3">Piso 3</option>
              </select>
            </div>
          </div>
          
          <Button onClick={applyFilters}>
            Aplicar Filtros
          </Button>
        </Card>

        {/* Available Classrooms */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Aulas Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                {...classroom}
                onClick={() => handleClassroomClick(classroom)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReserveClassroom;
