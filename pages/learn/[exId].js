import ExerciseList from '../../components/Exercise/ExerciseList'
import { connectToDatabase } from "../../utils/mongodb"


export default function ExercisePage({ exercises }) {
    return <>
        <div className='exercise-part'>
            <ExerciseList exercises={exercises} />
        </div>
    </>
}

export async function getStaticProps() {
    const { db } = await connectToDatabase();
    const exercises = await db
        .collection("exercises")
        .find({})
        .toArray();

    return {
        props: {
            exercises: JSON.parse(JSON.stringify(exercises)),
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [...Array(100).keys()].map((value) => `/learn/${value}`),
        fallback: true
    }
}