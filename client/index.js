import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import css from "./styles.css";
import ArtistContainer from './components/artistContainer.jsx';
import Results from './components/results.jsx';

const App = (props) => {
    const [artists, setArtists] = useState([]);
    const [winner, setWinner] = useState({});
    const [round, setRound] = useState({played: false, won: false});
    const [newGame, setGame] = useState(0);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/');
            const {artists, winner} = await response.json();
            setArtists(artists);
            setWinner(winner);
        }
        fetchData();
    }, [newGame]);

    function handleNewGame() {
        const updatedGame = newGame + 1;
        setGame(updatedGame);
        setRound({played: false, won: false});
    }

    function handleClick(id) {
        // check if the winning option was clicked
        if (id === winner.artist) {
            setRound({played: true, won: true});
        } else {
            setRound({played: true, won: false});
        }
    }

    return (
        <main className='container'>
            <h1>Spotifyer</h1>
            <audio src={winner.trackUrl} controls></audio>
            {round.played &&
                <Results handleNewGame={handleNewGame} winner={winner} round={round} />
            }
            {!round.played && <ArtistContainer 
                                artists={artists} 
                                handleClick={handleClick} />}
        </main>
    )
}

createRoot(document.querySelector('#root'))
  .render(
    <App />
)