import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './Components/NavBar';
import NewsList from './Components/NewsList';
import NewsArticle from './Components/NewsArticle';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("https://get.scrapehero.com/news-api/news/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE&q=Iphone")
      setData(response?.data?.result?.data);
      setSelectedArticle(response?.data?.result?.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log(data);
  return (
    <div className="App">
      <NavBar setData={setData}/>
      <div className="main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/news">
              <>
                <NewsList data={data} setSelectedArticle={setSelectedArticle} selectedArticle={selectedArticle} setData={setData}/>
                <NewsArticle article={selectedArticle} />
              </>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
