export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  order: number;
  createdAt: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  body: string;
  category_id?: string | null;
  category?: Category | null;
  createdAt: string;
  updatedAt?: string;
  viewCount?: number;
};
