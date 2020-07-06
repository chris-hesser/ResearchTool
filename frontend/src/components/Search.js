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
      excludedWords: '',
      currentArticleData: null,
    }
  }

  componentDidMount() {
    // todo, don't fetch right away, every refresh it fetches again
    // probably need to persist history to fix this.
    this.fetchArticleData();
  }

  fetchArticleData = () => {
    // show loading icon
    this.setState({ currentArticleData: null });

    // fecth new article
    (async () => {
      try {
        let article = await axios.get("http://localhost:9000/articleRequest?q=" + this.state.searchWords);
        this.setState({ currentArticleData: article.data });
        console.log("saved data", this.state.currentArticleData)
      }
      catch (error) {
        console.log(error);
        this.setState({ currentArticleData: { title: "Search failed, try again... or go read a book" } });
      }
    })()
  }


  isLoading = () => {
    return this.state.currentArticleData == null;
  }

  clearFields = () => {
    this.setState({
      searchWords: '',
      excludedWords: '',
    });
  }

  addSearchWord = (clickedWord) => {
    this.setState((state) => {
      return { searchWords: this.cleanWord(clickedWord) + ' ' + state.searchWords  };
    });
  }

  addExcludedWord = (clickedWord) => {
    this.setState((state) => {
      return { excludedWords: this.cleanWord(clickedWord) + ' ' + state.excludedWords };
    });
  }

  handleSearchChange = (event) => {
    this.setState({ searchWords: this.cleanWord(event.target.value) });
  }

  handleExcludedChange = (event) => {
    this.setState({ excludedWords: this.cleanWord(event.target.value) });
  }

  // stateless function  
  cleanWord(word) {
    // exclude dash
    let regex = /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~\\]/g;
    return word.replace(regex, '');
  }

  render() {
    return (
      <>
        <h1>Resource</h1>
        {
          // conditional loading icon
          this.isLoading() ?
            <Loading />
            :
            <ClickableArticle
              addSearchWord={this.addSearchWord}
              addExcludedWord={this.addExcludedWord}
              articleData={this.state.currentArticleData} />
        }
        <input type="text" value={this.state.searchWords} onChange={this.handleSearchChange} />
        <input type="text" value={this.state.excludedWords} onChange={this.handleExcludedChange} />
        <button disabled={this.isLoading()} onClick={() => {this.clearFields(); this.fetchArticleData();}}>Reset</button>
    
        <button disabled={this.isLoading()} onClick={this.fetchArticleData}>Next</button>
      </>
    );
  }
}

export default Search; 