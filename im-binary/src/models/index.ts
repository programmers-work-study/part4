/**
 * @description
 * "1" : 최근 등록 순
 * "2" : 조회 순
 */
export type OrderType = "1" | "2";

export interface Post {
  title: string;
  upload_date: string;
  views: number;
  bookmark: boolean;
}
