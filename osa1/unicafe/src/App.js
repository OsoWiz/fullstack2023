import { React, useState } from "react";

const SimpleHeader = (props) => {
  return <h1>{props.headerText}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

function App() {
  const title = "Give feedback";
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const giveGood = () => () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };

  const giveNeutral = () => () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };

  const giveBad = () => () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  const totalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const averageFeedback = () => {
    return (feedback.good - feedback.bad) / totalFeedback();
  };

  // Tells how much of the feedback is positive on average
  const averagePositive = () => {
    return feedback.good / totalFeedback();
  };

  return (
    <div>
      <SimpleHeader headerText={title} />
      <Button handleClick={giveGood()} text="good" />
      <Button handleClick={giveNeutral()} text="neutral" />
      <Button handleClick={giveBad()} text="bad" />
      <SimpleHeader headerText="Statistics" />
      <p>good: {feedback.good}</p>
      <p>neutral: {feedback.neutral}</p>
      <p>bad: {feedback.bad}</p>
      <p>total: {totalFeedback()}</p>
      <p>average: {averageFeedback()}</p>
      <p>positive: {(averagePositive() * 100).toFixed(1)}%</p>
    </div>
  );
}

export default App;
