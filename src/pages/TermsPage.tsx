import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
export function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="prose lg:prose-lg max-w-none text-paz-text-secondary">
              <h1 className="font-display text-paz-text-primary">Termos de Uso</h1>
              <p className="lead">
                Bem-vindo à Academia Paz & Bem. Ao acessar e usar nosso site e serviços, você concorda em cumprir e
                estar sujeito aos seguintes termos e condições de uso.
              </p>
              <h2>1. Uso da Plataforma</h2>
              <p>
                Nossos serviços são destinados a fins educacionais e de desenvolvimento pessoal. Você concorda em usar a
                plataforma de maneira ética e legal, não se envolvendo em atividades que possam prejudicar a
                plataforma ou outros usuários.
              </p>
              <h2>2. Inscrição e Conta</h2>
              <p>
                Para acessar certos cursos, você pode ser solicitado a se registrar e criar uma conta. Você é
                responsável por manter a confidencialidade de suas informações de conta e por todas as atividades que
                ocorrem sob sua conta.
              </p>
              <h2>3. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo fornecido na plataforma, incluindo textos, vídeos, gráficos e logotipos, é propriedade
                da Academia Paz & Bem ou de seus parceiros de conteúdo e é protegido por leis de direitos autorais.
                Nenhum conteúdo pode ser copiado, reproduzido ou distribuído sem permissão explícita.
              </p>
              <h2>4. Pagamentos</h2>
              <p>
                As taxas para os cursos são devidas no momento da inscrição. Todos os pagamentos são processados através
                de gateways seguros. A inscrição é confirmada após a verificação do pagamento.
              </p>
              <h2>5. Limitação de Responsabilidade</h2>
              <p>
                A Academia Paz & Bem não se responsabiliza por quaisquer danos diretos ou indiretos resultantes do uso
                ou da incapacidade de usar nossos serviços. O conteúdo é fornecido "como está", sem garantias de
                qualquer tipo.
              </p>
              <h2>6. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                imediatamente após a publicação no site. É sua responsabilidade revisar os termos periodicamente.
              </p>
              <p>
                Se tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através da nossa página de
                contato.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}