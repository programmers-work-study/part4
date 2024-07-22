import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { Post, SortType } from "./apis/posts";
import jsonData from "./data/posts.json";

function App() {
  const [data, setData] = useState<Post[]>(jsonData);
  const [bySort, setBySort] = useState<SortType>("recent");

  // 데이터 정렬 로직 수정
  const sortedData = [...data].sort((a, b) => {
    if (a.bookmark && !b.bookmark) return -1;
    if (!a.bookmark && b.bookmark) return 1;

    if (bySort === "recent") {
      return (
        new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
      );
    } else {
      return b.views - a.views;
    }
  });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBySort(event.target.value as SortType);
  };

  const handleBookmarkToggle = (title: string) => {
    setData((prevData) =>
      prevData.map((post) =>
        post.title === title ? { ...post, bookmark: !post.bookmark } : post
      )
    );
  };

  useEffect(() => {
    setData(sortedData);
  }, [bySort]); // sortedData 대신 bySort를 의존성 배열에 추가

  return (
    <div className="container">
      <div className="section __order">
        <h1>게시물 레이아웃 재구성하기</h1>
        <select id="order_type" value={bySort} onChange={handleSortChange}>
          <option value="recent">최근등록순</option>
          <option value="view">조회순</option>
          <option value="bookmark">북마크순</option>
        </select>
      </div>
      <div className="section">
        {sortedData.map((post) => (
          <Card
            key={post.title}
            post={post}
            onBookmarkToggle={handleBookmarkToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
