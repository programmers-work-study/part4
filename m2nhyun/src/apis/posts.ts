export type SortType = "recent" | "view";

export interface Post {
  title: string;
  views: number;
  upload_date: string;
  bookmark: boolean;
}
