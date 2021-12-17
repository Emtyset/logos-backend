import { useState } from 'react'
import exercises from "../dataExample";
import RightArrowSVG from '../public/arrow-circle-right.svg';
import LeftArrowSVG from '../public/arrow-circle-left.svg';
import Image from "next/image";

export default function ExerciseFull() {
    let [idEx, setIdEx] = useState(0)
    let exercise = exercises[idEx]
    return (
        <div className='exercise-full'>
            <h1>{exercise.title}</h1>
            <p>{exercise.text}</p>
            <div className='button-group'>
                <div>{idEx > 0 ? 
                    <button onClick={() => setIdEx(idEx - 1)}><Image src={LeftArrowSVG} className='arrow' width={142} height={142}/></button> 
                    : null}
                </div>
                <div id='timer'><p>...</p></div>
                <div>{idEx < exercises.length - 1 ? 
                    <button onClick={() => setIdEx(idEx + 1)}><Image src={RightArrowSVG}  className='arrow' width={142} height={142}/></button> 
                    : null}
                </div>
            </div>
        </div>
    )
}