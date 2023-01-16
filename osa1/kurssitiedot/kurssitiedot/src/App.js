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
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const exercises = [part1, part2, part3];

  return (
    <div>
      <Header course={course} />
      <Content exerciseList={exercises} />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
