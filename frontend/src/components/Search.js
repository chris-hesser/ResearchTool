import React from 'react';
import "../css/App.css";
import axios from 'axios'
import { connect } from 'react-redux';
import { setArticle, removeArticle } from '../actions/ArticleAction';


import Loading from "./Loading";
import ClickableArticle from "./ClickableArticle";
import Authors from "./Authors";

class Search extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      searchWords: '',
      //excludedWords: '',
    }
  }

  componentDidMount() {
    // todo, don't fetch right away, every refresh it fetches again
    // probably need to persist history to fix this.
    this.fetchArticleData();
  }

  getCurrentArticle() {
    return this.props.article;
  }

  fetchArticleData = () => {
    // show loading icon
    this.props.removeArticle();

    // fecth new article
    (async () => {
      try {
        let articleData = await axios.get("http://localhost:9000/articleRequest?q=" + this.state.searchWords);
        console.log(articleData);
        if (articleData.data == null || articleData.data === "") {
          throw new Error("No results try removing keywords")
        }
        this.props.setArticle(articleData.data);
        console.log("saved data", this.props.article)
      }
      catch (error) {
        console.log(error);
        this.props.setArticle({ title: "Search failed: " + error.message });
      }
    })()
  }


  isLoading = () => {
    return this.props.article == null;
  }

  clearFields = () => {
    this.setState({
      searchWords: '',
      //excludedWords: '',
    });
  }

  addSearchWord = (clickedWord) => {
    this.setState((state) => {
      return { searchWords: this.cleanWord(clickedWord) + ' ' + state.searchWords };
    });
  }

  /*
  addExcludedWord = (clickedWord) => {
    this.setState((state) => {
      return { excludedWords: this.cleanWord(clickedWord) + ' ' + state.excludedWords };
    });
  }
  */

  handleSearchChange = (event) => {
    this.setState({ searchWords: this.cleanWord(event.target.value) });
  }

  /*
  handleExcludedChange = (event) => {
    this.setState({ excludedWords: this.cleanWord(event.target.value) });
  }
  */

  cleanWord(word) {
    // exclude dash
    let regex = /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~\\]/g;
    return word.replace(regex, '');
  }

  enterPressed(event) {
    if (this.isLoading()) {
      return;
    }
    var key = event.keyCode || event.which;
    if (key === 13) {
      this.fetchArticleData();
    }
  }

  render() {

    //todo, recognize enter key after clicking words
    return (
      <>

        <h1>Resource</h1>
        <a className="homeLinkButton" href="#homeContainer">
          <button renderas="button">
            <span>How to use</span>
          </button>
        </a>
        <div className="articleContainer">
          {
            // conditional loading icon
            this.isLoading() ?
              <Loading />
              :
              <>
                <ClickableArticle
                  addSearchWord={this.addSearchWord}
                /*addExcludedWord={this.addExcludedWord}*/
                />
                <Authors class='authorContainer'/>
              </>
          }
        </div>

        <input className="textInput" type="text" value={this.state.searchWords} onChange={this.handleSearchChange} onKeyPress={this.enterPressed.bind(this)} />
        {/*<input type="text" value={this.state.excludedWords} onChange={this.handleExcludedChange} />*/}

        <div className="buttonContainer">
          <button disabled={this.isLoading()} onClick={() => { this.clearFields(); this.fetchArticleData(); }}>Reset</button>
          <button disabled={this.isLoading()} onClick={this.fetchArticleData}>Next</button>
        </div>


        <div className="descriptionButtonContainer">
          <a className="descriptionLinkButton" href="#articleDescriptionContainer">
            <button renderas="button">
              <span>Description</span>
            </button>
          </a>
        </div>

      </>
    );
  }
}


// redux abstraction layer
const mapDispatchToProps = {
  setArticle,
  removeArticle,
}

const mapStateToProps = state => {
  return {
    article: state.article,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);