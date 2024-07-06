import React from 'react';
import BoardGoban from '../components/BoardGoban/BoardGoban';

function TsumegoGame() {
    

    return (
        <>
            <h1>Niveau 1</h1>

            <div style={{textAlign : 'center'}}>
                <p>Niveau : Avancé</p>
                <p>Trouvez la solution en un seul coup</p>
            </div>


            <BoardGoban className='board'/>
        </>
    )
}

export default TsumegoGame;
