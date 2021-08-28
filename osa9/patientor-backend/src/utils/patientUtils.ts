import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  HealthCheckRating,
} from "../types";

type PatientRequestFieds = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientRequestFieds): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newEntry;
};

type EntryRequestFields = {
  date: unknown;
  type: unknown;
  specialist: unknown;
  description: unknown;

  healthCheckRating?: unknown;
  diagnosisCodes?: unknown;
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  discharge: {
    date: unknown;
    criteria: unknown;
  };
};

export const toNewEntry = (newEntry: EntryRequestFields): NewEntry => {
  return parseNewEntry(newEntry);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
  }

  return dateOfBirth;
};

const isSSN = (ssn: string): boolean => {
  // No lowercase letters
  // Max length of 12
  // The first group of 6 only numbers

  const uppercase = ssn.toUpperCase();

  if (uppercase.length > 12) {
    return false;
  }

  for (let i = 0; i < 6; i++) {
    if (isNaN(parseInt(uppercase[i]))) {
      return false;
    }
  }

  return true;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error(`Incorrect or missing social security number: ${ssn}`);
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const isEntryBase = (entry: any): entry is NewEntry => {
  if (
    !entry.type ||
    !entry.description ||
    !entry.specialist ||
    !entry.date ||
    !isString(entry.type) ||
    !isString(entry.description) ||
    !isString(entry.specialist) ||
    !isDate(entry.date)
  ) {
    return false;
  }

  return true;
};

const hasId = (entry: any): entry is Entry => {
  if (entry.id && isString(entry.id)) {
    return true;
  } else {
    return false;
  }
};

const isHealthRating = (rating: any): rating is HealthCheckRating => {
  return !isNaN(rating) && rating >= 0 && rating <= 3;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthRating(rating)) {
    throw new Error(`Health rating incorrect: ${rating}`);
  }

  return rating;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Employer name missing: ${name}`);
  }

  return name;
};

type HospitalDischarge = {
  date: string;
  criteria: string;
};

const isHospitalDischarge = (
  discharge: any
): discharge is HospitalDischarge => {
  if (
    !discharge ||
    !discharge.date ||
    !isString(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  ) {
    return false;
  }

  return true;
};

const parseHospitalDischarge = (discharge: any): HospitalDischarge => {
  if (!isHospitalDischarge(discharge)) {
    throw new Error(`Discharge incorrect or missing: ${discharge}`);
  }

  return discharge;
};

export const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }

  entries.forEach((entry) => {
    try {
      parseEntry(entry);
    } catch (e) {
      throw e;
    }
  });

  return entries;
};

const parseEntry = (entry: unknown): Entry => {
  try {
    parseNewEntry(entry);

    if (hasId(entry)) {
      return entry;
    } else {
      throw new Error(`Entry doesn't have id ${entry}`);
    }
  } catch (e) {
    throw e;
  }
};

const parseNewEntry = (newEntry: unknown): NewEntry => {
  if (isEntryBase(newEntry)) {
    switch (newEntry.type) {
      case "HealthCheck":
        return {
          date: newEntry.date,
          type: newEntry.type,
          specialist: newEntry.specialist,
          description: newEntry.specialist,
          healthCheckRating: parseHealthRating(newEntry.healthCheckRating),
        };
      case "OccupationalHealthcare":
        return {
          date: newEntry.date,
          type: newEntry.type,
          specialist: newEntry.specialist,
          description: newEntry.description,
          employerName: parseEmployerName(newEntry.employerName),
          sickLeave: newEntry.sickLeave,
        };
      case "Hospital":
        return {
          date: newEntry.date,
          type: newEntry.type,
          specialist: newEntry.specialist,
          description: newEntry.description,
          discharge: parseHospitalDischarge(newEntry.discharge),
        };
      default:
        throw new Error(`Incorrect type?`);
    }
  } else {
    throw new Error(`Entry info incorrect or missing: ${newEntry}`);
  }
};
