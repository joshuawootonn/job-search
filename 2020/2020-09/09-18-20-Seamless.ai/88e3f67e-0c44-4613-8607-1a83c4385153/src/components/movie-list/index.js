import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      movies: null
    };
  }

  onSearch() {
    const search = this.searchInputRef.current;
    if(!search) return;
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${search.value}`)
      .then(response => response.json())
      .then(({data: movies}) => this.setState({movies}));
  }

  render() {
    const {movies} = this.state;
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" ref={this.searchInputRef} className="large" placeholder="Enter Year eg 2015" data-testid="app-input"/>
          <button className="" data-testid="submit-button" onClick={this.onSearch}>Search</button>
        </section>

        <ul className="mt-50 styled" data-testid="movieList">
          {movies && (movies.length > 0) && movies.map((movie,i) => <li className="slide-up-fade-in py-10" key={i}>{movie.Title}</li>)}
        </ul>

        {movies && movies.length === 0 && <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>}
      </div>
    );
  }
}
