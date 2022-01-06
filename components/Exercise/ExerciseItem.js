import styles from '../../styles/Exercise/ExerciseItem.module.scss'

export default function ExerciseItem({ exercise }) {
    return (
        <li className={styles.exercise_list__exercise_item_chosen}>
            <span className={styles.exercise_list__exercise_item_header}>
                {exercise.title}
            </span>
            <br/>

            <span className = {styles.exercise_list__exercise_item_text}>
                {exercise.text}
                <br/><br/>
            </span>

            <span className = {styles.exercise_list__exercise_item_time}>
                {'≤ ' + exercise.time + ' sec'}
            </span>
        </li>
    )
}
