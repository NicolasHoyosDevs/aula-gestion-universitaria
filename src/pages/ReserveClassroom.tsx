
import { useState } from 'react';
import { Search, Filter, Calendar, Clock, Building } from 'lucide-react';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import ClassroomCard from '../components/molecules/ClassroomCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const ReserveClassroom = () => {
  const [filters, setFilters] = useState({
    date: '',
    time: '',
    block: '',
    type: '',
    floor: ''
  });
  const [selectedClassroom, setSelectedClassroom] = useState<any>(null);

  const classrooms = [
    { id: '1', name: 'Aula A-101', capacity: 30, floor: 'Piso 1', type: 'Teórica', available: true },
    { id: '2', name: 'Lab B-205', capacity: 25, floor: 'Piso 2', type: 'Laboratorio', available: true },
    { id: '3', name: 'Aula C-301', capacity: 40, floor: 'Piso 3', type: 'Magistral', available: true },
    { id: '4', name: 'Lab D-102', capacity: 20, floor: 'Piso 1', type: 'Informática', available: false },
    { id: '5', name: 'Aula E-204', capacity: 35, floor: 'Piso 2', type: 'Teórica', available: true },
    { id: '6', name: 'Auditorio F-001', capacity: 100, floor: 'Planta baja', type: 'Auditorio', available: true }
  ];

  const handleReserve = () => {
    toast({
      title: "¡Reserva exitosa!",
      description: `Has reservado ${selectedClassroom?.name} correctamente.`
    });
    setSelectedClassroom(null);
  };

  return (
    <Layout title="Reservar Aula">
      <div className="space-y-6">
        {/* Filtros */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtros de búsqueda</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              label="Fecha"
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({...filters, date: e.target.value})}
            />
            
            <Input
              label="Hora"
              type="time"
              value={filters.time}
              onChange={(e) => setFilters({...filters, time: e.target.value})}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bloque</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.block}
                onChange={(e) => setFilters({...filters, block: e.target.value})}
              >
                <option value="">Todos</option>
                <option value="A">Bloque A</option>
                <option value="B">Bloque B</option>
                <option value="C">Bloque C</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de aula</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">Todos</option>
                <option value="Teórica">Teórica</option>
                <option value="Laboratorio">Laboratorio</option>
                <option value="Informática">Informática</option>
                <option value="Auditorio">Auditorio</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Piso</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.floor}
                onChange={(e) => setFilters({...filters, floor: e.target.value})}
              >
                <option value="">Todos</option>
                <option value="Planta baja">Planta baja</option>
                <option value="Piso 1">Piso 1</option>
                <option value="Piso 2">Piso 2</option>
                <option value="Piso 3">Piso 3</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button>Aplicar filtros</Button>
            <Button variant="outline" onClick={() => setFilters({date: '', time: '', block: '', type: '', floor: ''})}>
              Limpiar
            </Button>
          </div>
        </Card>

        {/* Resultados */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Aulas disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                {...classroom}
                onClick={() => setSelectedClassroom(classroom)}
              />
            ))}
          </div>
        </div>

        {/* Modal de detalles */}
        <Dialog open={!!selectedClassroom} onOpenChange={() => setSelectedClassroom(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Detalles del aula</DialogTitle>
            </DialogHeader>
            
            {selectedClassroom && (
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <Building className="w-16 h-16 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedClassroom.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Capacidad:</strong> {selectedClassroom.capacity} personas</p>
                    <p><strong>Ubicación:</strong> {selectedClassroom.floor}</p>
                    <p><strong>Tipo:</strong> {selectedClassroom.type}</p>
                    <p><strong>Equipamiento:</strong> Proyector, sonido, aire acondicionado</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                      <input 
                        type="time" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <Input
                    label="Asunto/Materia"
                    placeholder="Ej: Programación Web"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleReserve} className="flex-1">
                    Reservar
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedClassroom(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ReserveClassroom;
