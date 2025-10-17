import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
export function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="prose lg:prose-lg max-w-none text-paz-text-secondary">
              <h1 className="font-display text-paz-text-primary">Política de Privacidade</h1>
              <p className="lead">
                A sua privacidade é importante para nós. É política da Academia Paz & Bem respeitar a sua privacidade
                em relação a qualquer informação sua que possamos coletar no site.
              </p>
              <h2>1. Informações que Coletamos</h2>
              <p>
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
                Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que
                estamos coletando e como será usado. As informações coletadas incluem nome, e-mail e telefone para
                fins de cadastro e comunicação.
              </p>
              <h2>2. Como Usamos Suas Informações</h2>
              <p>
                Usamos as informações coletadas para operar e manter nossos serviços, processar inscrições, enviar
                comunicações sobre cursos e responder às suas solicitações. Não compartilhamos suas informações de
                identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
              </p>
              <h2>3. Segurança dos Dados</h2>
              <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.
                Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e
                roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
              </p>
              <h2>4. Seus Direitos (LGPD)</h2>
              <p>
                Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode se opor
                ao processamento de seus dados. Para exercer esses direitos, entre em contato conosco.
              </p>
              <h2>5. Cookies</h2>
              <p>
                Nosso site pode usar cookies para melhorar a experiência do usuário. Cookies são pequenos arquivos de
                dados armazenados no seu dispositivo. Você pode configurar seu navegador para recusar cookies, mas
                isso pode afetar a funcionalidade de algumas partes do nosso site.
              </p>
              <h2>6. Links para Sites de Terceiros</h2>
              <p>
                O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não
                temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por
                suas respectivas políticas de privacidade.
              </p>
              <p>
                O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de
                privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do
                usuário e informações pessoais, entre em contato conosco.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}