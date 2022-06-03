import SearchBar from "./SearchBar";

function Search() {

    const today = new Date();
    const week = today.toLocaleDateString('en-US',{weekday: 'long'});
    const month = today.toLocaleDateString('en-US',{month: 'long'});
    const day = today.getDate();
    const date = `${week}, ${month} ${day}`;

    return (
        <div className='search-container section-padding'>
            <div className='search-wrapper'>
                <h3 className='subheading-text'>{date}</h3>
                <div className='main-title'>
                    <h1>Where do</h1>
                    <h1>you want to go?</h1>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}

export default Search