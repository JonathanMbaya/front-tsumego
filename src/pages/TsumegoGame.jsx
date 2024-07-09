import React from 'react';
import BoardGoban from '../components/BoardGoban/BoardGoban';

function TsumegoGame() {
    

    return (
        <>
            <h1>Trouvez la solution en un seul coup</h1>

            <h2 style={{marginTop : '2rem'}}>A toi de jouer !</h2>

            <div style={{textAlign : 'center'}}>
                <p>Niveau : Avancé</p>
            </div>

            <BoardGoban className='board'/>
        </>
    )
}

export default TsumegoGame;
