import { NonSensitivePatient } from '../types';
import patientData from '../data/patients';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data: NonSensitivePatient[] = patientData.map(({ssn, ...data}) => ({
        ...data
    }));
    return data;
};

export default{
    getNonSensitivePatients
};