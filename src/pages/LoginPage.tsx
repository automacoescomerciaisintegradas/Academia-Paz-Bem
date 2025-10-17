import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from 'sonner';
import { useAuthStore } from '@/hooks/use-auth-store';
import { api } from '@/lib/api-client';
import type { User } from '@shared/types';
export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Verificando credenciais...');
    try {
      // NOTE: The password is not actually used in this mock backend
      const user = await api<User>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      login(user);
      toast.success('Login bem-sucedido!', {
        id: toastId,
        description: `Bem-vindo(a) de volta, ${user.name.split(' ')[0]}!`,
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error('Falha no login', {
        id: toastId,
        description: err instanceof Error ? err.message : 'Verifique seu e-mail e tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-paz-background">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="max-w-sm mx-auto">
              <CardHeader className="text-center space-y-1">
                <CardTitle className="font-display text-2xl">Acessar sua Conta</CardTitle>
                <CardDescription>
                  Bem-vindo de volta! Insira suas credenciais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Link to="#" className="text-sm font-medium text-paz-primary hover:underline">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-paz-primary hover:bg-paz-primary/90" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  Não tem uma conta?{' '}
                  <Link to="/cadastro" className="font-medium text-paz-primary hover:underline">
                    Inscreva-se
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
      <Toaster richColors closeButton />
    </>
  );
}