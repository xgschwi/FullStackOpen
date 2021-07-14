import { NonSensitivePatient, NewPatient, Patient } from '../types';
import patientData from '../data/patients';
import {v1 as uuid} from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data: NonSensitivePatient[] = patientData.map(({ssn, ...data}) => ({
        ...data
    }));
    return data;
};

const addPatient = (patient: NewPatient): Patient => {
    
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patientData.push(newPatient);
    return newPatient;
};
export default{
    getNonSensitivePatients,
    addPatient
};