import { PublicPatient, NewPatient, Patient } from '../types';
import patientData from '../data/patients';
import {v1 as uuid} from 'uuid';

const getPublicPatients = (): PublicPatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data: PublicPatient[] = patientData.map(({ssn, ...data}) => ({
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

const findPatient = (pid: string): Patient | undefined => patientData.find(p => p.id === pid);

export default{
    getPublicPatients,
    addPatient,
    findPatient
};