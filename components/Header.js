import Link from 'next/link'
import styles from '../styles/Header.module.scss'


// https://dev.to/javascriptacademy/responsive-navigation-bar-with-mobile-menu-using-html-css-2hpd
export default function Header() {
    return <>
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Link href="/"><a>λόγος</a></Link>
            </div>
            <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                    <li  className={styles.header__list_elem}><Link href="/"><a>Справка</a></Link></li>
                    <li  className={styles.header__list_elem}><Link href="/"><a>База заданий</a></Link></li>
                    <li  className={styles.header__list_elem}><Link href="/"><a>Обучение</a></Link></li>
                    <li  className={styles.header__list_elem_login}><Link href="/"><a>Войти</a></Link></li>
                    <li  className={styles.header__list_elem_signup}><Link href="/"><a>Регистрация</a></Link></li>
                </ul>
            </nav>
        </header>
    </>
}