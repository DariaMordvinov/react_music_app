import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const App = (props) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/');
            const token = await response.json();
            setToken(token);
        }
        fetchData();
    }, []);

    return (
        <div>
          <h1>My super cool app</h1>
          {token}
        </div>
    )
}

render(
    <App />,
    document.querySelector('#root')
)