import { useState } from 'react'
import exercises from "../dataExample";
import RightArrowSVG from '../public/arrow-circle-right.svg';
import LeftArrowSVG from '../public/arrow-circle-left.svg';
import Image from "next/image";
import Timer from "./Timer"

export default function ExerciseFull() {
    let [idEx, setIdEx] = useState(0)
    let exercise = exercises[idEx]
    return (
        <div className='exercise-full'>
            <h1 className='exercise-full__header'>{exercise.title}</h1>
            <p className='exercise-full__p'>{exercise.text}</p>
            <div className='exercise-full__button-group'>
                <div className='exercise-full__button-wrapper'>{idEx > 0 ? 
                    <button className='exercise-full__button' onClick={() => setIdEx(idEx - 1)}><Image src={LeftArrowSVG} className='arrow' width={142} height={142}/></button> 
                    : null}
                </div>
                <Timer timeGiven={exercise.time} autoStart={false}/>
                <div className='exercise-full__button-wrapper'>{idEx < exercises.length - 1 ? 
                    <button className='exercise-full__button' onClick={() => setIdEx(idEx + 1)}><Image src={RightArrowSVG}  className='arrow' width={142} height={142}/></button> 
                    : null}
                </div>
            </div>
        </div>
    )
}