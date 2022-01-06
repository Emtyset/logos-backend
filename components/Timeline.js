import styles from '../styles/Timeline.module.scss'


function grabNDayAgoDate(D, N) {
    var t = new Date(D.getTime())
    t.setDate(t.getDate() - N)
    return t
}

function grabNDates(lastInSeqDate, grabLastNDays) {
    return [...Array(grabLastNDays).keys()].map((x) => grabNDayAgoDate(lastInSeqDate, x))
}

function getDateComponent(date, text) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return <> 
        <li className={styles.timeline__list_elem}>
            <div className={styles.timeline__date}>{day}/{month}</div>
            <p className={styles.timeline__text}>{text}</p>
        </li>
    </>
}


// https://codepen.io/TajShireen/pen/JjGvVzg
// https://codepen.io/TutulDevs/pen/oNbEgYx?editors=1100
export default function Timeline( {grabLastNDays } ) {
    const n = new Date()
    return <>
        <div className={styles.timeline}>
            <h1 className={styles.timeline__header}>Проверим ваше усердие...</h1>
            <ul className={styles.timeline__list}>
                {
                    grabNDates(n, grabLastNDays).map((d) => getDateComponent(d, ""))
                }
            </ul>
        </div>
    </>
}