function ExerciseItem({ exercise }) {
    return (
        <li className='exercise-list__exercise-item'> 
            {exercise.title}<br/>

            <span className = "exercise-list__exercise-item-text">
                {exercise.text}
                <br/><br/>
            </span>

            <span className = "exercise-list__exercise-item-time">
                {'≤ ' + exercise.time + ' sec'}
            </span>
        </li>
    )
}

export default ExerciseItem