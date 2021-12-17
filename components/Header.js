import Link from 'next/link'
import Image from 'next/image'
import userIcon from '../public/user.svg'

export default function Header(){
    return (
        <header className='header'>
            <h1 className='logo'>λόγος</h1>
            <nav className='header-list'>
                <Link href="/"><a>Справка</a></Link>
                <Link href="/"><a>Обучение</a></Link>
                <Link href="/"><a>База заданий</a></Link>
            </nav>
            <Image className='user-icon' src={userIcon} alt='user'></Image>
        </header>
    )
}