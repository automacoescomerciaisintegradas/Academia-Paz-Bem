import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/hooks/use-auth-store';
import { LogOut } from 'lucide-react';
export function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    // This is a simple guard. In a real app, you might use a wrapper component
    // or a router-level check for protected routes.
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  if (!user) {
    // Render nothing or a loading spinner while redirecting
    return null;
  }
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="font-display text-3xl">Minha Conta</CardTitle>
              <CardDescription>Bem-vindo(a) à sua área de aluno, {user.name.split(' ')[0]}!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-paz-text-primary">Seus Dados</h3>
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefone:</strong> {user.phone}</p>
                <p><strong>Categoria de Interesse:</strong> {user.category}</p>
              </div>
              <p className="text-sm text-paz-text-secondary">
                Esta é uma área de demonstração. Em uma aplicação completa, aqui você encontraria seus cursos,
                progresso e certificados.
              </p>
              <Button onClick={handleLogout} variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Sair da Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}