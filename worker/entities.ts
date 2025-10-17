import { IndexedEntity } from "./core-utils";
import type { User, CourseCategory, Article, NewsletterSubscription } from "@shared/types";
import type { Env } from "./core-utils";
// USER ENTITY
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", email: "", phone: "", category: "" };
  static async findByEmail(email: string, env: Env): Promise<User | null> {
    const allUsers = (await this.list(env)).items;
    return allUsers.find((user: User) => user.email === email) || null;
  }
}
// CATEGORY ENTITY
const MOCK_CATEGORIES: CourseCategory[] = [
    { id: 'teologia', name: 'Teologia', description: 'Estudos aprofundados sobre as doutrinas e a história da fé.' },
    { id: 'lideranca', name: 'Liderança', description: 'Capacitação para líderes de ministérios e igrejas.' },
    { id: 'missoes', name: 'Miss��es', description: 'Formação para o campo missionário local e transcultural.' },
    { id: 'hermeneutica', name: 'Hermenêutica', description: 'A arte e ciência da interpretação bíblica.' },
];
export class CategoryEntity extends IndexedEntity<CourseCategory> {
    static readonly entityName = "category";
    static readonly indexName = "categories";
    static readonly initialState: CourseCategory = { id: "", name: "", description: "" };
    static seedData = MOCK_CATEGORIES;
}
// ARTICLE ENTITY
const MOCK_ARTICLES: Article[] = [
    {
        id: '1',
        slug: 'a-importancia-da-teologia-hoje',
        title: 'A Importância da Teologia nos Dias de Hoje',
        content: '<p>Em um mundo em constante mudança, a teologia oferece uma âncora de sabedoria e verdade. Estudar teologia não é apenas para pastores ou acadêmicos; é para todo cristão que deseja aprofundar sua fé e compreender melhor o caráter de Deus.</p><p>Este artigo explora como uma base teológica sólida pode impactar sua vida diária, suas decisões e seu testemunho no mundo.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1501619757968-906f5592f386?q=80&w=800',
        author: { name: 'Dr. Samuel Costa', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
        publishedAt: '2024-07-15T10:00:00Z',
    },
    {
        id: '2',
        slug: '5-principios-da-lideranca-servidora',
        title: '5 Princípios da Liderança Servidora',
        content: '<p>Jesus nos deu o maior exemplo de liderança: a liderança servidora. Longe de ser um sinal de fraqueza, servir é a maior demonstração de força e autoridade no Reino de Deus.</p><p>Descubra cinco princípios práticos para aplicar o modelo de liderança de Cristo em seu ministério, família e trabalho.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800',
        author: { name: 'Pra. Ana Pereira', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
        publishedAt: '2024-07-10T14:30:00Z',
    },
    {
        id: '3',
        slug: 'como-ler-a-biblia-e-entender',
        title: 'Como Ler a Bíblia e Realmente Entender',
        content: '<p>Muitos começam a ler a Bíblia com entusiasmo, mas desistem por achá-la complexa. A hermenêutica é a chave para destravar os tesouros das Escrituras.</p><p>Neste guia, compartilhamos dicas práticas de interpretação bíblica que o ajudarão a ler, compreender e aplicar a Palavra de Deus de forma eficaz em sua vida.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1456406644174-c7a38a32ffd4?q=80&w=800',
        author: { name: 'Prof. Lucas Martins', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
        publishedAt: '2024-07-05T09:00:00Z',
    },
];
export class ArticleEntity extends IndexedEntity<Article> {
    static readonly entityName = "article";
    static readonly indexName = "articles";
    static readonly initialState: Article = { id: "", slug: "", title: "", content: "", imageUrl: "", author: { name: "", avatarUrl: "" }, publishedAt: "" };
    static seedData = MOCK_ARTICLES;
    static override keyOf(state: Article): string { return state.slug; }
}
// NEWSLETTER SUBSCRIPTION ENTITY
export class NewsletterSubscriptionEntity extends IndexedEntity<NewsletterSubscription> {
    static readonly entityName = "newsletterSubscription";
    static readonly indexName = "newsletterSubscriptions";
    static readonly initialState: NewsletterSubscription = { id: "", email: "", subscribedAt: "" };
    static override keyOf(state: NewsletterSubscription): string {
        return state.email;
    }
}