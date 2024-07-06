import React from 'react';
import './StatisticHome.css'

export function StatisticHome() {
    

    return (
        <div className="statistics-home">
            <div className="statistics-section">
                <h2>Nombre de parties par joueur</h2>
                <div>
                    <p><span>1</span> Nicolas</p>
                    <p><span>2</span> Nate</p>
                    <p><span>3</span> Klaus24</p>
                </div>
            </div>

            <div className="statistics-section">
                <h2>Nombre de parties par année</h2>
                <div>
                    <p><span>1</span> Nicolas</p>
                    <p><span>2</span> Nate</p>
                    <p><span>3</span> Klaus24</p>
                </div>
            </div>
        </div>
    )
}

export default StatisticHome;