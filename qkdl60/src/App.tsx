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
  upload_date: dataString;
  bookmark: boolean;
}
const sortList = (orderType: OrderType, dataList: Post[]) => {
  if (orderType === "latest") {
    return dataList.sort((a, b) => {
      if (a.bookmark !== b.bookmark) {
        return a.bookmark ? -1 : 1;
      }
      const dateA = new Date(a.upload_date);
      const dateB = new Date(b.upload_date);
      return dateB.getTime() - dateA.getTime();
    });
  }
  if (orderType === "views")
    return dataList.sort((a, b) => {
      if (a.bookmark !== b.bookmark) {
        return a.bookmark ? -1 : 1;
      }
      return b.views - a.views;
    });
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
        <ol>
          {sortedList.map((post, index) => (
            <Card
              onClickBookmark={() => {
                setPostList(
                  postList.map((targetPost) => {
                    if (targetPost.title === post.title) return {...targetPost, bookmark: !targetPost.bookmark};
                    else return targetPost;
                  })
                );
              }}
              key={index}
              {...post}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
