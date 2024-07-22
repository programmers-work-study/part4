export type SortType = "recent" | "view" | "bookmark";

export interface Post {
  title: string;
  views: number;
  upload_date: string;
  bookmark: boolean;
}
