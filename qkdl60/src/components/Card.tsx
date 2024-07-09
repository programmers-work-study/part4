/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import "./Card.css";
import {Post} from "../App";

interface CardProps extends Post {
  onClickBookmark: () => void;
}
function Card({title, views, upload_date, bookmark, onClickBookmark}: CardProps) {
  return (
    <li className="card--container" id="card1">
      <div className="header">
        <div className="card--tag">
          <span className="upload-date">{upload_date}</span>
        </div>
        <div className="card--tag">
          <span className={`icon bookmark ${bookmark ? "marked" : ""}`} onClick={onClickBookmark}>
            <i className="fa fa-bookmark"></i>
          </span>
        </div>
      </div>
      <div className="card--content">
        <span className="title">{title}</span>
      </div>
      <div className="footer">
        <div className="card--tag">
          <span className="views">{views}</span>
          views
        </div>
      </div>
    </li>
  );
}
export default Card;
