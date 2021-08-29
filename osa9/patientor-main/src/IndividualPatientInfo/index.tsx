import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { assertNever } from "../utils";
import AddEntryModal from "./AddEntryModal";

import HealthCheckComponent from "./HealthCheckComponent";
import HospitalComponent from "./HospitalComponent";
import OccupationalHealthcareComponent from "./OccupationalHealthcareComponent";

const IndividualPatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const patient = patients[id];

  const fetchAllPatientInfo = async () => {
    try {
      const { data: patientInfo } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patientInfo));
    } catch (e) {
      console.error(e);
    }
  };

  const needToFetchInfo = (): boolean => {
    if (!patient.ssn || !patient.entries) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (patient && needToFetchInfo()) {
      void fetchAllPatientInfo();
    }
  }, [patient]);

  if (!patient || Object.keys(diagnoses).length < 1) {
    return <></>;
  }

  const iconName = (): string => {
    switch (patient.gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "neuter";
    }
  };
  const iconString = iconName();

  const EntryDetails = (entry: Entry): JSX.Element => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <HealthCheckComponent
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareComponent
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case "Hospital":
        return (
          <HospitalComponent
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <>
      <Header>
        {patient.name}
        <Icon className={iconString}></Icon>
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <Header size="medium">Entries</Header>

      <AddEntryModal id={id} />

      {patient.entries.map((e) => EntryDetails(e))}
    </>
  );
};

export default IndividualPatientInfo;
