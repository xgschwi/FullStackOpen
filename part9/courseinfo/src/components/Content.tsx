import React from "react";
import { CoursePart } from "../types";

const Content = ({ courseParts }: {courseParts: Array<CoursePart>}): JSX.Element => (
    <div>
        {
            courseParts.map(part => 
            {
                return <div key={part.name}>
                    <p>{part.name}</p> <p>{part.exerciseCount}</p>
                </div>
            })
        }
    </div>
)

export default Content;