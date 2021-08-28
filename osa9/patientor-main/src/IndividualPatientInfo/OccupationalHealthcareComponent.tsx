import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import { Diagnosis, OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareComponent = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  return (
    <Segment>
      <p>
        {entry.date} <i>{entry.description}</i>
      </p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((dc) => (
            <li key={dc}>
              {dc} {diagnoses[dc].name}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}

      <Divider />

      <div>
        <b>
          <p>Employer: {entry.employerName}</p>
        </b>

        {entry.sickLeave ? (
          <>
            <p>
              <p>
                <b>Sick leave granted.</b>
              </p>
              Start: {entry.sickLeave.startDate}
              <br></br>
              End: {entry.sickLeave.endDate}
            </p>
          </>
        ) : (
          <p>
            <b>No sick leave granted.</b>
          </p>
        )}
      </div>
    </Segment>
  );
};

export default OccupationalHealthcareComponent;
