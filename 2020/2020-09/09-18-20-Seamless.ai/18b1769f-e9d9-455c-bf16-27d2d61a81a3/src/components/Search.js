import React, {useCallback} from 'react'

function Search({value, onChange}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        placeholder='Search for movie by name' 
        className='w-75 py-2'
        data-testid='search'
        value={value}
        onChange={handleChange}
      />
    </section>
  )
}

export default Search
