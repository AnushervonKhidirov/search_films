import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// custom components
import styles from './SearchFilm.module.css';



function SearchFilm() {
    const [foundedFilm, setFoundedFilm] = useState([]);
    const [filmName, setFilmName] = useState('');
    const navigate = useNavigate();

    function sendRequest(value) {
        const apiKye = 'f34afb54d9ab14f0bf9d905dc6836800';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKye}&language=en-US&query=${value}`;

        fetch(url)
            .then(response => response.json())
            .then(filmData => {
                setFoundedFilm(filmData);
            });
    };


    function searchFilms(e) {
        const value = e.target.value;

        setFilmName(value);
        sendRequest(value);
    };

    function showMatches(e) {
        e.preventDefault();

        // TODO: make normal condition
        if (filmName === '') return;

        navigate({
            pathname: '/',
            search: `?movie=${filmName}`,
        });
        clear();
    };

    function clear() {
        setFoundedFilm([]);
        setFilmName('');
    };

    return <div className={styles.search_films}>
        <form onSubmit={(e) => showMatches(e)}>
            <input type="text" value={filmName} onChange={e => searchFilms(e)} />
        </form>

        {(foundedFilm.length > 0) || <MatchedFilms filmList={foundedFilm.results} totalMatch={10} clear={clear} />}
    </div>;
};

function MatchedFilms({ filmList = [], totalMatch, clear }) {
    return <div className={styles.matched_films}>
        {filmList.map((film, index) => {
            if (index >= totalMatch) return;
            return <Link to={`film/?filmId=${film.id}`} className={styles.matched_film} onClick={clear} key={film.title + index}>{film.title}</Link>
        })}
    </div>
};


export default SearchFilm;