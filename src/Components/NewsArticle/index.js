import "./index.css";
import moment from "moment";

const NewsArticle = ({ article }) => {
    let date = moment(article?.data).format('LL');  
    return (
        <div className="news-container">
            <div className="article">
                <h1>
                    {article?.title}
                </h1>
                <div className="meta-data">
                    <span>
                        {article?.publication}
                    </span>
                    <span>
                        {date}
                    </span>
                </div>
            </div>
            <div className="content">
                {article?.content}
            </div>
        </div>
    )
}
export default NewsArticle;