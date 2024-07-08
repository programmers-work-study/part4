/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { json } from "stream/consumers";
import Card from "./components/Card";

type SortType = 'recent' | 'view';
interface IData {
  title: string;
  views: number;
  upload_date: string;
  bookmark: boolean;
}
function App() {
  const [data, setData] = useState<IData[] | null>(null);
  const [bySort, setBySort] = useState<SortType>('recent');

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '1') {
      setBySort('recent');
    } else if (event.target.value === '2') {
      setBySort('view')
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch("./data/posts.json");
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error)
    }
  }

  const sortData = (list: IData[] | null) => {
    if (!list) return;

    let sortedData;
    if (bySort === 'recent') {
      sortedData = list.sort((a: IData, b: IData) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
    } else if (bySort === 'view') {
      sortedData = list.sort((a: IData, b: IData) => b.views - a.views);
    }
    setData(sortedData)
  }

  useEffect(() => {
    fetchData().then(res => {
      if (res) {
        sortData(res);
      }
    })
  }, [bySort]);

  return (
    <div className="container">
      <div className="section __order">
        <select id="order_type" onChange={handleChangeType}>
          <option value="1">최근등록순</option>
          <option value="2">조회순</option>
        </select>
      </div>
      <div className="section">
        {
          data ? data.map((d) => <Card post={d} />) : null
        }
      </div>
    </div>
  );
}

export default App;
