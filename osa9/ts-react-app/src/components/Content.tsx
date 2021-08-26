import React from 'react';

import Part from './Part';
import { CoursePart } from '../App';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((c) => {
        return (
          <Part key={c.name} course={c}/>
        );
      })}
    </>
  );
};

export default Content;
