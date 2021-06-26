import React from 'react'

const SearchResult = (props) => {
    if(props.matches !== "-1"){
        return(
        <React.Fragment>
            <div className= "matchResult">
                {props.matches} matches found
                <button className= "viewAll">
                    View all profiles
                </button>
            </div>
        </React.Fragment>
        );
    }
    return (
        <div>
            
        </div>
    )
}

export default SearchResult
