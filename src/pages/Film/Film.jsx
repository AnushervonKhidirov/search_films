import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// custom components
import { Headline } from '../../components/common/Headlines/Headlines';

import styles from './Film.module.css';

function Film() {
    const [film, setFilm] = useState([]);
    const [searchParams] = useSearchParams();

    const apiKye = 'f34afb54d9ab14f0bf9d905dc6836800';
    const url = `https://api.themoviedb.org/3/movie/${searchParams.get('filmId')}?api_key=${apiKye}&language=en-US`;


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(filmData => {
                setFilm(filmData);
            });
    }, [url, apiKye]);

    return <div>
        <Headline title={film.title} />

        <Poster image={film.backdrop_path} />
        <Description desc={film.overview} />
        <InfoTable info={film} />
    </div>
};


function Poster({ image }) {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    return image && <div className={styles.film_poster} style={{ backgroundImage: `url(${imgUrl}${image})` }} />
};

function Description({ desc }) {
    return <div className={styles.film_desc}>{desc}</div>
};


function InfoTable({ info }) {
    const infoData = [
        {
            title: 'Production Countries',
            value: info.production_countries
        },
        {
            title: 'Languages',
            value: info.spoken_languages
        },
        {
            title: 'Runtime',
            value: time(info.runtime)
        },
        {
            title: 'Rating',
            value: info.vote_average
        }
    ];

    function time(value) {
        if (value < 60) return `${value}m`;

        const h = Math.floor(value / 60);
        const m = value - (h * 60);
        return `${h}h ${m > 9 ? m : `0${m}`}m`;
    };

    return <table border={1} className={styles.info_table}>
        <tbody>
            {infoData.map((info, index) => {
                return <TableRow title={info.title} value={info.value} key={index} />
            })}
        </tbody>
    </table>
};


function TableRow({ title, value }) {

    function makeToPrimitive(value) {
        return Array.isArray(value) ? value = value.map(data => data.name).join(', ') : value;
    };

    return <tr className={styles.table_row}>
        <td className={styles.info_name}>{title}</td>
        <td className={styles.info_value}>{makeToPrimitive(value)}</td>
    </tr>
};

export default Film;