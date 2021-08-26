import patients from '../../data/patients';
import { NewPatient, Patient, PatientNonSensitive } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getAll = (): Patient[] => {
  return patients;
};

const getAllNonSensitive = (): PatientNonSensitive[] => {
    return patients.map(p => {
        const {ssn, ...nonSensitive } = p
        return nonSensitive
    })
} 

const addPatient = (newPatient: NewPatient): Patient => {
  const patientWithId = {...newPatient, id: uuidv4()}
  patients.push(patientWithId)
  return patientWithId
}

export default {
  getAll,
  getAllNonSensitive,
  addPatient
};
