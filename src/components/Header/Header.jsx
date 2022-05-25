// custom components
import Logo from '../../components/common/Logo/Logo';
import SearchFilm from '../common/SearchFilm/SearchFilm';

import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <Logo />

            <SearchFilm />
        </header>
    )
}


export default Header;