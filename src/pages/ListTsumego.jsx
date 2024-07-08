import React from 'react';
import { Link } from 'react-router-dom';

function ListTsumego() {
    

    return (
        <>
            <h1>Jouer au Tsumego</h1>
            <p style={{textAlign : 'center' }}>Résoudres tous les niveaux</p>
            <h2>C'est parti !</h2>
            <div className='game'>
                <Link to='/listgames/game'>
                    <div className='game-item'>
                        <p>Niveau 1</p>
                        <span class="material-symbols-outlined">
                        check_small
                        </span>
                    </div>
                </Link>

                <Link to='/listgames/game'>
                    <div className='game-item'>
                        <p>Niveau 2</p>
                        <span class="material-symbols-outlined">
                        check_small
                        </span>
                    </div>
                </Link>

                <Link to='/listgames/game'>
                    <div className='game-item'>
                        <p>Niveau 3</p>
                        <span class="material-symbols-outlined">
                        check_small
                        </span>
                    </div>
                </Link>

            </div>
        </>
    )
}

export default ListTsumego;
