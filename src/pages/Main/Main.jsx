import { useEffect, useState } from 'react';
import { RatingIcon } from '../../common/Icons';

import styles from './Main.module.css';


let filmList = [
    {
        id: 1,
        img: 'img',
        title: 'Venom',
        rating: 4.5
    },
    {
        id: 2,
        img: 'img',
        title: 'Iron Man',
        rating: 3.5
    },
    {
        id: 3,
        img: 'img',
        title: 'Spider-man',
        rating: 2.5
    },
    {
        id: 4,
        img: 'img',
        title: 'Doctor Strange',
        rating: 4.5
    },
    {
        id: 5,
        img: 'img',
        title: 'Spider-man: Far from home',
        rating: 2.5
    },
    {
        id: 6,
        img: 'img',
        title: 'Thor',
        rating: 4.8
    }
];


function Main() {
    let [films, setFilms] = useState([]);

    let apiKye = 'f34afb54d9ab14f0bf9d905dc6836800';
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKye}&language=en&page=1`;


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(film => {
                console.log(film.results);
                setFilms(film.results);
            });
    }, []);

    return <div id="main_page">
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
    // TODO: add link with film id to film page

    return <div className={styles.film_item} data-id={film.id}>
        <div className={styles.film_img} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})` }}></div>
        {film.adult && <div className={styles.adult}>18+</div>}
        <div className={styles.film_footer}>
            <div className={styles.film_title}>{film.title}</div>
            <div className={styles.film_rating}><RatingIcon /> <span>{film.vote_average}</span></div>
        </div>
    </div>
};


export default Main;