import React from 'react';
import { CoursePart, CourseNormalPart } from '../App';

const Part = ({ course }: { course: CoursePart }) => {
  const openRequirements = (requirements: string[]) => {
    let str = ''

    for(let i = 0; i < requirements.length; i++) {
      if(i < requirements.length - 1) {
        str = str.concat(`${requirements[i]}, `)
      } else {
        str = str.concat(`${requirements[i]}`)
      }
    }

    return str
  }

  const renderCourse = (course: CoursePart) => {
    switch (course.type) {
      case 'normal':
        return (
          <>
            <h3>{course.name} {course.exerciseCount}</h3>
            <p>{course.description}</p>
          </>
        );
      case 'groupProject':
        return (
          <>
            <h3>{course.name} {course.exerciseCount}</h3>
            <p>group project exercises {course.groupProjectCount}</p>
          </>
        );
      case 'submission':
        return (
          <>
            <h3>{course.name} {course.exerciseCount}</h3>
            <p>{course.description}</p>
            <p>submit to {course.exerciseSubmissionLink}</p>
          </>
        );
      case 'requirements':
        return (
          <>
            <h3>{course.name} {course.exerciseCount}</h3>
            <p>{course.description}</p>
            <p>requirements: {openRequirements(course.requirements)}</p>
            
          </>
        );
      default:
        assertNever(course);
    }
  };

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return <div>{renderCourse(course)}</div>;
};

export default Part;
