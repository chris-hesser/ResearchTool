import React from 'react';
import "../css/App.css";

import Search from './Search';
import ArticleDescription from './ArticleDescription';

export default function Home() {

  return (
    <div className="app">
      <div className='pageContainer' id="homeContainer">
        <h1 className="title">Research Search Tool</h1>
        <p className='subtitle'>A tool for exploring the space of research.</p>

        <iframe
          title="Video: how to use this tool"
          width="560" height="315"
          src="https://www.youtube.com/embed/J---aiyznGQ"
          frameborder="0"
          allow="accelerometer; encrypted-media;"
          allowfullscreen>
        </iframe>

        <a href="#searchContainer">
          <button renderas="button" autoFocus>
            <span>Let's begin</span>
          </button>
        </a>
      </div>

      <div className='pageContainer' id='searchContainer'>
        <Search />
      </div>

      <div className='pageContainer' id='articleDescriptionContainer'>
        <ArticleDescription />
      </div>

      <div className="footer">
      </div>
    </div>
  );
}