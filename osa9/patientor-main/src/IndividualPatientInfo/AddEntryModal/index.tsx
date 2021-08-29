import React from "react";
import { Button, Modal, Segment } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../../state";
import { AddEntryForm, SubmitValues } from "./AddEntryForm";
import {
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Patient,
} from "../../types";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

const AddEntryModal = ({ id }: { id: string }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ diagnoses }, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  type NewEntry =
    | Omit<HealthCheckEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">
    | Omit<HospitalEntry, "id">;

  const parseFormData = (values: SubmitValues): NewEntry => {
    switch (values.type) {
      case "HealthCheck":
        return {
          type: values.type,
          date: values.date,
          description: values.description,
          specialist: values.specialist,
          diagnosisCodes: values.diagnosisCodes,
          healthCheckRating: parseInt(values.healthCheckRating),
        } as NewEntry;
      case "OccupationalHealthcare": {
        if (
          values.sickLeaveStartDate.length > 0 &&
          values.sickLeaveEndDate.length > 0
        ) {
          return {
            type: values.type,
            date: values.date,
            description: values.description,
            specialist: values.specialist,
            employerName: values.employerName,
            sickLeave: {
              startDate: values.sickLeaveStartDate,
              endDate: values.sickLeaveEndDate,
            },
          } as NewEntry;
        } else {
          return {
            type: values.type,
            date: values.date,
            description: values.description,
            specialist: values.specialist,
            employerName: values.employerName,
          } as NewEntry;
        }
      }
      case "Hospital":
        return {
          type: values.type,
          date: values.date,
          description: values.description,
          specialist: values.specialist,
          discharge: {
            date: values.dischargeDate,
            criteria: values.dischargeCriteria,
          },
        } as NewEntry;
      default:
        throw new Error(`Type not supported: ${values.type}`);
    }
  };

  const submit = async (values: SubmitValues) => {
    try {
      const parsedObject = parseFormData(values);
      const response = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        parsedObject
      );

      dispatch(updatePatient(response.data as Patient));
    } catch (e) {
      console.error(e);
      throw e;
    }
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>Add Entry</Button>
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <AddEntryForm
            onSubmit={submit}
            onCancel={closeModal}
            diagnoses={diagnoses}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AddEntryModal;
