export interface NewsInterface {
  news_id: string;
  news_title: string;
  summary: string;
  source_url: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export interface UpdateNewsInterface {
  news_title?: string;
  summary?: string;
  source_url?: string;
  category?: string;
  updated_at?: Date;
}
