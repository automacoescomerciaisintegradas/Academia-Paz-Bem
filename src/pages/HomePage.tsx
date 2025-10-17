import { Link } from 'react-router-dom';
import { useState, FormEvent, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, BookOpen, Users, Award, ArrowRight, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Article } from '@shared/types';
const benefits = [
  { icon: BookOpen, title: 'Conteúdo Aprofundado', description: 'Mergulhe nas escrituras com materiais ricos e detalhados.' },
  { icon: Users, title: 'Comunidade Engajada', description: 'Aprenda e cresça junto com outros estudantes e líderes.' },
  { icon: Award, title: 'Certificação Reconhecida', description: 'Receba um certificado ao concluir os cursos para validar seu aprendizado.' },
];
const courses = [
  { title: 'Teologia Sistemática', description: 'Uma visão completa das doutrinas fundamentais da f�� cristã.', image: 'https://images.unsplash.com/photo-1504639725590-7ea55b8b8438?q=80&w=800' },
  { title: 'Hermenêutica Bíblica', description: 'Aprenda a arte e a ciência de interpretar as escrituras corretamente.', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800' },
  { title: 'Liderança Eclesiástica', description: 'Desenvolva habilidades essenciais para liderar com sabedoria e integridade.', image: 'https://images.unsplash.com/photo-1529070412935-5b560a0a6e8d?q=80&w=800' },
];
const testimonials = [
  { name: 'João Silva', role: 'Líder de Pequeno Grupo', quote: 'Este curso transformou minha maneira de ver a liderança. O conteúdo é prático e profundamente bíblico. Recomendo a todos!', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Maria Oliveira', role: 'Estudante de Teologia', quote: 'A profundidade dos estudos e a qualidade dos professores são incríveis. A plataforma é intuitiva e o suporte é excelente.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
];
const faqs = [
    { q: "Para quem são os cursos?", a: "Nossos cursos são para todos que desejam aprofundar seu conhecimento bíblico, desde leigos a líderes de ministério e pastores." },
    { q: "Preciso ter formação anterior?", a: "Não. Temos cursos de nível básico, intermediário e avançado, adequados para todos os níveis de conhecimento." },
    { q: "Os cursos são online?", a: "Sim, todos os nossos cursos são 100% online, permitindo que você estude no seu próprio ritmo e de qualquer lugar." },
    { q: "Receberei um certificado?", a: "Sim, ao concluir com sucesso qualquer um de nossos cursos, você receberá um certificado digital de conclusão." },
];
export function HomePage() {
  const [email, setEmail] = useState('');
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);
  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        setIsLoadingArticles(true);
        const response = await api<{ items: Article[] }>('/api/articles');
        setRecentArticles(response.items.slice(0, 3));
        setArticlesError(null);
      } catch (err) {
        setArticlesError(err instanceof Error ? err.message : 'Falha ao carregar posts recentes.');
      } finally {
        setIsLoadingArticles(false);
      }
    };
    fetchRecentArticles();
  }, []);
  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert('Obrigado por se inscrever! Fique de olho em nossas novidades.');
        setEmail('');
      } else {
        alert(`Falha na inscrição: ${data.error || 'Por favor, tente novamente.'}`);
      }
    } catch (error) {
      console.error('Erro ao se inscrever na newsletter:', error);
      alert('Ocorreu um erro. Por favor, tente novamente mais tarde.');
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-paz-text-primary text-balance">
              Transforme sua Vocação em Ministério
            </h1>
            <p className="mt-6 text-lg md:text-xl text-paz-text-secondary max-w-3xl mx-auto text-balance">
              Aprofunde seu conhecimento teológico e prepare-se para liderar com sabedoria. Cursos online completos para quem busca servir com excelência.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-paz-accent text-paz-text-primary hover:bg-paz-accent/90 text-lg px-8 py-4" asChild>
                <Link to="/cadastro">Inscreva-se Agora</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">Por que escolher a Academia Paz & Bem?</h2>
              <p className="mt-4 text-lg text-paz-text-secondary">Capacitação completa para o seu chamado.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-paz-primary/10 text-paz-primary mx-auto">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-paz-text-primary">{item.title}</h3>
                  <p className="mt-2 text-paz-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Courses Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">Nossos Cursos em Destaque</h2>
              <p className="mt-4 text-lg text-paz-text-secondary">Comece sua jornada de aprendizado hoje mesmo.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.title} className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                  <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
                  <CardHeader>
                    <CardTitle className="font-display text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-paz-text-secondary">{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-paz-primary p-0" asChild>
                      <Link to="/cursos">Saiba Mais <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Recent Posts Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">Últimas do Blog</h2>
              <p className="mt-4 text-lg text-paz-text-secondary">Reflexões e estudos para edificar sua vida.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoadingArticles ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}><Skeleton className="h-48 w-full" /><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-4 w-full" /></CardContent></Card>
                ))
              ) : articlesError ? (
                <div className="md:col-span-2 lg:col-span-3">
                  <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Erro</AlertTitle><AlertDescription>{articlesError}</AlertDescription></Alert>
                </div>
              ) : (
                recentArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src={article.imageUrl} alt={article.title} className="h-48 w-full object-cover" />
                    <CardHeader><CardTitle className="font-display text-xl">{article.title}</CardTitle></CardHeader>
                    <CardFooter>
                      <Button variant="link" className="text-paz-primary p-0" asChild>
                        <Link to={`/blog/${article.slug}`}>Ler Mais <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">O que nossos alunos dizem</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-white">
                  <CardContent className="pt-6">
                    <blockquote className="text-paz-text-secondary italic">"{testimonial.quote}"</blockquote>
                    <div className="mt-4 flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-paz-text-primary">{testimonial.name}</p>
                        <p className="text-sm text-paz-text-secondary">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-16 md:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">Perguntas Frequentes</h2>
                </div>
                <Accordion type="single" collapsible className="w-full mt-12">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="font-display text-lg text-left">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-paz-text-secondary text-base">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        {/* Newsletter Section */}
        <section className="py-16 md:py-24 bg-paz-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Fique por dentro das novidades</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Inscreva-se para receber atualizações sobre novos cursos, artigos e eventos especiais.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-8 max-w-lg mx-auto flex gap-2">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-white text-paz-text-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-paz-accent text-paz-text-primary hover:bg-paz-accent/90">
                Inscrever
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}