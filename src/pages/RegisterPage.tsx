import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { api } from '@/lib/api-client';
import type { User } from '@shared/types';
const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  phone: z.string().min(10, 'O telefone deve ter pelo menos 10 dígitos.'),
  category: z.string().min(1, { message: 'Por favor, selecione uma categoria.' }),
});
type RegisterFormValues = z.infer<typeof registerSchema>;
export function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      category: '',
    },
  });
  const onSubmit = async (data: RegisterFormValues) => {
    const toastId = toast.loading('Realizando sua inscrição...');
    try {
      await api<User>('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success('Inscrição realizada com sucesso!', {
        id: toastId,
        description: 'Você será redirecionado para a p��gina de pagamento.',
      });
      setTimeout(() => navigate('/pagamento'), 2000);
    } catch (error) {
      toast.error('Erro ao realizar inscrição', {
        id: toastId,
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
      });
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-paz-background">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-3xl">Formulário de Inscrição</CardTitle>
                <CardDescription>Preencha seus dados para garantir sua vaga.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone (com DDD)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(00) 91234-5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria de Interesse</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="teologia">Teologia</SelectItem>
                              <SelectItem value="lideranca">Liderança</SelectItem>
                              <SelectItem value="missoes">Missões</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-paz-accent text-paz-text-primary hover:bg-paz-accent/90" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Enviando...' : 'Finalizar Inscrição'}
                    </Button>
                  </form>
                </Form>
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