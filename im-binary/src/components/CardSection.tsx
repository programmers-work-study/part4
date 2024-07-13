import postsData from "../data/posts.json";
import { useState, useEffect } from "react";
import { OrderType, Post } from "../models";
import { sortPosts } from "../utils/sortPosts";
import Card from "./Card";

export function CardSection({ orderType }: { orderType: OrderType }) {
  const [posts, setPosts] = useState(postsData);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const toggleBookmark = (post: Post) => {
    setBookmarkedPosts((prevBookmarkedPosts) => {
      if (prevBookmarkedPosts.includes(post)) {
        return prevBookmarkedPosts.filter((item) => item !== post);
      } else {
        return [...prevBookmarkedPosts, post];
      }
    });
  };

  useEffect(() => {
    setPosts(sortPosts({ posts: postsData, orderType, bookmarkedPosts }));
  }, [orderType, bookmarkedPosts]);

  return (
    <ol>
      {posts.map((post) => (
        <Card
          key={post.title}
          post={post}
          isBookmarked={bookmarkedPosts.includes(post)}
          onBookmarkToggle={() => toggleBookmark(post)}
        />
      ))}
    </ol>
  );
}
