import React from 'react';
import "../css/App.css";

import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <>
      <header className="App-header">
        <h1>
          Research Search Tool
        </h1>
        <p>
          A tool for exploring the space of research.
        </p>
      </header>
      
      {/* share button on youtube, playback is slow on the vm
        <iframe 
          width="560" height="315" 
          src="https://www.youtube.com/embed/J---aiyznGQ" 
          frameborder="0" 
          allow="accelerometer; encrypted-media;" 
          allowfullscreen>
        </iframe>
      */}

      <Link to="/search">
        <button renderas="button" autoFocus>
          <span>Let's begin</span>
        </button>
      </Link>
      <div className="footer">
      </div>
    </>
  );
}