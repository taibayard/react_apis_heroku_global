import React, { Component } from 'react';
import './App.css';
import FilmDetails from './FilmDetails.js';
import FilmListing from './FilmListing.js';
import TMDB from './TMDB.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current : ""
    }
  }
  render() {
    return (
      <div className="film-library">
        <FilmListing films={TMDB.films}/>
        <FilmDetails films={TMDB.films} data={this.state.current}/>
      </div>
    );
  }
}

export default App;
