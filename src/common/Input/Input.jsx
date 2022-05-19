import styles from './Input.module.css';

export default function Input({ type='text' }) {
    return <input className={styles.input} type={type} />
}