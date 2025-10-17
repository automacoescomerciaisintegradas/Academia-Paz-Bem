import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Article } from '@shared/types';
// Helper function to strip HTML tags from a string
const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};
export function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await api<{ items: Article[] }>('/api/articles');
        setArticles(response.items);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar artigos.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="text-center">
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-paz-text-primary">
                Nosso Blog
              </h1>
              <p className="mt-4 text-lg text-paz-text-secondary max-w-2xl mx-auto">
                Artigos, reflexões e estudos para aprofundar sua jornada de fé e conhecimento.
              </p>
            </div>
            <div className="mt-16">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                      <CardContent><Skeleton className="h-4 w-full" /></CardContent>
                      <CardFooter><Skeleton className="h-8 w-24" /></CardFooter>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                      <img src={article.imageUrl} alt={article.title} className="h-48 w-full object-cover" />
                      <CardHeader>
                        <CardTitle className="font-display text-xl">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-paz-text-secondary line-clamp-3">{stripHtml(article.content).substring(0, 120)}...</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" className="text-paz-primary p-0" asChild>
                          <Link to={`/blog/${article.slug}`}>Ler Mais <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
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