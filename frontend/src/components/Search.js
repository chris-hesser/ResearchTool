import React from 'react';
import "../css/App.css";
import axios from 'axios'

//import { Link } from 'react-router-dom';

import Loading from "./Loading";
import ClickableArticle from "./ClickableArticle";

class Search extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      searchWords: '',
      negativeSearchWords: '',
      currentArticleData: null,
    }
  }

  componentDidMount() {
    // fetch data from backend on first load
    this.fetchArticleData();
    console.log("after call")
  }

  // make call to server using current search data,
  // expect one article data object to be sent in response

  fetchArticleData = () => {
    // clear article to show loading icon
    this.setState({ currentArticleData: null });

    // fecth new article
    this.setState({
      currentArticleData:
        (async () => {
          try {
            let article = await axios.get("http://localhost:9000/articleRequest");
            return article;
          } 
          catch (error) { 
            console.log(error);
            return {title: "bummer"};
          }
        })()
    });
    console.log("fetch data")
    console.log(this.currentArticleData);
  }


  isLoading = () => {
    return this.currentArticleData == null;
  }

  clearFields = () => {
    this.setState({
      searchWords: '',
      negativeSearchWords: '',
    });
  }

  /*
  handleClickedWords = (clickedWord) => {
    this.setState({
      searchWords: searchWords + clickedWord
    })
  }
  */

  render() {
    return (
      <>
        <h1>Resource</h1>
        {
          // conditional loading icon
          this.isLoading() ?
            <Loading />
            :
            <ClickableArticle articleData={this.state.currentArticleData} />
        }
        <button disabled={this.isLoading()} onClick={this.clearFields}>Reset</button>
        <button disabled={this.isLoading()} onClick={this.fetchArticleData}>Next</button>
      </>
    );
  }
}

export default Search; 