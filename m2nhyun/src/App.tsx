/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */

import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { Post, SortType } from "./apis/posts";
import jsonData from "./data/posts.json";

function App() {
  // jsonData로 초기화된 게시물 데이터 상태
  const [data, setData] = useState<Post[]>(jsonData);
  // 정렬 방식 상태 (기본값: "recent")
  const [bySort, setBySort] = useState<SortType>("recent");

  // 데이터 정렬
  const sortedData = [...data].sort((a, b) => {
    if (bySort === "recent") {
      return (
        new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
      );
    } else {
      return b.views - a.views;
    }
  });

  // sorting 핸들러
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBySort(event.target.value as SortType);
  };

  // 북마크 핸들러
  const handleBookmarkToggle = (title: string) => {
    setData((prevData) =>
      prevData.map((post) =>
        post.title === title ? { ...post, bookmark: !post.bookmark } : post
      )
    );
  };

  // 정렬할때마다 업데이트
  useEffect(() => {
    setData(sortedData);
  }, [sortedData]);

  return (
    <div className="container">
      <div className="section __order">
        <h1>게시물 레이아웃 재구성하기</h1>
        <select id="order_type" value={bySort} onChange={handleSortChange}>
          <option value="recent">최근등록순</option>
          <option value="view">조회순</option>
        </select>
      </div>
      <div className="section">
        {data.map((post) => (
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
