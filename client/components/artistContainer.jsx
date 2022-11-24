import React from 'react';

const ArtistContainer = ({artists, handleClick}) => {
    return (
        <div className='artists-container'>
        {artists.map(ar => 
            <div className='artist' key={ar.id}>
                <div className='img-wrapper'>
                    <img 
                      onClick={() => handleClick(ar.id)}
                      src={ar.image} 
                    />
                </div>
                <p>{ar.name}</p>
            </div>
        )}
        </div>
    );
};

export default ArtistContainer;