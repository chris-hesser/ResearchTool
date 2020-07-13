import React from 'react';
import "../css/App.css";

import Search from './Search';
import ArticleDescription from './ArticleDescription';

import { ReactComponent as Logo } from './mountains.svg';

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
          frameBorder="0"
          allow="accelerometer; encrypted-media;"
          allowFullScreen>
        </iframe>

        <a href="#searchContainer">
          <button  class='button' renderas="button" autoFocus>
            <span>Get started</span>
          </button>
        </a>
      </div>

      <div className='pageContainer' id='searchContainer'>
        <Search />
      </div>

      <div className='pageContainer' id='articleDescriptionContainer'>
        <ArticleDescription />
      </div>

      {/*<img source={Logo} className="footer" alt="Blue mountains with gold flag on peak" />*/}
      <Logo className="footer" alt="Blue mountains with gold flag on peak" />
    </div>
  );
}