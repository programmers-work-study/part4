import { Post, OrderType } from "../models";

export function sortPosts({
  posts,
  orderType,
  bookmarkedPosts,
}: {
  posts: Post[];
  orderType: OrderType;
  bookmarkedPosts: Post[];
}) {
  return [...posts].sort((a, b) => {
    const aIsBookmarked = bookmarkedPosts.includes(a);
    const bIsBookmarked = bookmarkedPosts.includes(b);

    if (aIsBookmarked && !bIsBookmarked) return -1;
    if (bIsBookmarked && !aIsBookmarked) return 1;

    if (orderType === "1") {
      return (
        new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
      );
    } else {
      return b.views - a.views;
    }
  });
}
