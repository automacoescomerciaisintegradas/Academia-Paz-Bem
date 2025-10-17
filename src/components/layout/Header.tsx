import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpenCheck, User as UserIcon, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/hooks/use-auth-store';
const navLinks = [
  { href: '/cursos', label: 'Cursos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <BookOpenCheck className="h-8 w-8 text-paz-primary" />
            <span className="font-display text-xl font-bold text-paz-text-primary">
              Academia Paz & Bem
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-paz-primary',
                    isActive ? 'text-paz-primary' : 'text-paz-text-secondary'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Minha Conta
                  </Link>
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-paz-primary text-paz-primary hover:bg-paz-primary/10 hover:text-paz-primary" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-paz-accent text-paz-text-primary hover:bg-paz-accent/90" asChild>
                  <Link to="/cadastro">Inscreva-se Agora</Link>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <BookOpenCheck className="h-8 w-8 text-paz-primary" />
                    <span className="font-display text-xl font-bold text-paz-text-primary">
                      Paz & Bem
                    </span>
                  </div>
                  <nav className="flex flex-col gap-4 p-4">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'text-lg font-medium transition-colors hover:text-paz-primary',
                            isActive ? 'text-paz-primary' : 'text-paz-text-secondary'
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t space-y-4">
                    {user ? (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                            <UserIcon className="mr-2 h-4 w-4" />
                            Minha Conta
                          </Link>
                        </Button>
                        <Button className="w-full" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full border-paz-primary text-paz-primary" asChild>
                          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        </Button>
                        <Button className="w-full bg-paz-accent text-paz-text-primary" asChild>
                          <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>Inscreva-se Agora</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}