import React from 'react';
import { Link } from 'react-router-dom';

function ListTsumego() {
    

    return (
        <>
            <h1>Jouer au Tsumego</h1>
            <div className='game'>
                <Link to='/game'>Let's play a game</Link>
            </div>
        </>
    )
}

export default ListTsumego;
