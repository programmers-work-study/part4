/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import jsonData from "./data/posts.json"

type SortType = 'recent' | 'view';
export interface IData {
  title: string;
  views: number;
  upload_date: string;
  bookmark: boolean;
}
function App() {
  const [data, setData] = useState<IData[]>([]);
  const [bySort, setBySort] = useState<SortType>('recent');

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '1') {
      setBySort('recent');
    } else if (event.target.value === '2') {
      setBySort('view');
    }
  }

  const sortData = () => {
    let sortedData = [...data];
    // 먼저 북마크 기준으로 정렬
    sortedData.sort((a, b) => (b.bookmark ? -1 : 1));

    // 북마크된 항목들만 정렬
    let bookmarked = sortedData.filter(post => post.bookmark);
    let notBookmarked = sortedData.filter(post => !post.bookmark);

    if (bySort === 'recent') {
      bookmarked.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
      notBookmarked.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
    } else if (bySort === 'view') {
      bookmarked.sort((a, b) => b.views - a.views);
      notBookmarked.sort((a, b) => b.views - a.views);
    }

    return [...bookmarked, ...notBookmarked];
  };

  const toggleBookmark = (title: string) => {
    setData(prevData =>
      prevData.map(post =>
        post.title === title ? { ...post, bookmark: !post.bookmark } : post
      )
    );
  };
  useEffect(() => {
    setData(jsonData);
  }, []);

  return (
    <div className="container">
      <div className="section __order">
        <select id="order_type" onChange={handleChangeType}>
          <option value="1">최근등록순</option>
          <option value="2">조회순</option>
        </select>
      </div>
      <div className="section">
        <ol>
          {sortData().map((d) => (
            <Card key={d.title} post={d} onBookmarkToggle={toggleBookmark} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
