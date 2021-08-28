import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";

const IndividualPatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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
    if (!patient.ssn) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (needToFetchInfo()) {
      void fetchAllPatientInfo();
    }
  }, [id]);

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

  return (
    <>
      <Header>
        {patient.name}
        <Icon className={iconString}></Icon>
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  );
};

export default IndividualPatientInfo;
