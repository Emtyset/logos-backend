import ExerciseItem from "./ExerciseItem"
import styles from '../../styles/Exercise/ExerciseList.module.scss'



export default function ExerciseList(props) {
    return (
        <ul className={styles.exercise_list}>
            {props.exercises.map(exercise => {
                return <ExerciseItem exercise = {exercise} key = {exercise.id}></ExerciseItem>
            })}
        </ul>
    )
}
