import '../styles/app.scss'
import Header from '../components/Header'


// https://nextjs.org/docs/basic-features/layouts
export default function LogosApp( {Component, pageProps }) {
    return <>
        <Header />
        <Component {...pageProps} />
    </>

}