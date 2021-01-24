import React from 'react';
import App from './App';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import 'jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
  fetchMock.restore();
  cleanup()
});

test('initial UI is rendered as expected', () => {
	let { getByTestId, queryByTestId } = renderApp();
	expect(getByTestId('app-title')).toHaveTextContent('Movie List');
	expect(getByTestId('app-input')).toHaveValue(null);
  expect(getByTestId('submit-button')).toHaveTextContent("Search");
  expect(getByTestId('movieList').childNodes).toHaveLength(0);
  expect(queryByTestId('no-result')).toBe(null);
});

test('search is made on by clicking on search button and no results found', async() => {
	let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/movies?Year=1996';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[]}));
  fireEvent.input(input, {
		target: { value: 1996}
	});
  fireEvent.click(searchButton);

  await wait(() => {
    const results = queryByTestId('movieList');
    expect(results.childNodes).toHaveLength(0);
    expect(queryByTestId('no-result')).not.toBe(null);
    expect(getByTestId('no-result')).toHaveTextContent('No Results Found');
  });
});

test('search is made on by clicking on search button and result found - test 1', async() => {
	let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/movies?Year=2015';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"Title":"The Death of Spiderman","Year":2015,"imdbID":"tt5921428"},{"Title":"Beat Feet: Scotty Smileys Blind Journey to Ironman","Year":2015,"imdbID":"tt5117146"}]}));
  fireEvent.input(input, {
		target: { value: 2015}
	});
  fireEvent.click(searchButton);

  await wait(() => {
    const results = queryByTestId('movieList');
    expect(results.childNodes).toHaveLength(2);
    expect(results.childNodes[0]).toHaveTextContent('The Death of Spiderman');
    expect(results.childNodes[1]).toHaveTextContent('Beat Feet: Scotty Smileys Blind Journey to Ironman');
    expect(queryByTestId('no-result')).toBe(null);
  });
});

test('search is made on by clicking on search button and result found - test 2', async() => {
	let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/movies?Year=2010';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"Title":"A Mind Devoid of Happiness or: The Maze","Year":2010,"imdbID":"tt5037380"},{"Title":"Lard and the Peace Maze","Year":2010,"imdbID":"tt5046522"},{"Title":"Macau Stories III: City Maze","Year":2010,"imdbID":"tt5603106"},{"Title":"Harry Price: Ghost Hunter","Year":2010,"imdbID":"tt4974584"},{"Title":"Harry & Snowman","Year":2010,"imdbID":"tt2898306"}]}));
  fireEvent.input(input, {
		target: { value: 2010}
	});
  fireEvent.click(searchButton);

  await wait(() => {
    const results = queryByTestId('movieList');
    expect(results.childNodes).toHaveLength(5);
    expect(results.childNodes[0]).toHaveTextContent('A Mind Devoid of Happiness or: The Maze');
    expect(results.childNodes[1]).toHaveTextContent('Lard and the Peace Maze');
    expect(results.childNodes[2]).toHaveTextContent('Macau Stories III: City Maze');
    expect(results.childNodes[3]).toHaveTextContent('Harry Price: Ghost Hunter');
    expect(results.childNodes[4]).toHaveTextContent('Harry & Snowman');
    expect(queryByTestId('no-result')).toBe(null);
  });
});
