import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: {courseParts: Array<CoursePart>}): JSX.Element => (
    <div>
        {
            courseParts.map(part => 
            {
                return <div key={part.name}>
                    <Part part={part}/>
                </div>
            })
        }
    </div>
)

export default Content;