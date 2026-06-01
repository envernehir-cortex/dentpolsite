export interface Makale {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown formatted string
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  readTime: string; // e.g. "5 dk okuma"
  tags: string[];        // Visible tag pills on article
  keywords: string;      // SEO meta keywords string
}
