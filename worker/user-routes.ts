import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, CategoryEntity, ArticleEntity, NewsletterSubscriptionEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // USERS
  app.post('/api/users', async (c) => {
    const { name, email, phone, category } = (await c.req.json()) as { name?: string, email?: string, phone?: string, category?: string };
    if (!isStr(name) || !isStr(email) || !isStr(phone) || !isStr(category)) {
      return bad(c, 'Todos os campos são obrigatórios: nome, email, telefone e categoria.');
    }
    const user = { id: crypto.randomUUID(), name, email, phone, category };
    return ok(c, await UserEntity.create(c.env, user));
  });
  // CATEGORIES
  app.get('/api/categories', async (c) => {
    await CategoryEntity.ensureSeed(c.env);
    const page = await CategoryEntity.list(c.env);
    return ok(c, page);
  });
  // ARTICLES
  app.get('/api/articles', async (c) => {
    await ArticleEntity.ensureSeed(c.env);
    const page = await ArticleEntity.list(c.env);
    // Sort by date descending
    page.items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return ok(c, page);
  });
  app.get('/api/articles/:id', async (c) => {
    const { id } = c.req.param();
    if (!isStr(id)) return bad(c, 'ID do artigo inválido');
    await ArticleEntity.ensureSeed(c.env);
    const article = new ArticleEntity(c.env, id);
    if (!(await article.exists())) {
      return notFound(c, 'Artigo não encontrado');
    }
    return ok(c, await article.getState());
  });
  // NEWSLETTER
  app.post('/api/newsletter', async (c) => {
    const { email } = (await c.req.json()) as { email?: string };
    if (!isStr(email)) {
      return bad(c, 'O campo e-mail é obrigatório.');
    }
    const subscriptionEntity = new NewsletterSubscriptionEntity(c.env, email);
    if (await subscriptionEntity.exists()) {
      return bad(c, 'Este e-mail já está inscrito.');
    }
    const subscription = {
      id: email,
      email,
      subscribedAt: new Date().toISOString(),
    };
    await NewsletterSubscriptionEntity.create(c.env, subscription);
    return ok(c, { message: 'Inscrição realizada com sucesso!' });
  });
  // CONTACT FORM
  app.post('/api/contact', async (c) => {
    const { name, email, message } = (await c.req.json()) as { name?: string, email?: string, message?: string };
    if (!isStr(name) || !isStr(email) || !isStr(message)) {
      return bad(c, 'Todos os campos são obrigatórios: nome, email e mensagem.');
    }
    // Here you would process the contact form submission, e.g., send an email.
    // For this example, we'll just log it and return success.
    console.log(`New contact message from ${name} (${email}): ${message}`);
    return ok(c, { message: 'Mensagem enviada com sucesso!' });
  });
  // AUTHENTICATION
  app.post('/api/auth/login', async (c) => {
    const { email } = (await c.req.json()) as { email?: string };
    if (!isStr(email)) {
      return bad(c, 'O campo e-mail é obrigatório.');
    }
    // This is a simplified login. A real implementation would check a password or send a magic link.
    // Here we just check if a user with the given email exists.
    const user = await UserEntity.findByEmail(email, c.env);
    if (!user) {
      return notFound(c, 'Usuário não encontrado ou credenciais inválidas.');
    }
    return ok(c, user);
  });
}