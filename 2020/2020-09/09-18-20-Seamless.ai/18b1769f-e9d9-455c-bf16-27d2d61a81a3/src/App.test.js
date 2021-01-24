import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

const TEST_IDS = {
  noResultId: 'noResult',
  nameInputId: 'nameInput',
  ratingsInputId: 'ratingsInput',
  durationInputId: 'durationInput',
  addButtonId: 'addButton',
  listId: 'moviesList',
  searchId: 'search',
  alertId: 'alert'
}

describe('Favorite Movie Directory', () => {

  let getByTestId
  let queryByTestId
  let getNoResult
  let queryNoResult
  let nameInput
  let ratingsInput
  let durationInput
  let addButton
  let list
  let queryList
  let search
  let getAlert
  let queryAlert

  beforeEach(() => {
    const app = render(<App />)
    getByTestId = app.getByTestId
    nameInput = getByTestId(TEST_IDS.nameInputId)
    ratingsInput = getByTestId(TEST_IDS.ratingsInputId)
    durationInput = getByTestId(TEST_IDS.durationInputId)
    addButton = getByTestId(TEST_IDS.addButtonId)
    search = getByTestId(TEST_IDS.searchId)
    queryByTestId = app.queryByTestId
    queryList = queryByTestId(TEST_IDS.listId)
    queryNoResult = queryByTestId(TEST_IDS.noResultId)
    queryAlert = queryByTestId(TEST_IDS.alertId)
  })

  afterEach(() => {
    cleanup()
  })

  const addMovie = (name, ratings, duration) => {
    fireEvent.change(nameInput, { target: { value: name } })
    fireEvent.change(ratingsInput, { target: { value: ratings } })
    fireEvent.change(durationInput, { target: { value: duration } })
    fireEvent.click(addButton, { button: '0' })
  }

  const addMoviesSet = () => {
    addMovie('Toy Story', '90', '1.5h')
    addMovie('Beauty and the Beast', '86', '1.8h')
    addMovie('North by Northwest', '84', '2.2h')
    addMovie('Gravity', '78', '2h')
    addMovie('Notorious', '60', '1.4h')
  }

  it('should not initially show the no result message or list', () => {
    expect(queryList).toBeNull()
    expect(queryNoResult).toBeNull()
  })

  it('should add a row with valid data and not show the no result message', () => {
    addMovie('Star Wars', '95', '3h')
    list = getByTestId(TEST_IDS.listId)
    expect(list.children[0].textContent).toEqual('Star WarsRatings: 95/1003 Hrs')
    expect(queryNoResult).toBeNull()
  })

  it('should not add the row if name or ratings or duration is empty', () => {
    addMovie('The Platform', '40', '1.5h')
    list = getByTestId(TEST_IDS.listId)
    expect(list.children[0].textContent).toEqual('The PlatformRatings: 40/1001.5 Hrs')
    addMovie('', '90', '1.5h')
    addMovie('The Irishman', '', '2.2h')
    addMovie('Annihilation', '70', '')
    expect(list.children.length).toEqual(1)
  })

  it('should add duration in hours if entered in minutes', () => {
    addMovie('Casablanca', '95', '170m')
    list = getByTestId(TEST_IDS.listId)
    expect(list.children[0].textContent).toContain('2.8 Hrs')
  })

  it('should not add the row if data invalid', () => {
    addMovie('Antman', '99', '2h')
    list = getByTestId(TEST_IDS.listId)
    expect(list.children[0].textContent).toEqual('AntmanRatings: 99/1002 Hrs')
    addMovie('Harry Potter', '100', '3w')
    expect(list.children.length).toEqual(1)
  })

  it('should show alert message if duration data invalid', () => {
    addMovie('Harry Potter', '100', '3w')
    getAlert = getByTestId(TEST_IDS.alertId)
    expect(getAlert.textContent).toEqual('Please specify time in hours or minutes (e.g. 2.5h or 150m)')
  })

  it('should hide alert message after user starts typing in some input', () => {
    addMovie('Harry Potter', '100', '3w')
    getAlert = getByTestId(TEST_IDS.alertId)
    expect(getAlert).toBeTruthy()
    fireEvent.change(nameInput, { target: { value: 'Home' } })
    expect(queryAlert).toBeNull()
  })

  it('should add multiple rows in sorted order', () => {
    addMoviesSet()
    list = getByTestId(TEST_IDS.listId)
    expect(list.children[1].textContent).toContain("2 Hrs")
    expect(list.children[2].textContent).toContain("1.8 Hrs")
    expect(list.children[3].textContent).toContain("1.5 Hrs")
  })

  it('should start search when at least 2 characters are entered', () => {
    addMoviesSet()
    fireEvent.change(search, { target: { value: 'g' } })
    list = getByTestId(TEST_IDS.listId)
    expect(list.children.length).toEqual(5)
    fireEvent.change(search, { target: { value: 'gr' } })
    expect(list.children.length).toEqual(1)
    expect(list.children[0].textContent).toContain('Gravity')
  })

  it('should filter movies by starting characters', () => {
    addMoviesSet()
    fireEvent.change(search, { target: { value: 'no' } })
    list = getByTestId(TEST_IDS.listId)
    expect(list.children[0].textContent).toContain('North by Northwest')
    expect(list.children[1].textContent).toContain('Notorious')
    fireEvent.change(search, { target: { value: 'not' } })
    expect(list.children[0].textContent).toContain('Notorious')
  })

  it('should show no result message and not show list when the search returns no match', () => {
    addMoviesSet()
    fireEvent.change(search, { target: { value: 'tr' } })
    getNoResult = getByTestId(TEST_IDS.noResultId)
    expect(getNoResult.textContent).toEqual('No Results Found')
    expect(queryList).toBeNull()
  })
})