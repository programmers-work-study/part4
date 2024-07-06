/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import "./App.css";
import Card from "./components/Card";

import {useEffect, useState} from "react";

type OrderType = "latest" | "views";

const isOrderType = (value: any): value is OrderType => {
  return value === "latest" || value === "views";
};
type dataString = `${number}-${number}-${number}`;
export interface Post {
  title: string;
  views: number;
  upload_date: string;
  bookmark: dataString;
}
const sortList = (orderType: OrderType, dataList: Post[]) => {
  if (orderType === "latest") return dataList.sort((a, b) => (a.upload_date < b.upload_date ? 1 : -1));
  if (orderType === "views") return dataList.sort((a, b) => b.views - a.views);
  return dataList;
};

function App() {
  const [orderState, setOrderState] = useState<OrderType>("latest");
  const [postList, setPostList] = useState<Post[]>([]);
  const sortedList = sortList(orderState, postList);

  useEffect(() => {
    (async () => {
      const res = await fetch("./data/posts.json");
      if (res.ok) {
        const data: Post[] = await res.json();
        setPostList(data);
      }
    })();
  }, []);

  const handleChangeOrderType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextOrderState = event.target.value;
    if (isOrderType(nextOrderState) && orderState !== nextOrderState) {
      setOrderState(nextOrderState);
    }
  };

  return (
    <div className="container">
      <div className="section __order">
        <select id="order_type" onChange={handleChangeOrderType}>
          <option value="latest">최근등록순</option>
          <option value="views">조회순</option>
        </select>
      </div>
      <div className="section">
        {sortedList.map((post, index) => (
          <Card key={index} title={post.title} upload_date={post.upload_date} views={post.views} bookmark={post.bookmark} />
        ))}
      </div>
    </div>
  );
}

export default App;
