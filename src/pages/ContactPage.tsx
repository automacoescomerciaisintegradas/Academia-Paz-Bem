import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Toaster, toast } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
const contactSchema = z.object({
  name: z.string().min(3, 'O nome é obrigatório.'),
  email: z.string().email('O e-mail é inválido.'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
});
type ContactFormValues = z.infer<typeof contactSchema>;
export function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });
  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Mensagem enviada!', {
          description: 'Agradecemos o seu contato. Responderemos em breve.',
        });
        form.reset();
      } else {
        toast.error('Erro ao enviar mensagem.', {
          description: 'Por favor, tente novamente mais tarde.',
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Erro ao enviar mensagem.', {
        description: 'Ocorreu um problema de conexão. Verifique sua internet.',
      });
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-paz-background">
        <Header />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16 md:py-24">
              <div className="text-center">
                <h1 className="font-display text-4xl md:text-5xl font-extrabold text-paz-text-primary">
                  Entre em Contato
                </h1>
                <p className="mt-4 text-lg text-paz-text-secondary max-w-2xl mx-auto">
                  Tem alguma dúvida ou sugestão? Adoraríamos ouvir você.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card className="bg-white p-8">
                  <h2 className="font-display text-2xl font-bold text-paz-text-primary">Envie uma Mensagem</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl><Input placeholder="Seu nome" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl><Textarea placeholder="Sua mensagem..." rows={5} {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" className="w-full bg-paz-accent text-paz-text-primary hover:bg-paz-accent/90" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                      </Button>
                    </form>
                  </Form>
                </Card>
                <div className="space-y-8">
                  <h2 className="font-display text-2xl font-bold text-paz-text-primary">Nossas Informações</h2>
                  <div className="space-y-4 text-paz-text-secondary">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-paz-primary flex-shrink-0 mt-1" />
                      <span>Rua Fictícia, 123, Cidade, Estado, CEP 00000-000</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-paz-primary flex-shrink-0" />
                      <span>(00) 12345-6789</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="h-6 w-6 text-paz-primary flex-shrink-0" />
                      <span>contato@pazebem.com</span>
                    </div>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019599596799!2d144.9537353153169!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625842222734!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      title="Google Maps Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <Toaster richColors closeButton />
    </>
  );
}