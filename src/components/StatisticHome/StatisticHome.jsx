import React from 'react';
import './StatisticHome.css';

/**
 * Composant `StatisticHome` pour afficher des statistiques sur les parties de Tsumego.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Array<{rank: number, name: string}>} props.players - Liste des joueurs avec leur classement.
 * @param {Array<{year: number, count: number}>} props.years - Liste des années avec le nombre de parties pour chaque année.
 * @returns {JSX.Element} Élément JSX du composant `StatisticHome`.
 */
function StatisticHome({ players, years }) {

    <StatisticHome
    players={[
        { rank: 1, name: 'Nicolas' },
        { rank: 2, name: 'Nate' },
        { rank: 3, name: 'Klaus24' }
    ]}
    years={[
        { year: 2024, rank: 1 },
        { year: 2023, rank: 2 },
        { year: 2022, rank: 3 }
    ]}
    />


    return (
        <div className="statistics-home">
            {/* Section pour afficher le nombre de parties par joueur */}
            <div className="statistics-section">
                <h2>Nombre de parties par joueur</h2>
                <div>
                    {players.map(player => (
                        <p key={player.rank}><span>{player.rank}</span> {player.name}</p>
                    ))}
                </div>
            </div>

            {/* Section pour afficher le nombre de parties par année */}
            <div className="statistics-section">
                <h2>Nombre de parties par année</h2>
                <div>
                    {years.map(year => (
                        <p key={year.year}><span>{year.rank}</span> {year.year}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StatisticHome;
