import Header from "../../components/Header";
import ExerciseList from "../../components/ExerciseList";
import ExerciseFull from "../../components/ExerciseFull";
import exercises from "../../dataExample";


export default function ExercisePage() {
    return <>
        <div className='header-part'>
            <Header />
        </div>
        <div className='exercise-part'>
            <ExerciseList exercises={exercises}/>
            <ExerciseFull />
        </div>
    </>
}