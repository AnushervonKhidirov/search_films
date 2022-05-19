import Logo from '../../common/Logo/Logo';
import Input from '../../common/Input/Input';

import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <Input />
        </header>
    )
}


export default Header;