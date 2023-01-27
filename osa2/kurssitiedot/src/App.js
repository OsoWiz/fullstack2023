const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.exerciseList.map((part, i) => (
        <Part key={i} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  return <b> Total of {props.exercises} exercises</b>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content exerciseList={course.parts} />
      <Total
        exercises={course.parts.reduce(
          (accum, currentVal) => accum + currentVal.exercises,
          0
        )}
      />
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
      {
        name: "Redux",
        exercises: 11,
      },
      {
        name: "Redux 2, the revenge",
        exercises: 25,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
