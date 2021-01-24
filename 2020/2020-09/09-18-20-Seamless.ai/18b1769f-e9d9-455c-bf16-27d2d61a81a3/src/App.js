import React, {useState} from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

function App() {
  const [movies, setMovies] = useState(null);
  const [uiSearch, setUiSearch] = useState('')

  const filteredMovies = (movies || []).filter(movie => uiSearch.length > 1 ? movie.name.toLowerCase().includes(uiSearch.toLowerCase()) : true);

  return (
    <div>
      <h8k-navbar header={ title } />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <Movieform addMovie={movie => setMovies(movies => [...(movies || []), movie])} />
        </div>
        <div className='layout-column w-30'>
          <Search value={uiSearch} onChange={setUiSearch} />
          {movies && filteredMovies.length > 0 && <Movieslist movies={filteredMovies} />}
          {movies && filteredMovies.length === 0 && <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>}
        </div>
      </div> 
    </div>
  )
}

export default App;
