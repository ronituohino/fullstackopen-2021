import React from "react";
import { Grid, Button, Divider } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  SelectField,
  DiagnosisSelection,
  SelectFieldOptions,
} from "../../AddPatientModal/FormField";
import { Diagnosis } from "../../types";

interface Props {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onSubmit: (values: SubmitValues) => void;
  onCancel: () => void;
  diagnoses: { [code: string]: Diagnosis };
}

export type SubmitValues = {
  type: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];

  healthCheckRating: string;
  employerName: string;

  sickLeaveStartDate: string;
  sickLeaveEndDate: string;

  dischargeDate: string;
  dischargeCriteria: string;
};

const entryTypeOptions: SelectFieldOptions = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const healthCheckRatingOptions: SelectFieldOptions = [
  { value: "0", label: "Healthy" },
  { value: "1", label: "Low Risk" },
  { value: "2", label: "High Risk" },
  { value: "3", label: "Critical Risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],

        healthCheckRating: "0",
        employerName: "",

        sickLeaveStartDate: "",
        sickLeaveEndDate: "",

        dischargeDate: "",
        dischargeCriteria: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateMalformattedError =
          "Date is incorrectly formatted, (YYYY-MM-DD)";

        const errors: { [field: string]: string } = {};

        const isDate = (date: string): boolean => {
          return Boolean(Date.parse(date)) && date.length === 10;
        };

        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = dateMalformattedError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type) {
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case "OccupationalHealthcare":
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeaveStartDate || values.sickLeaveEndDate) {
              if (!values.sickLeaveStartDate) {
                errors.sickLeaveStartDate = "Sick leave start date is required";
              } else if (!isDate(values.sickLeaveStartDate)) {
                errors.sickLeaveStartDate = dateMalformattedError;
              }

              if (!values.sickLeaveEndDate) {
                errors.sickLeaveEndDate = "Sick leave end date is required";
              } else if (!isDate(values.sickLeaveEndDate)) {
                errors.sickLeaveEndDate = dateMalformattedError;
              }
            }
            break;
          case "Hospital":
            if (!values.dischargeDate) {
              errors.dischargeDate = requiredError;
            } else if (!isDate(values.dischargeDate)) {
              errors.dischargeDate = dateMalformattedError;
            }
            if (!values.dischargeCriteria) {
              errors.dischargeCriteria = requiredError;
            }
            break;
          default:
            console.error("Type not validated in entry form");
            break;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        const formTypeSwitch = (type: string): JSX.Element => {
          switch (type) {
            case "HealthCheck":
              return (
                <SelectField
                  label="Health Check Rating"
                  name="healthCheckRating"
                  options={healthCheckRatingOptions}
                />
              );
            case "OccupationalHealthcare":
              return (
                <>
                  <Field
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                  />

                  <Divider></Divider>

                  <Field
                    label="Sick Leave Start Date (*)"
                    placeholder="YYYY-MM-DD"
                    name="sickLeaveStartDate"
                    component={TextField}
                  />
                  <Field
                    label="Sick Leave End Date (*)"
                    placeholder="YYYY-MM-DD"
                    name="sickLeaveEndDate"
                    component={TextField}
                  />
                </>
              );
            case "Hospital":
              return (
                <>
                  <Field
                    label="Hospital Discharge Date"
                    placeholder="YYYY-MM-DD"
                    name="dischargeDate"
                    component={TextField}
                  />
                  <Field
                    label="Hospital Discharge Criteria"
                    placeholder="Criteria"
                    name="dischargeCriteria"
                    component={TextField}
                  />
                </>
              );
            default:
              console.error("Type not supported in form");
              return <></>;
          }
        };

        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {formTypeSwitch(values.type)}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
