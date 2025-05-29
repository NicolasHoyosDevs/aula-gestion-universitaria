
import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="text-center max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Página no encontrada</h2>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <Link to="/">
          <Button className="w-full">
            Volver al inicio
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
