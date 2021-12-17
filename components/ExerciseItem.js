function ExerciseItem({ exercise }) {
    return (
        <li className='exercise-item'> 
            {exercise.title}<br/>

            <span className = "exText">
                {exercise.text}
                <br/><br/>
            </span>

            <span className = "exTime">
                {'≤ ' + exercise.time + ' sec'}
            </span>
        </li>
    )
}

export default ExerciseItem