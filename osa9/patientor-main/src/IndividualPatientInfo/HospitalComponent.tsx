import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import { Diagnosis, HospitalEntry } from "../types";

const HospitalComponent = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
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
      <p>
        <b>Hospitalized</b>
        <p>
          Discharge on <b>{entry.discharge.date}</b> if{" "}
          <b>{entry.discharge.criteria.toLowerCase()}</b>
        </p>
      </p>
    </Segment>
  );
};

export default HospitalComponent;
