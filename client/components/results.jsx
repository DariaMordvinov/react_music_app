import React from 'react';

const Results = ({round, handleNewGame, winner}) => {
    return (
        <div className='results'>
            {round.won && <h2>Congrats! You guessed right.</h2>}
            {!round.won && 
                <h2>You are wrong. This is the song by "{winner.name}". 
                It's called "{winner.nameOfSong}", dummy</h2>}
            <button onClick={() => {handleNewGame()}}>Play again</button>
        </div>
    );
};

export default Results;