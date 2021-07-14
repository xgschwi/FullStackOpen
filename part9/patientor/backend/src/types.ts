// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
    id: string,
    name: string,
    occupation: string,
    gender: Gender,
    ssn?: string,
    dateOfBirth?: string,
    entries: Entry[]
}



export type NewPatient = Omit<Patient, 'id'>;

export type PatientFields = {name: unknown, occupation: unknown,
  gender: unknown, ssn?: unknown, dateOfBirth?: unknown, entries: Entry[]};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;