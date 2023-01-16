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
      <Part
        part={props.exerciseList[0].name}
        exercise={props.exerciseList[0].exercises}
      />
      <Part
        part={props.exerciseList[1].name}
        exercise={props.exerciseList[1].exercises}
      />
      <Part
        part={props.exerciseList[2].name}
        exercise={props.exerciseList[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.exercises}</p>;
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
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content exerciseList={course.parts} />
      <Total
        exercises={course.parts.reduce(
          (accum, currentVal) => accum + currentVal.exercises,
          0
        )}
      />
    </div>
  );
};

export default App;
