import styles from './Headlines.module.css';

function Headline({ title }) {
    return <h1 className={styles.headline_1}>{title}</h1>;
}

export { Headline };