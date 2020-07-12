import React from 'react';
import "../css/App.css";
import { connect } from 'react-redux';

function ArticleDescription(props) {
  let displayDescription = props.article != null && props.article.description != null;
  let displayReference = props.article != null && props.article.fulltextIdentifier != null;

  let descriptionText = displayDescription ? props.article.description : "No description available";
  descriptionText += "...";

  return (
    <>
      <h1>Description</h1>
      {displayDescription ?
        <p className='descriptionText'>{descriptionText}</p>
        :
        <p className='noDescriptionText'>{descriptionText}</p>
      }
      {
        (displayReference && props.article.fulltextIdentifier) ?
          <>
            <span>Full resource: </span>
            <a href={props.article.fulltextIdentifier} rel="noopener noreferrer" target="_blank">{props.article.fulltextIdentifier}</a>
          </>
          : null
      }
      <a href="#searchContainer">
        <button renderas="button">
          <span>Back to search</span>
        </button>
      </a>
    </>
  );

}

const mapStateToProps = state => {
  return {
    article: state.article,
  }
}

export default connect(mapStateToProps)(ArticleDescription);