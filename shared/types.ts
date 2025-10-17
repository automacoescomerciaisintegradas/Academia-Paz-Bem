export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
}
export interface CourseCategory {
  id: string;
  name: string;
  description: string;
}
export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  publishedAt: string;
}
export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: string;
}