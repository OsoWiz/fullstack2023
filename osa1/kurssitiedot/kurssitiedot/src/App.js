const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  const list = props.exerciseList.map((exercise) => {
    console.log(exercise[0]);
    return (
      <p>
        {exercise[0]} {exercise[1]}
      </p>
    );
  });
  return list;
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
