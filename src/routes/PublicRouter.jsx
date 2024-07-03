import React, {useState} from 'react';
import { Routes , Route } from "react-router-dom";
import Header from '../components/Header/Header';
import HomePage from '../pages/HomePage';
import ListTsumego from '../pages/ListTsumego';
import TsumegoGame from '../pages/TsumegoGame';

function PublicRouter ()  {

    const [ currentPage, setCurrentPage] = useState('');
    return (

        <>
            <Header currentPage={currentPage} />

            <Routes>
                <Route
                path="/"
                element={<HomePage />}
                render={() => {
                    setCurrentPage('home');
                    return <HomePage />;
                }}
                />
                <Route
                path="/listgames"
                element={<ListTsumego/>}
                render={() => {
                    setCurrentPage('listgames');
                    return <ListTsumego/>;
                }}
                />

                <Route
                path="/game"
                element={<TsumegoGame/>}
                render={() => {
                    setCurrentPage('game');
                    return <TsumegoGame/>;
                }}
                />
            </Routes>
        </>
    );
};

export default PublicRouter;