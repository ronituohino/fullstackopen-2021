import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../types";
import CSS from "csstype";

const HealthCheckComponent = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  const heartFloatStyle: CSS.Properties = {
    paddingInline: "10px",
  };

  //TypeScript bug, cannot find healthRating enums, so we'll have to use numbers instead
  const healthRatingHeart = (healthRating: HealthCheckRating): JSX.Element => {
    switch (healthRating) {
      case 0:
        return <Icon style={heartFloatStyle} color={"green"} name={"heart"} />;
      case 1:
        return <Icon style={heartFloatStyle} color={"yellow"} name={"heart"} />;
      case 2:
        return <Icon style={heartFloatStyle} color={"orange"} name={"heart"} />;
      case 3:
        return <Icon style={heartFloatStyle} color={"red"} name={"heart"} />;
      default:
        console.error(`Healthrating not handled: ${healthRating}`);
        return <></>;
      //assertNever(healthRating);
    }
  };

  return (
    <Segment>
      <div>
        <p>
          {entry.date} <i>{entry.description}</i>
          {healthRatingHeart(entry.healthCheckRating)}
        </p>
      </div>

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
    </Segment>
  );
};

export default HealthCheckComponent;
