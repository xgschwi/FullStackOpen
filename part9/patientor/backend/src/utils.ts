import { Gender, NewPatient, PatientFields} from "./types";

const isString = (object: unknown): object is string => {
    return typeof object === 'string' || object instanceof String;
};

const parseName = (name: unknown) : string => {
   if(!name || !isString(name))
      throw new Error('Incorrect or missing Name ' + name);

   return name;
};

const parseOccupation = (occupation: unknown) : string => {
    if(!occupation || !isString(occupation))
       throw new Error('Incorrect or missing Occupation ' + occupation);
 
    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) 
       throw new Error('Incorrect or missing Gender: ' + gender);

    return gender;
};

const parseSsn = (ssn: unknown): string | undefined => {
    if(!ssn) return undefined;
    else if (!isString(ssn)) throw new Error('Incorrect SSN: ' + ssn);
    else return ssn;
};

const isDate = (dob: string): boolean => {
    return Boolean(Date.parse(dob));
};

const parseDateOfBirth = (dob: unknown): string | undefined => {
    if(!dob) return undefined;
    else if (!isString(dob) || !isDate(dob)) throw new Error('Incorrect Date of Birth: ' + dob);
    else return dob;
};
/*
const parseEntries = (entries: unknown): Entry[] => {
    return entries;
}*/

const toNewPatient = ( fields: PatientFields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(fields.name),
        occupation: parseOccupation(fields.occupation),
        gender: parseGender(fields.gender),
        ssn: parseSsn(fields.ssn),
        dateOfBirth: parseDateOfBirth(fields.dateOfBirth),
        entries: fields.entries//parseEntries(fields.entries)
    };

    return newPatient;
};

export { toNewPatient };