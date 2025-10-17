import { Link } from 'react-router-dom';
import { BookOpenCheck, Facebook, Instagram, Youtube } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-paz-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BookOpenCheck className="h-8 w-8 text-paz-accent" />
              <span className="font-display text-xl font-bold">
                Academia Paz & Bem
              </span>
            </Link>
            <p className="text-sm text-gray-300">
              Aprofunde seu conhecimento bíblico e teológico com nossos cursos online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-paz-accent transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-300 hover:text-paz-accent transition-colors"><Instagram /></a>
              <a href="#" className="text-gray-300 hover:text-paz-accent transition-colors"><Youtube /></a>
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-paz-accent">Navegação</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/cursos" className="hover:underline">Cursos</Link></li>
              <li><Link to="/sobre" className="hover:underline">Sobre Nós</Link></li>
              <li><Link to="/contato" className="hover:underline">Contato</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-paz-accent">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/termos" className="hover:underline">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:underline">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-paz-accent">Empresa</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li><strong>Empresa:</strong> Automacoes Comerciais Int</li>
              <li><strong>CNPJ:</strong> 00.000.000/0001-00</li>
              <li><strong>Telefone:</strong> (00) 12345-6789</li>
              <li><strong>Endereço:</strong> Rua Fictícia, 123, Cidade, Estado</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-paz-secondary/20 text-center text-sm text-gray-400">
          <p>2025 © Automacoes Comerciais Int. Todos os direitos reservados.</p>
          <p className="mt-2">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}