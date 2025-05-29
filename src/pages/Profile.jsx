
import Layout from '../components/organisms/Layout';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/atoms/Card';
import { User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout title="Perfil">
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{user?.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documento
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{user?.document}</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
