import "./index.css";
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import axios from "axios";

const NewsList = ({ data, setSelectedArticle, selectedArticle, setData }) => {
    const handleChange = async (v) => {
        console.log(v);
        let range = {
            start_date:  moment(v[0]).format("YYYY-MM-DD"),
            end_date: moment(v[1]).format("YYYY-MM-DD"),
        };
        let res = await axios({
            method: 'get',
            url: 'https://get.scrapehero.com/news-api/news/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE&q=Iphone',
            params: range
      })
        console.log(res);
        console.log(range);
        setData(res.data.result.data)
    }
    return (
        <div className="news-list">
           <div> <DateRangePicker placeholder="Select Date Range" className="date-picker" onChange={(v) => handleChange(v)}/></div>
            <div>
                {
                    data.length > 0 && data.map((article, index) => {
                        let date = moment(article?.data).format('MMMM Do, YYYY');  
                        return (
                            <div key={index} className="article-card" onClick={ () => setSelectedArticle(article)}>
                                <span className="article-card-date">{date}</span>
                                <span className="article-card-title" style={selectedArticle === article ? {fontWeight:"bold"}:{}}>{article?.title}</span>
                                <div className="sentiment-row"><div className={`sentiment bg-${article?.sentiment.toLowerCase()}`} ></div><span className="article-card-publication">{article?.publication}</span></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default NewsList;