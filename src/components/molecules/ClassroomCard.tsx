
import { Building, Users, MapPin } from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

interface ClassroomCardProps {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  type: string;
  available?: boolean;
  image?: string;
  onClick?: () => void;
}

const ClassroomCard = ({ 
  name, 
  capacity, 
  floor, 
  type, 
  available = true,
  image,
  onClick 
}: ClassroomCardProps) => {
  return (
    <Card hoverable onClick={onClick} className="overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <Building className="w-12 h-12 text-primary" />
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity} personas</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{floor}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{type}</span>
          <div className={`w-3 h-3 rounded-full ${available ? 'bg-secondary' : 'bg-red-500'}`} />
        </div>
        
        {onClick && (
          <Button 
            variant={available ? 'primary' : 'outline'} 
            size="sm" 
            className="w-full"
            disabled={!available}
          >
            {available ? 'Ver detalles' : 'No disponible'}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ClassroomCard;
