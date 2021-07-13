import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnosesData;

const getDiagnoses = () => {
    return diagnoses;
};



export default {
    getDiagnoses
};