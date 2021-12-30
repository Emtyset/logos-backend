import Header from "../../components/Header";
import ExerciseList from "../../components/ExerciseList";
import ExerciseFull from "../../components/ExerciseFull";
import { connectToDatabase } from "../../utils/mongodb"

export default function ExercisePage({ exercises }) {
    return <>
        <div className='header-part'>
            <Header />
        </div>
        <div className='exercise-part'>
            <ExerciseList exercises={exercises} />
            <ExerciseFull />
        </div>
    </>
}

export async function getStaticProps() {

    const { db } = await connectToDatabase();
    const exercises = await db
        .collection("exercises")
        .find({})
        .toArray();

    // const exercises = await new Promise(() => {
    //     setTimeout(() => console.log("Data is ready"), 3000)
    // }).then(() => {
    //     return db
    //     .collection("exercises")
    //     .find({})
    //     .toArray()
    // })

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

