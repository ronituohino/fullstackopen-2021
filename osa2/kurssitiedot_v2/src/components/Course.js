import React from 'react'

const Course = (props) => {
    return (
        <div>
            {props.courses.map((course) => <CoursePart key={course.id} course={course} />)}
        </div>
    )
}

const CoursePart = (props) => {
    return (
        <>
            <Header name={props.course.name} />
            <Content course={props.course} />
            <Total course={props.course} />
        </>
    )
}

const Header = ({ name }) => {
    return (
        <>
            <h2>
                {name}
            </h2>
        </>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(part =>
                <Part key={part.id} name={part.name} amount={part.exercises} />
            )}
        </div>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.name} {props.amount}
            </p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p><b>
                total of {
                    props.course.parts.reduce((sum, part) => {
                        return sum + part.exercises
                    }, 0)
                } exercises
            </b></p>
        </>
    )
}

export default Course