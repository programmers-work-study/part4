/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import "./Card.css";

function Card({ post }) {
  return (
    <li className="card--container" id="card1">
      <div className="header">
        <div className="card--tag">
          <span className="upload-date">{post.upload_date}</span>
        </div>
        <div className="card--tag">
          <span className="icon bookmark">
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
}
export default Card;
