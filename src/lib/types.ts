export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
  viewCount?: number;
};
