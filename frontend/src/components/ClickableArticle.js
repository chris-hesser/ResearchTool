import React from 'react';
import { connect } from 'react-redux';

function ClickableArticle(props) {

  if (props.article.error)
  {
    return (<h1>{props.article.error}</h1>);
  }

  let title = props.article.title;
  let wordsArray = title.split(" ");


  // todo, add key for color change
  const wordItems = wordsArray.map(
    (word) =>
      <span className="clickableWord" onClick={() => props.addSearchWord(word)}>{word + " "}</span>
  );

  return (
    <h1>
      {wordItems}
    </h1>
  );
}


const mapStateToProps = state => {
  return {
    article: state.article,
  }
}

export default connect(mapStateToProps)(ClickableArticle);