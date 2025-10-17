import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { CourseCategory } from '@shared/types';
export function CoursesPage() {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api<{ items: CourseCategory[] }>('/api/categories');
        setCategories(response.items);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar categorias.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="text-center">
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-paz-text-primary">
                Nossos Cursos
              </h1>
              <p className="mt-4 text-lg text-paz-text-secondary max-w-2xl mx-auto">
                Explore nossas áreas de estudo e encontre o curso ideal para aprofundar seu conhecimento.
              </p>
            </div>
            <div className="mt-16">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categories.map((category) => (
                    <Card key={category.id} className="bg-white hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-paz-primary/10 text-paz-primary">
                            <BookOpen className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <CardTitle className="font-display text-xl text-paz-text-primary">{category.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-paz-text-secondary">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}