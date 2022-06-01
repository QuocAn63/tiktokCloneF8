import React from 'react';

function Search({ children }) {
    return (
        <div className="container">
            <div className="content">{children}</div>
        </div>
    );
}

export default Search;
