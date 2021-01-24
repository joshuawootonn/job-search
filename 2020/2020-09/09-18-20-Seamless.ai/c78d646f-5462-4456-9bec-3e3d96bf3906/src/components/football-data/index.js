
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matches: null
    };
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
      matches: []
    })
    fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`)
      .then(response => response.json())
      .then(({data}) => this.setState({matches: data}))
  }

  render() {
    const years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const {matches,selectedYear} = this.state;
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          <section>
            {matches && matches.length > 0 && <div className="total-matches" data-testid="total-matches">Total matches: {matches.length}</div>}
            {matches && matches.length > 0 && <ul className="mr-20 matches styled" data-testid="match-list">
              {matches.map((match,i) => <li key={i} className="slide-up-fade-in">Match {match.name} won by {match.winner}</li>)}
            </ul>}
          </section>

          {matches && matches.length === 0 && <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div>}
        </section>
      </div>
    );
  }
}