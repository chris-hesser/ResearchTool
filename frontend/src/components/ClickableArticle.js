import React from 'react';

export default function ClickableArticle(props) {

  let title = props.articleData.title;
  let wordsArray = title.split(" ");


  // todo, add key for color change
  const wordItems = wordsArray.map(
    (word) =>
      <span onClick={() => props.addSearchWord(word)}>{word + " "}</span>
  );

  return (
    <h1>
      {wordItems}
    </h1>
  );
}