/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import { useState } from "react";
import "./App.css";
import { OrderType } from "./models";
import { CardSection } from "./components/CardSection";

function App() {
  const [orderType, setOrderType] = useState<OrderType>("1");

  return (
    <div className="container">
      <div className="section __order">
        <select
          id="order_type"
          onChange={(event) => setOrderType(event.target.value as OrderType)}
        >
          <option value="1">최근등록순</option>
          <option value="2">조회순</option>
        </select>
      </div>
      <div className="section">
        <CardSection orderType={orderType} />
      </div>
    </div>
  );
}

export default App;
