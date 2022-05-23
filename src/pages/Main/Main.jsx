import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// custom components
import { RatingIcon } from '../../components/common/Icons';
import { Headline } from '../../components/common/Headlines/Headlines';

import styles from './Main.module.css';


function Main() {
    let [films, setFilms] = useState([]);

    // TODO: make a multiple pages
    let page = 1;

    const apiKye = 'f34afb54d9ab14f0bf9d905dc6836800';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKye}&language=en&page=${page}`;


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(film => setFilms(film.results));
    }, [url, apiKye]);

    return <div id="main_page">
        <Headline title='Top Films' />
        <FilmList films={films || []} />
    </div>
};


function FilmList({ films }) {
    return <div className={styles.film_list}>
        {films.map(film => {
            return <FilmItem film={film} key={film.id} />
        })}
    </div>
};

function FilmItem({ film }) {
    return <Link to={`film:${film.id}`} className={styles.film_item} data-id={film.id}>
        <FilmPoster poster={film.poster_path} />
        <Adult adult={film.adult} />
        <FilmFooter title={film.title} vote={film.vote_average} />
    </Link>
};


function FilmPoster({ poster }) {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    return <div className={styles.film_img} style={{ backgroundImage: `url(${imgUrl}${poster})` }} />
};

function Adult({ adult }) {
    return adult && <div className={styles.adult}>18+</div>
};

function FilmFooter({ title, vote }) {
    return <div className={styles.film_footer}>
        <div className={styles.film_title}>{title}</div>
        <div className={styles.film_rating}><RatingIcon /> <span>{vote}</span></div>
    </div>
};


export default Main;