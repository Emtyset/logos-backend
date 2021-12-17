import Header from "../../components/Header";
import ExerciseList from "../../components/ExerciseList";
import ExerciseFull from "../../components/ExerciseFull";
import exercises from "../../dataExample";


export default function ExercisePage() {
    return <>
        <div style={{display: 'flex'}}>
            <Header />
        </div>
        <div style={{display:'flex'}}>
            <ExerciseList exercises={exercises}/>
            <ExerciseFull />
        </div>
    </>
}