/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import "./Card.css";
import posts from "../data/posts.json";
import { OrderType } from "../models";
import { useEffect, useState } from "react";

function Card({ orderType }: { orderType: OrderType }) {
  const [sortedPosts, setSortedPosts] = useState([...posts]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const sorted = [...posts].sort((a, b) => {
      if (orderType === "1") {
        return (
          new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
        );
      } else {
        return b.views - a.views;
      }
    });

    setSortedPosts(sorted);
  }, [orderType]);

  return (
    <ol>
      {sortedPosts.map((post) => {
        const isBookmarked = bookmarkedPosts.includes(post);

        return (
          <li className="card--container" id="card1" key={post.title}>
            <div className="header">
              <div className="card--tag">
                <span className="upload-date">{post.upload_date}</span>
              </div>
              <div
                className="card--tag"
                onClick={() => {
                  if (isBookmarked) {
                    setBookmarkedPosts(
                      bookmarkedPosts.filter((item) => item !== post)
                    );
                  } else {
                    setBookmarkedPosts([...bookmarkedPosts, post]);
                  }
                }}
              >
                <span
                  className={`icon bookmark ${
                    isBookmarked ? "bookmarked" : ""
                  }`}
                >
                  <i className="fa fa-bookmark"></i>
                </span>
              </div>
            </div>
            <div className="card--content">
              <span className="title">{post.title}</span>
            </div>
            <div className="footer">
              <div className="card--tag">
                <span className="views">{post.views}</span>
                views
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
export default Card;
