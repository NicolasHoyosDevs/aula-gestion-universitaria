
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Card from '../components/atoms/Card';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{document?: string; password?: string}>({});
  const { user, login, isLoading } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!document) {
      setErrors(prev => ({ ...prev, document: 'El documento es requerido' }));
      return;
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: 'La contraseña es requerida' }));
      return;
    }

    const success = await login(document, password);
    
    if (!success) {
      toast({
        title: "Error de autenticación",
        description: "Documento o contraseña incorrectos",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen university-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Gestión de Aulas
            </h1>
            <p className="text-gray-600">Ingresa a tu cuenta institucional</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Documento"
              type="text"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="Ingresa tu documento"
              error={errors.document}
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>

            <div className="text-center">
              <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Demo:</strong> Documento: 123456789, Contraseña: password
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
