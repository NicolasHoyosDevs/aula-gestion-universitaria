
import { User, FileText, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/organisms/Layout';
import Card from '../components/atoms/Card';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout title="Perfil">
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Perfil de Usuario</h1>
            <p className="text-gray-600">Información de tu cuenta institucional</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <p className="text-gray-900">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Documento</label>
                <p className="text-gray-900">{user?.document}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <p className="text-gray-900">{user?.role}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
