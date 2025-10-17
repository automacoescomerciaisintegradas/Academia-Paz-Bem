import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Twitter, Facebook, Linkedin } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Article } from '@shared/types';
export function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!articleId) {
      setError('Artigo não encontrado.');
      setIsLoading(false);
      return;
    }
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await api<Article>(`/api/articles/${articleId}`);
        setArticle(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar o artigo.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article?.title || 'Confira este artigo da Academia Paz & Bem');
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-paz-background">
        <Header />
        <main className="flex-grow py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full mb-8" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-5/6 mb-4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  if (error || !article) {
    return (
      <div className="flex flex-col min-h-screen bg-paz-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar artigo</AlertTitle>
            <AlertDescription>{error || 'O artigo que você está procurando não foi encontrado.'}</AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-paz-text-primary text-balance">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article.author.avatarUrl} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-paz-text-primary">{article.author.name}</p>
                <p className="text-sm text-paz-text-secondary">
                  Publicado em {new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </header>
          <img src={article.imageUrl} alt={article.title} className="w-full aspect-video object-cover rounded-lg mb-8" />
          <div
            className="prose prose-lg max-w-none text-paz-text-secondary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-paz-text-primary">Compartilhe este artigo:</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleShare('twitter')}><Twitter className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => handleShare('facebook')}><Facebook className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')}><Linkedin className="h-4 w-4" /></Button>
                </div>
            </div>
            <Button asChild variant="link" className="mt-8">
                <Link to="/blog">← Voltar para o Blog</Link>
            </Button>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}