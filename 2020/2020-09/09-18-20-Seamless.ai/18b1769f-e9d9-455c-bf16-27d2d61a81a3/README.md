# React: Favorite Movie Directory

<span style="font-size: 16px;">Complete a partially completed React movie directory application.</span> Certain core React functionalities have already been implemented. Complete the application as shown below in order to pass all the unit tests.

![](https://hrcdn.net/s3_pub/istreet-assets/QP-nMkLcgVGyNqz4vKZCtw/favorite-movie-directory.gif)

The application has 3 components:

*   The Movieform component, which allows the user to enter data about movies.
*   The Movieslist component, which displays the movies data.
*   The Search component, which allows the user to filter through existing movies.

Each movie object in the Movielist should have the following properties:

*   _name_: The name of the movie [STRING]
*   _rating_: The rating of the movie in the range of 0 to 100 [NUMBER]
*   _duration_: The duration of the movie in hours [STRING]

The application has the following functionalities:

*   The Movieform component has the followings fields:
    *   'Movie Name', which accepts a string denoting the movie name.
    *   'Ratings', which accepts an integer denoting the movie's rating.
    *   'Duration', which accepts a string denoting the movie's duration in hours (h) or minutes (m), e.g., in the format 132m or 2.5h.
*   The Movieslist component displays the movie data sorted by duration in descending order. The format is as follows:
    *   {movie name}
    *   Ratings: {ratings}/100
    *   {duration} Hrs
*   The following functionality should be implemented when the user clicks on the Add Movie button:
    *   If the duration format entered by the user is invalid, show the alert error message with the text 'Please specify the time in hours or minutes (e.g. 2.5h or 150m)'. This error message should be cleared once the user starts typing into any of the input fields.
    *   If all the input fields are filled with a valid value, a new movie should be added to the list.
    *   If the duration is entered in minutes, it must be converted to hours. For example, 90m should be converted and displayed as '1.5 Hrs'.
*   The Search component allows the user to filter through existing movies in the directory by the beginning characters.
    *   It requires the user to input at least 2 characters before the search happens.
    *   If the search finds no matches, the message 'No Results Found' is displayed instead of the list.
*   Initially, the Movieslist component and the 'No Results Found' message are not visible.

The following data-testid attributes are required in the component for the tests to pass:

*   The 'No Results Found' header should have the data-testid attribute 'noResult'.
*   The 'Movie Name' input should have the data-testid attribute 'nameInput'.
*   The 'Ratings' input should have the data-testid attribute 'ratingsInput'.
*   The 'Duration' input should have the data-testid attribute 'durationInput'.
*   The 'Add Movie' button should have the data-testid attribute 'addButton'.
*   The 'Movies List' should have the data-testid attribute 'moviesList'.
*   The 'Search' input should have the data-testid attribute 'search'.
*   The alert error message should have the data-testid attribute 'alert'.

Please note that component has the above data-testid attributes for test cases and certain classes and ids for rendering purposes. It is advised not to change them.

## Environment 

- React Version: 16.13.1
- Node Version: ^12.18.3
- Default Port: 8000

## Project Specifications 

**Read-Only Files**
- `src/App.test.js`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
