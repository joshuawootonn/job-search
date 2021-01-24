import React, {useState} from 'react'

const initialFormState = {
  name: '',
  ratings: '',
  duration: ''
}

const standardizeValidMovie = (movie) => {
  const ratings = parseInt(movie.ratings)
  const durationType = movie.duration[movie.duration.length - 1];
  let duration = parseFloat(movie.duration.split(durationType)[0])
  // I believe durations/time should be stored in numeric format with an agreed upon denominator. Here that is hours.
  duration = durationType === 'm' ? Math.round((duration / 60) * 10) / 10 : duration
  return {...movie, ratings, duration }
}

function Movieform({addMovie}) {
  const [isValidationNoticeVisible, setIsValidNoticeVisible] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const {duration,ratings,name} = formState;

  const onChange = ({target: {id, value, type}}) => {
    setIsValidNoticeVisible(false);
    setFormState((formState => ({...formState, [id]: value})));
  }

  const validate = () => {
    const allFieldHaveValues = duration.length > 0 && ratings.length > 0 && name.length > 0;
    const durationHasAUnit = duration.match(/^[0-9,.]*[h,m]{1}$/);
    return allFieldHaveValues && durationHasAUnit;
  }

  const onSubmit = () => {
    validate() ? addMovie(standardizeValidMovie(formState)) : setIsValidNoticeVisible(true)
    setFormState(initialFormState);
  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={ e => e.preventDefault() }>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
              type='text' 
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              onChange={onChange}
              value={formState.name}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              onChange={onChange}
              value={formState.ratings}
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              onChange={onChange}
              value={formState.duration}
            />
          </div>
          {isValidationNoticeVisible && <div
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>}
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick={onSubmit}
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
  )
}

export default Movieform
