/* 여기에 주어진 요구 사항을 충족 시키기 위한 코드를 작성 및 수정해 주세요. */
import { IData } from "../App";
import "./Card.css";

function Card({ posts, onBookmarkToggle }) {
  const handleBookmarkClick = (title) => {
    onBookmarkToggle(title)
  }
  return (
    <div className="card--box">
      {
        posts.map((post: IData) => (
          <li className="card--container" id="card1" key={post.title}>
            <div className="header">
              <div className="card--tag">
                <span className="upload-date">{post.upload_date}</span>
              </div>
              <div className="card--tag" onClick={() => handleBookmarkClick(post.title)}>
                <span className={`icon bookmark ${post.bookmark ? "selected" : ""}`}>
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
        ))
      }
    </div>
  );
}
export default Card;