import Link from 'next/link'
import Image from 'next/image'
import userIcon from '../public/user.svg'

export default function Header(){
    return (
        <header className='header'>
            <h1 className='header__logo'>λόγος</h1>
            <nav className='header__navbar'>
                <Link href="/"><a className='header__list-elem'>Обучение</a></Link>
                <Link href="/"><a className='header__list-elem'>Справка</a></Link>
                <Link href="/"><a className='header__list-elem'>База заданий</a></Link>
            </nav>
            <Image className='header__user-icon' src={userIcon} alt='user'></Image>
        </header>
    )
}