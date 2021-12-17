import ExerciseItem from "./ExerciseItem"


function ExerciseList(props) {
    return (
        <ul className='exercise-list'>
            {props.exercises.map(exercise => {
                return <ExerciseItem exercise = {exercise} key = {exercise.id}></ExerciseItem>
            })}
        </ul>
    )
}

export default ExerciseList