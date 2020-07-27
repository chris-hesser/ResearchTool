import React from 'react';
import "../css/App.css";

import Search from './Search';
import ArticleDescription from './ArticleDescription';

import { ReactComponent as Logo } from './mountains_separate.svg';
import { ReactComponent as CoreLogo } from './core.svg';

export default function Home() {

  return (
    <div className="app">
      <div className='pageContainer' id="homeContainer">
        <h1 className="title">Research Search Tool</h1>
        <p className='subtitle'>A tool for exploring the space of research.</p>

        <iframe 
        title="Video: how to use this tool"
        width="560" height="315" 
        src="https://www.youtube.com/embed/MtZw4Abcfvc" 
        frameborder="0" 
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen="true">
        </iframe>

        <a href="#searchContainer">
          <button class='button' renderas="button" autoFocus>
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


      <a href="https://www.core.ac.uk" className="coreRef" alt="Link to Core website" rel="noopener noreferrer" target="_blank">
        <CoreLogo alt="core home page link" />
      </a>
      <a href="https://www.github.com/chris-hesser/ResearchTool" className="iconRef" alt="Link to github project"
        rel="noopener noreferrer" target="_blank">{/*// eslint-disable-next-line*/}</a>
    </div>
  );
}