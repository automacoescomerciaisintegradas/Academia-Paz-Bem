import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Construction } from 'lucide-react';
type PlaceholderPageProps = {
  pageName: string;
};
export function PlaceholderPage({ pageName }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <Construction className="mx-auto h-16 w-16 text-paz-accent" />
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-paz-text-primary sm:text-5xl">
            {pageName}
          </h1>
          <p className="mt-6 text-base leading-7 text-paz-text-secondary">
            Esta página está em construção. Volte em breve!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}