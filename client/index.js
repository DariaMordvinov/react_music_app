import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const App = (props) => {
    const [artists, setArtists] = useState([]);
    const [winner, setWinner] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/');
            const {artists, winner} = await response.json();
            setArtists(artists);
            setWinner(winner);
        }
        fetchData();
    }, []);

    return (
        <div>
          <h1>My super cool app</h1>
          {artists.map(ar => <p>{ar.name}</p>)}
          <audio src={winner.trackUrl} controls></audio>
        </div>
    )
}

render(
    <App />,
    document.querySelector('#root')
)