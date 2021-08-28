import patients from "../../data/patients";
import { NewEntry, NewPatient, Patient, PublicPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const getAll = (): Patient[] => {
  return patients;
};

const getAllNonSensitive = (): PublicPatient[] => {
  return patients.map((p) => {
    const { ssn, ...nonSensitive } = p;
    return nonSensitive;
  });
};

const getSinglePatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return patient;
  }

  throw new Error(`Patient not found with id: ${id}`);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patientWithId = { ...newPatient, id: uuidv4(), entries: [] };
  patients.push(patientWithId);
  return patientWithId;
};

const addEntry = (patientId: string, newEntry: NewEntry): Patient => {
  const entryWithId = { ...newEntry, id: uuidv4() };
  const patient = patients.find((p) => p.id === patientId);
  if (patient) {
    patient.entries.push(entryWithId);
    return patient;
  } else {
    throw new Error(`Patient with id ${patientId} not found`);
  }
};

export default {
  getAll,
  getAllNonSensitive,
  getSinglePatient,
  addPatient,
  addEntry,
};
