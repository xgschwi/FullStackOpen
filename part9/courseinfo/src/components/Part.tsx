import React from "react";
import { CoursePart } from "../types";

const Part = ({ part }: {part: CoursePart}): JSX.Element => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch(part.type) {
        case "normal":
            return <div><p><strong>{part.name} {part.exerciseCount}</strong></p> <p><i>{part.description}</i></p></div>;
        case "groupProject":
            return <div><p><strong>{part.name} {part.exerciseCount}</strong></p><p>Project Exercises {part.groupProjectCount}</p></div>
        case "submission":
            return <div><p><strong>{part.name} {part.exerciseCount}</strong></p><p><i>{part.description}</i></p>
            <p>Submit to {part.exerciseSubmissionLink}</p></div>
        case "special":
            return <div><p><strong>{part.name} {part.exerciseCount}</strong></p><p><i>{part.description}</i></p>
            <p>Required Skills: {part.requirements.map((r, i) => {
                if(i === 0 ) return `${r}`
                else return `, ${r} `
            })}</p></div>
        default:
            return assertNever(part);
    }
}

export default Part;