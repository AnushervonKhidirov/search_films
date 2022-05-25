import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// custom components
import { RatingIcon } from '../../components/common/Icons';
import { Headline } from '../../components/common/Headlines/Headlines';

import styles from './Main.module.css';


function Main() {
    const [films, setFilms] = useState([]);
    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') || 1;
    const apiKye = 'f34afb54d9ab14f0bf9d905dc6836800';

    const url = {
        popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKye}&language=en-US&page=${page}`,
        movie: `https://api.themoviedb.org/3/search/movie?api_key=${apiKye}&language=en-US&query=${searchParams.get('movie')}&page=${page}`
    };


    useEffect(() => {
        fetch(searchParams.get('movie') ? url.movie : url.popular)
            .then(response => response.json())
            .then(film => setFilms(film));
    }, [url.popular, url.movie, apiKye, searchParams]);

    return <div id="main_page">
        <Headline title={searchParams.get('movie') ? 'Matched Films' : 'Popular Films'} />
        <FilmList films={films.results || []} />
        {searchParams.get('movie') && <Pagination totalPages={films.total_pages} />}
    </div>
};


function FilmList({ films }) {
    return <div className={styles.film_list}>
        {films.map(film => <FilmItem film={film} key={film.id} />)}
    </div>
};

function FilmItem({ film }) {
    return <Link to={`film/?filmId=${film.id}`} className={styles.film_item} data-id={film.id}>
        <FilmPoster poster={film.poster_path} />
        <Adult adult={film.adult} />
        <FilmFooter title={film.title} vote={film.vote_average} />
    </Link>
};


function FilmPoster({ poster }) {
    return <div className={styles.film_img} style={{ backgroundImage: `url(${poster ? `https://image.tmdb.org/t/p/w500${poster}` : ''})` }} />
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


function Pagination({ totalPages }) {
    const pages = [];
    const maxPages = 10;
    const [searchParams] = useSearchParams();

    for (let i = 1; i <= totalPages && i <= maxPages; i++) {
        pages.push(i);
    };

    function isActive(index) {
        return searchParams.get('page') ? searchParams.get('page') === index.toString() : index === pages[0];
    };

    return <div className={styles.pagination}>
        {pages.map((page, index) => {
            return <PaginationButtons pageValue={page} active={isActive(index + 1)} key={`page ${page}`} />
        })}
    </div>
};

function PaginationButtons({ pageValue, active }) {
    const [searchParams, setSearchParams] = useSearchParams();

    function openPage(page) {
        const params = {
            'movie': searchParams.get('movie'),
            'page': page
        };

        setSearchParams(params);
        window.scrollTo(0, 0);
    };

    return <div className={`${styles.pagination_button} ${active ? styles.active : ''}`} onClick={() => openPage(pageValue)}>{pageValue}</div>
};


export default Main;