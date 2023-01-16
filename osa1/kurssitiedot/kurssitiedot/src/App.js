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
        part={props.exerciseList[0][0]}
        exercise={props.exerciseList[0][1]}
      />
      <Part
        part={props.exerciseList[1][0]}
        exercise={props.exerciseList[1][1]}
      />
      <Part
        part={props.exerciseList[2][0]}
        exercise={props.exerciseList[2][1]}
      />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.exercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const exercises = [
    [part1, exercises1],
    [part2, exercises2],
    [part3, exercises3],
  ];

  return (
    <div>
      <Header course={course} />
      <Content exerciseList={exercises} />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
