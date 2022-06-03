import { SearchIcon } from '@heroicons/react/solid'

function SearchBar() {
  return (
    <div className='search-bar'>
        <input type='text' placeholder='Search for places' />
        <div className='icon-wrapper search-icon'>
            <SearchIcon className='icon' fill='#F88747'/>
        </div>
    </div>
  )
}

export default SearchBar