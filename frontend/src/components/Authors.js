import React from 'react';
import { connect } from 'react-redux';

function Authors(props) {

  if (props.article.error) {
    return null;
  }

  let date = props.article.datePublished;
  let authorsArray = props.article.authors;
  let authors = " ";

  if (authorsArray.length > 0) {
    authors = authorsArray.reduce(
      (totalString, author) => totalString.length > 0 ? totalString + '; ' + author : author
    );
  }

  return (
    <>
      <span className="authors">{authors}</span>
      <span id="articleDate">{date}</span>
    </>
  );
}

const mapStateToProps = state => {
  return {
    article: state.article,
  }
}

export default connect(mapStateToProps)(Authors);