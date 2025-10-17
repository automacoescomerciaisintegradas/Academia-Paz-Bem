import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Eye, Heart, BookOpenCheck } from 'lucide-react';
const teamMembers = [
  { name: 'Prof. Antonio Sergio Queiroz Alves (Bandeira)', role: 'Fundador e Reitor', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Pra. Ana Pereira', role: 'Coordenadora Acadêmica', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { name: 'Prof. Lucas Martins', role: 'Professor de Hermenêutica', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
];
export function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paz-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-paz-text-primary">
              Sobre a Academia Paz & Bem
            </h1>
            <p className="mt-4 text-lg text-paz-text-secondary max-w-3xl mx-auto text-balance">
              Fundada em 2017 pelo Prof. Antonio Sergio Queiroz Alves (Bandeira), a Academia Paz & Bem nasceu com o objetivo de preparar obreiros para a seara do Mestre. Nossa missão é expandir o conhecimento do Reino de Deus, formando líderes e discípulos através de um ensino de excelência.
            </p>
          </div>
        </section>
        {/* Mission, Vision, Values Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-paz-primary/10 text-paz-primary mx-auto">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold text-paz-text-primary">Nossa Missão</h2>
                <p className="text-paz-text-secondary">
                  Oferecer formação bíblica e teológica de excelência para edificar a Igreja e glorificar a Deus.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-paz-primary/10 text-paz-primary mx-auto">
                  <Eye className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold text-paz-text-primary">Nossa Visão</h2>
                <p className="text-paz-text-secondary">
                  Ser referência em educação teológica online, formando uma geração de servos fiéis e capacitados.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-paz-primary/10 text-paz-primary mx-auto">
                  <Heart className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold text-paz-text-primary">Nossos Valores</h2>
                <p className="text-paz-text-secondary">
                  Fidelidade às Escrituras, excelência acadêmica, serviço ao próximo e amor pela verdade.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* History and Leadership Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">Nossa História e Liderança</h2>
                <p className="text-paz-text-secondary">
                  A Academia Paz & Bem é o fruto de uma visão ministerial do Prof. Antonio Sergio Queiroz Alves, carinhosamente conhecido como Bandeira. Com décadas de experiência no ensino teológico e um profundo amor pela Palavra de Deus, ele fundou a academia para criar um espaço de aprendizado acessível e de alta qualidade.
                </p>
                <p className="text-paz-text-secondary">
                  Desde o início, nosso foco tem sido combinar rigor acadêmico com aplicação prática, garantindo que nossos alunos não apenas aprendam sobre Deus, mas também cresçam em seu relacionamento com Ele e se tornem mais eficazes em seus ministérios.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="text-center p-6 border rounded-lg shadow-sm">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-display text-xl font-semibold text-paz-text-primary">Prof. Antonio Sergio Queiroz Alves (Bandeira)</h3>
                  <p className="text-paz-secondary">Fundador e Reitor</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-paz-text-primary">Nosso Corpo Docente</h2>
              <p className="mt-4 text-lg text-paz-text-secondary">
                Professores apaixonados e com vasta experiência ministerial e acadêmica.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-display text-xl font-semibold text-paz-text-primary">{member.name}</h3>
                  <p className="text-paz-secondary">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}