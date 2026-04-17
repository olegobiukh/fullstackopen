import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Statistics from "./components/Statistics";

const App = () => {
  const title1 = "Give feedback";
  const title2 = "Statistics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title={title1} />
      <div>
        <Button label="Good" onClick={() => setGood(good + 1)} />
        <Button label="Neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button label="Bad" onClick={() => setBad(bad + 1)} />
      </div>
      <Header title={title2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
