import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import css from "./styles.css";

const App = (props) => {
    const [artists, setArtists] = useState([]);
    const [winner, setWinner] = useState({});
    const [round, setRound] = useState({played: false, won: false});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/');
            const {artists, winner} = await response.json();
            setArtists(artists);
            setWinner(winner);
        }
        fetchData();
    }, []);

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
            {round.played && round.won && 
               <div className='results'>
                 <h2>Congrats! You guessed right.</h2>
                 <button onClick={() => {
                    window.location.reload();
                }}>Play again</button>
               </div>
            }
            {round.played && !round.won && 
                <div className='results'>
                  <h2>You are wrong. This is the song by {winner.name}. It's called {winner.nameOfSong}, dummy</h2>
                  <button onClick={() => {
                    window.location.reload();
                }} >Play again</button>
                </div>
            }
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
        </main>
    )
}

createRoot(document.querySelector('#root'))
  .render(
    <App />
)